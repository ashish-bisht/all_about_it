// System Design - Scaling Writes
// Rate Limiter, Ad Click Aggregator

const topic_systemdesign_scaling_writes = {
    id: "systemdesign_scaling_writes",
    title: "System Design: Scaling Writes",
    description: "Principal Engineer • Scaling Write-Heavy Systems",
    color: "#e17055",
    icon: "fas fa-edit",
    mentalModel: {
        whenToApply: [
            { label: "✏️ High Write QPS", desc: "Millions of writes? → Sharding + Message Queues + CQRS" },
            { label: "🚦 Rate Limiting", desc: "Stop abuse? → Token Bucket / Sliding Window + Redis" },
            { label: "📈 Analytics/Aggregation", desc: "Real-time counts? → HyperLogLog + Time-Series DB" },
            { label: "📊 Event Streaming", desc: "Process events? → Kafka + Partitioning" },
            { label: "🔢 Counters at Scale", desc: "Like counts? → Sharded counters + Eventual consistency" }
        ],
        patterns: [
            { algo: "Sharding", use: "Scale writes", time: "O(1)", space: "Distributed", template: "Consistent Hashing / Range-based" },
            { algo: "Token Bucket", use: "Rate limiting", time: "O(1)", space: "O(1)", template: "tokens += rate; if tokens > 0: allow" },
            { algo: "Write-Behind Cache", use: "Batch writes", time: "O(1)", space: "O(pending)", template: "Queue writes, flush periodically" },
            { algo: "CQRS", use: "Separate read/write", time: "O(1)", space: "2 DBs", template: "Command DB (write) + Query DB (read)" },
            { algo: "HyperLogLog", use: "Unique counts", time: "O(1)", space: "12KB", template: "Probabilistic counting (2% error)" },
            { algo: "Time Bucketing", use: "Aggregation", time: "O(1)", space: "O(buckets)", template: "Aggregate per minute/hour, roll up" }
        ],
        safetyCheck: [
            { label: "⚠️ Write Amplification", desc: "Indexes, replicas, search = N writes per 1 logical write" },
            { label: "🔄 Eventual Consistency", desc: "Writes to replicas are async. Accept stale reads." },
            { label: "⏱️ Rate Limit Storage", desc: "In-memory = restart loses state. Use Redis." },
            { label: "📊 Aggregation Windows", desc: "Tumbling vs Sliding windows. Different semantics!" }
        ]
    },
    questions: [
        {
            id: "rate-limiter",
            title: "Design Rate Limiter",
            difficulty: "Medium",
            priority: "🔴",
            tags: ["Scaling Writes", "Throttling"],

            scaleEstimates: {
                requestsPerSec: "10,000 - 100,000 QPS",
                latencyBudget: "< 1ms (must be fast!)",
                storage: "1 entry per user/IP",
                note: "Rate limiter sits in the HOT PATH - must be O(1) and fast!"
            },

            quiz: {
                description: "Which rate limiting algorithm allows brief bursts?",
                options: [
                    "Fixed Window Counter",
                    "Sliding Window Log",
                    "Token Bucket",
                    "Leaky Bucket"
                ],
                correct: 2,
                explanation: "Token Bucket! Allows bursts (accumulated tokens). Leaky Bucket = constant rate, no burst. Fixed Window = boundary issues. Sliding Log = memory heavy."
            },

            learn: {
                decisions: [
                    {
                        question: "Where to rate limit?",
                        answer: "API Gateway / Load Balancer level",
                        why: "Before hitting app servers. Saves resources early."
                    },
                    {
                        question: "By what key?",
                        answer: "User ID > API Key > IP (in priority)",
                        why: "IP can be shared (NAT). User ID is most accurate."
                    }
                ],

                components: [
                    {
                        name: "Token Bucket vs Leaky Bucket",
                        solution: `<table style="width:100%; border-collapse:collapse;">
<tr><th style="border:1px solid #eee; padding:8px;">Token Bucket</th><th style="border:1px solid #eee; padding:8px;">Leaky Bucket</th></tr>
<tr><td style="border:1px solid #eee; padding:8px;">✅ Allows BURSTS (uses saved tokens)</td><td style="border:1px solid #eee; padding:8px;">❌ Constant rate, no bursts</td></tr>
<tr><td style="border:1px solid #eee; padding:8px;">Tokens accumulate when idle</td><td style="border:1px solid #eee; padding:8px;">Queue-based, processes at fixed rate</td></tr>
<tr><td style="border:1px solid #eee; padding:8px;">Best for: APIs with occasional spikes</td><td style="border:1px solid #eee; padding:8px;">Best for: Network traffic shaping</td></tr>
</table>`,
                        trap: "Fixed Window has BOUNDARY problem - 2x burst at window edge!"
                    },
                    {
                        name: "Sliding Window (Hybrid)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
# Sliding Window Counter (Best of both worlds)
# Weighted average of current + previous window

prev_count = get_count(prev_window)
curr_count = get_count(curr_window)

weight = (now - curr_window_start) / window_size
count = prev_count * (1 - weight) + curr_count

if count >= limit:
    return 429
</pre>`,
                        trap: "Sliding Window LOG stores every timestamp - uses too much memory at scale!"
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.8rem; line-height:1.3;">
                    TOKEN BUCKET VISUALIZATION
                    
    Refill: 10 tokens/sec          Bucket Size: 100 tokens
           │                              │
           ▼                              ▼
    ┌──────────────────────────────────────────┐
    │  [🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙] ← Tokens       │
    │  Capacity: 100                           │
    │                                          │
    │  Request arrives:                        │
    │  ✅ Tokens > 0? → Consume 1, Allow       │
    │  ❌ Tokens = 0? → Reject (429)           │
    └──────────────────────────────────────────┘
    
    BURST HANDLING:
    - Idle user accumulates tokens (up to capacity)
    - Can "burst" 100 requests instantly
    - Then rate-limited to 10/sec
</pre>`,

                traps: [
                    {
                        question: "Race condition with distributed rate limiting?",
                        answer: "Use Redis Lua scripts - ATOMIC read+write. Or accept eventual consistency."
                    },
                    {
                        question: "What headers to return?",
                        answer: "X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After"
                    }
                ],

                metrics: { time: "30 min interview", space: "O(1) per key" },

                codeTitle: "Token Bucket (Redis Lua)",
                code: `-- Token Bucket Rate Limiter (Redis Lua Script)
-- KEYS[1] = bucket key
-- ARGV[1] = capacity, ARGV[2] = refill_rate, ARGV[3] = now

local bucket = redis.call('HMGET', KEYS[1], 'tokens', 'last_refill')
local tokens = tonumber(bucket[1]) or tonumber(ARGV[1])
local last_refill = tonumber(bucket[2]) or tonumber(ARGV[3])

-- Refill tokens based on time passed
local now = tonumber(ARGV[3])
local refill = (now - last_refill) * tonumber(ARGV[2])
tokens = math.min(tonumber(ARGV[1]), tokens + refill)

if tokens >= 1 then
    tokens = tokens - 1
    redis.call('HMSET', KEYS[1], 'tokens', tokens, 'last_refill', now)
    redis.call('EXPIRE', KEYS[1], 60)
    return 1  -- ALLOWED
else
    return 0  -- RATE LIMITED (429)
end`
            }
        },
        {
            id: "ad-click-aggregator",
            title: "Design Ad Click Aggregator",
            difficulty: "Hard",
            priority: "🟡",
            tags: ["Scaling Writes", "Aggregation", "Streaming"],

            scaleEstimates: {
                clicksPerDay: "10 Billion clicks",
                qps: "100,000 writes/sec peak",
                aggregationLatency: "Near real-time (< 1 min)",
                storage: "PB scale (raw + aggregated)",
                note: "Write-heavy! Every click = money. Can't lose data."
            },

            quiz: {
                description: "How to count unique users clicking an ad without storing all user IDs?",
                options: [
                    "Store all user IDs in a set",
                    "Use HyperLogLog (probabilistic)",
                    "Count all clicks (including duplicates)",
                    "Sample 1% of users"
                ],
                correct: 1,
                explanation: "HyperLogLog! Uses only 12KB to count billions of uniques with ~2% error. Exact set = GB of memory. For ad analytics, 2% error is acceptable."
            },

            learn: {
                decisions: [
                    {
                        question: "Real-time vs Batch aggregation?",
                        answer: "Lambda Architecture (both!)",
                        why: "Real-time (Kafka + Flink) for dashboards. Batch (Spark) for accurate billing reconciliation."
                    },
                    {
                        question: "How to handle late events?",
                        answer: "Watermarks + allowed lateness",
                        why: "Mobile users offline → late clicks. Accept up to 1 hour late, recompute."
                    },
                    {
                        question: "Raw events storage?",
                        answer: "Kafka → S3 (data lake)",
                        why: "Keep raw forever for compliance. Aggregate for queries."
                    }
                ],

                components: [
                    {
                        name: "Time-Window Aggregation",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Window Types:

Tumbling (non-overlapping):
|----1min----|----1min----|----1min----|
  [events]      [events]      [events]

Sliding (overlapping):
|----1min----|
     |----1min----|
          |----1min----|

Aggregations per ad_id per minute:
- click_count
- unique_users (HyperLogLog)
- revenue_sum
</pre>`,
                        trap: "Tumbling = simpler. Sliding = smoother but more compute."
                    },
                    {
                        name: "Sharded Counters",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Problem: 1 counter, 100k writes/sec = HOT KEY

Solution: Shard the counter!

ad:123:clicks:shard0 = 5000
ad:123:clicks:shard1 = 4800
ad:123:clicks:shard2 = 5200

Write: INCR random shard
Read:  SUM all shards (async, cache result)

Typically 10-100 shards per hot counter.
</pre>`,
                        trap: "Don't read sum on every request - cache aggregated value, update every second."
                    },
                    {
                        name: "Lambda Architecture",
                        solution: `<ul>
<li><strong>Speed Layer:</strong> Kafka → Flink → Real-time view</li>
<li><strong>Batch Layer:</strong> S3 → Spark → Accurate view</li>
<li><strong>Serving Layer:</strong> Merge both for queries</li>
</ul>
<p>Real-time: fast but approximate. Batch: slow but accurate. Best of both!</p>`,
                        trap: "Kappa architecture (stream only) is simpler but harder to fix processing bugs."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                   AD CLICK AGGREGATOR ARCHITECTURE                   │
└─────────────────────────────────────────────────────────────────────┘

[Ad Click Events]
        │
        ▼
┌───────────────┐
│    Kafka      │ (Partitioned by ad_id)
│   (Buffer)    │
└───────┬───────┘
        │
        ├─────────────────────────────────────────┐
        │                                         │
        ▼ (Speed Layer)                           ▼ (Batch Layer)
┌───────────────┐                         ┌───────────────┐
│   Flink       │                         │     S3        │
│ (1-min agg)   │                         │  (Raw events) │
└───────┬───────┘                         └───────┬───────┘
        │                                         │ Every hour
        ▼                                         ▼
┌───────────────┐                         ┌───────────────┐
│    Redis      │                         │    Spark      │
│ (Real-time)   │                         │ (Recompute)   │
└───────┬───────┘                         └───────┬───────┘
        │                                         │
        └─────────────────┬───────────────────────┘
                          ▼
                  ┌───────────────┐
                  │   Serving     │ (Merge real-time + batch)
                  │   Layer       │
                  └───────────────┘
</pre>`,

                traps: [
                    {
                        question: "Click fraud detection?",
                        answer: "ML model on features: IP, timing, user behavior. Flag suspicious."
                    },
                    {
                        question: "Exactly-once processing?",
                        answer: "Kafka transactions + idempotent producers. Or dedup at aggregation."
                    },
                    {
                        question: "Query by time range?",
                        answer: "Pre-aggregate: minute → hour → day. Query smallest granularity needed."
                    }
                ],

                metrics: { time: "45 min interview", space: "Kafka + Flink + S3 + Spark" },

                codeTitle: "Sharded Counter (Python)",
                code: `import redis
import random

r = redis.Redis()
NUM_SHARDS = 10

def increment_click(ad_id: str):
    """Increment click count using sharded counter"""
    shard = random.randint(0, NUM_SHARDS - 1)
    key = f"ad:{ad_id}:clicks:shard:{shard}"
    r.incr(key)
    r.expire(key, 86400)  # 24 hour TTL

def get_click_count(ad_id: str) -> int:
    """Get total clicks across all shards"""
    # Check cache first
    cache_key = f"ad:{ad_id}:clicks:total"
    cached = r.get(cache_key)
    if cached:
        return int(cached)
    
    # Sum all shards
    total = 0
    for shard in range(NUM_SHARDS):
        key = f"ad:{ad_id}:clicks:shard:{shard}"
        val = r.get(key)
        if val:
            total += int(val)
    
    # Cache for 1 second
    r.setex(cache_key, 1, total)
    return total

# Usage:
# increment_click("ad_123")  # Fast, goes to random shard
# get_click_count("ad_123")  # Returns aggregated count`
            }
        }
    ]
};
