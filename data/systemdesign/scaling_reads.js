// System Design - Scaling Reads
// URL Shortener, News Feed, Distributed Cache

const topic_systemdesign_scaling_reads = {
    id: "systemdesign_scaling_reads",
    title: "System Design: Scaling Reads",
    description: "Principal Engineer • Scaling Read-Heavy Systems",
    color: "#0984e3",
    icon: "fas fa-book-open",
    mentalModel: {
        whenToApply: [
            { label: "📊 High Read QPS", desc: "Millions of reads? → Caching (Redis) + CDN + Read Replicas" },
            { label: "🔗 URL/ID Generation", desc: "Need unique short IDs? → Base62 + Counter (Redis Range)" },
            { label: "📰 Feed/Timeline", desc: "Social feed? → Fan-out + Caching + Ranking" },
            { label: "💾 Distributed Cache", desc: "Reduce DB load? → Consistent Hashing + Replication" },
            { label: "🔍 Search at Scale", desc: "Full-text search? → Inverted Index (ElasticSearch)" }
        ],
        patterns: [
            { algo: "Caching", use: "Reduce DB load", time: "O(1)", space: "Memory", template: "Cache-aside: check cache → miss → DB → update cache" },
            { algo: "Read Replicas", use: "Scale reads", time: "O(1)", space: "DB copies", template: "Master (writes) → Slaves (reads)" },
            { algo: "CDN", use: "Edge caching", time: "O(1)", space: "Distributed", template: "Static content at edge, origin fallback" },
            { algo: "Base62 Encoding", use: "Short URLs", time: "O(log n)", space: "O(1)", template: "ID → a-z, A-Z, 0-9 string" },
            { algo: "Consistent Hashing", use: "Distributed cache", time: "O(1)", space: "O(N)", template: "Hash ring, minimal rehashing on node add/remove" },
            { algo: "Fan-out on Read", use: "News feed", time: "O(following)", space: "O(1)", template: "Fetch from each followed user at read time" }
        ],
        safetyCheck: [
            { label: "⚠️ Cache Invalidation", desc: "Write-through vs Write-behind. Stale data kills!" },
            { label: "🔄 Consistent Hashing", desc: "Use virtual nodes for even distribution" },
            { label: "🆔 ID Collision", desc: "Don't hash URLs (MD5/SHA) - collisions need retries" },
            { label: "🌡️ Hot Keys", desc: "Celebrity problem - replicate hot keys across nodes" },
            { label: "💥 Cache Stampede", desc: "Key expires, 1000 requests hit DB. Use locking/early refresh" }
        ]
    },
    questions: [
        {
            id: "url-shortener",
            title: "Design URL Shortener (Bit.ly)",
            difficulty: "Medium",
            priority: "🔴",
            tags: ["Scaling Reads", "ID Generation"],

            // SENIOR ENGINEER TEMPLATE MODE matches user request
            customHtml: `
    <p style="text-align: center; color: #86868b; font-size: 1.1em; margin-bottom: 30px;">
        <strong>Design Philosophy:</strong> Keep It Simple (KISS), Operational Maturity over Hype.
    </p>

    <div class="card">
        <span class="tag tag-math">Cheat Sheet</span>
        <h3>1. The "Universal" Scale Estimates</h3>
        <p>Memorize this. Use it for almost every system design interview.</p>
        <table>
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Standard Value</th>
                    <th>Rough Math (Back-of-envelope)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>DAU</strong></td>
                    <td>100 Million</td>
                    <td>Standard large-scale app assumption.</td>
                </tr>
                <tr>
                    <td><strong>QPS (Avg)</strong></td>
                    <td>~10,000 QPS</td>
                    <td><code>1 Billion Req / 100k sec</code></td>
                </tr>
                <tr>
                    <td><strong>Peak QPS</strong></td>
                    <td>~50,000 QPS</td>
                    <td>5x Multiplier for spikes.</td>
                </tr>
                <tr>
                    <td><strong>Storage</strong></td>
                    <td>1 TB / Day</td>
                    <td>1 Billion req * 1KB payload.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="card">
        <span class="tag tag-pro">Senior Engineer Decisions</span>
        <h3>2. Architecture Choices & Justifications</h3>

        <h4>A. HTTP 301 vs 302?</h4>
        <ul>
            <li><strong>Decision:</strong> <code>302 (Temporary Redirect)</code></li>
            <li><strong>Why?</strong> If we use 301, the browser caches the redirect. We lose <strong>Analytics</strong>
                (click tracking). 302 forces the request to hit our server every time.</li>
        </ul>

        <hr style="border-color:rgba(255,255,255,0.1); margin: 20px 0;">

        <h4>B. Database: Oracle (RDBMS) vs NoSQL?</h4>
        <ul>
            <li><strong>Decision:</strong> <strong>Oracle DB / RDBMS</strong> (Valid Alternative to NoSQL).</li>
            <li><strong>The "Principal Engineer" Argument:</strong>
                <ul>
                    <li><strong>Capacity:</strong> 10k Write QPS is "peanuts" for a modern Oracle RAC / Exadata. We
                        don't need NoSQL scale yet.</li>
                    <li><strong>Operations:</strong> Better reliability (ACID), easier backups, and team familiarity.
                    </li>
                    <li><strong>Future Proofing:</strong> If we reach 100k+ writes, we can introduce Sharding or move to
                        NoSQL then. <em>"Don't optimize for Google-scale when you are startup-scale."</em></li>
                </ul>
            </li>
        </ul>
    </div>

    <div class="card">
        <span class="tag tag-logic">The Core Logic</span>
        <h3>3. Shortening Strategy: Base62 + Redis Range</h3>

        <p><strong>The Goal:</strong> Convert ID -> 7 char string.</p>
        
        <div class="trap-box">
            <strong>⛔ The Trap (Hashing):</strong> Do not use MD5/SHA256. It causes <strong>Collisions</strong>. You
            will have to handle retries.
        </div>

        <h4>The Solution: Counter Based (Base62)</h4>
        <ul>
            <li><strong>Alphabet:</strong> <code>a-z, A-Z, 0-9</code> (62 chars).</li>
            <li><strong>Capacity:</strong> <code>62^7</code> ≈ <strong>3.5 Trillion URLs</strong>. (Enough for 100
                years).</li>
        </ul>

        <h4>Distributed ID Generation (The "Redis Range" Pattern)</h4>
        <p>How to generate unique IDs across 50 servers without locking the DB?</p>
        <ol>
            <li><strong>Redis:</strong> Holds a global counter (e.g., starts at 1 Billion).</li>
            <li><strong>App Server:</strong> Asks Redis "Give me a range".</li>
            <li><strong>Redis:</strong> <code>INCRBY 10000</code>. Returns range <code>[1,000,000 - 1,010,000]</code>.
            </li>
            <li><strong>App Server:</strong> Uses these 10k IDs in memory. <strong>Zero DB load for next 10k
                    requests.</strong></li>
        </ol>
        <p><em><strong>Note:</strong> Start Counter at <strong>1 Billion</strong> to ensure generated URLs are 6 chars
                long (e.g., <code>bit.ly/x9Js2</code>) and not 1 char (<code>bit.ly/1</code>).</em></p>
    </div>

    <div class="card">
        <span class="tag tag-logic">Performance</span>
        <h3>4. Caching Strategy (Simplicity Wins)</h3>

        <ul>
            <li><strong>Size Check:</strong> Hot data (20%) of 1TB is ~200GB. But mostly recent viral links matter.
                <strong>32GB - 64GB RAM</strong> is enough.</li>
            <li><strong>Topology:</strong> 1 Master (Writes) + 2 Slaves (Reads). No complex sharding needed for this
                scale.</li>
            <li><strong>Eviction Policy:</strong> <strong>LRU (Least Recently Used)</strong>.
                <br><span style="font-size:0.9em; color:#86868b;">(LFU is bad because old viral links stick around
                    forever).</span>
            </li>
        </ul>
        
        <div class="trap-box">
            <strong>⛔ The Trap (Modulo Hashing):</strong> If you use multiple Redis nodes, don't use
            <code>Hash % N</code>. If one node dies, 100% cache keys act as missed. Use <strong>Consistent
                Hashing</strong> OR keep it simple with <strong>Replication</strong>.
        </div>
    </div>

    <div class="card">
        <h3>5. High Level Design (ASCII)</h3>
        <div class="diagram" style="font-family: 'Courier New', monospace;">
[ User ]
   |
   | (1. Shorten / 2. Click)
   v
[ Load Balancer ]
   |
   +---> [ Rate Limiter ] (Redis Token Bucket)
   |       | "Stop spam (429)"
   |
   v
[ App Server Cluster ] <---- (Allocates IDs) ---- [ Redis (ID Counter) ]
   |
   |-- A. READ Path (Click) ----------------------------+
   |                                                    |
   +--> 1. Check Cache (Redis Slave)                    |
   |       (Hit? -> Return 302 to Long_URL)             |
   |                                                    |
   +--> 2. Cache Miss? -> Fetch from Oracle DB          |
   |       (Update Cache + Return 302)                  |
   |                                                    |
   |-- B. WRITE Path (Shorten) -------------------------+
   |                                                    |
   +--> 1. Get ID from Memory Range                     |
   |       (Convert ID -> Base62 "abc")                 |
   |                                                    |
   +--> 2. Write to Oracle DB (Async/Sync)              |
           (INSERT INTO urls VALUES (id, long_url...))
        </div>
    </div>
            `
        },
        {
            id: "news-feed",
            title: "Design News Feed (FB/Instagram)",
            difficulty: "Hard",
            priority: "🔴",
            tags: ["Scaling Reads", "Fan-out", "Ranking"],

            scaleEstimates: {
                dau: "2 Billion users",
                avgFriends: "500 friends per user",
                postsPerDay: "500 Million new posts",
                feedRefresh: "5 Billion feed loads/day",
                note: "Read-heavy! 1000:1 read:write ratio. MUST cache aggressively."
            },

            quiz: {
                description: "When celebrity with 10M followers posts, how to update all feeds?",
                options: [
                    "Write post to all 10M followers' feeds immediately",
                    "Don't pre-compute - fetch at read time",
                    "Hybrid: fan-out on write for normal users, fan-out on read for celebrities",
                    "Queue all 10M writes asynchronously"
                ],
                correct: 2,
                explanation: "Hybrid approach! Normal users (< 10k followers): fan-out on write (pre-compute feeds). Celebrities: fan-out on read (fetch at read time). Avoids celebrity hotspot problem!"
            },

            learn: {
                decisions: [
                    {
                        question: "Fan-out on Write vs Read?",
                        answer: "HYBRID! Both have trade-offs.",
                        why: "Write = fast reads, slow writes for celebrities. Read = fast writes, slow reads. Use celebrity threshold (~10k followers)."
                    },
                    {
                        question: "Where to store feeds?",
                        answer: "Redis lists + DB backup",
                        why: "Redis LPUSH/LRANGE for fast feed ops. DB (Cassandra) for persistence. TTL old entries."
                    },
                    {
                        question: "Ranking algorithm?",
                        answer: "ML model: affinity × recency × engagement",
                        why: "Not just chronological! Factor in: relationship score, post type, engagement prediction."
                    }
                ],

                components: [
                    {
                        name: "Fan-out on Write (Push Model)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
When user posts:
1. Write post to Posts table
2. Get follower list (500 friends)
3. For each follower:
   LPUSH feed:user_123 post_id
   LTRIM feed:user_123 0 999  # Keep last 1000

Pros: ✅ Fast reads (O(1))
Cons: ❌ Slow writes for celebrities
      ❌ Waste compute for inactive users
</pre>`,
                        trap: "Don't fan-out to ALL followers - many are inactive. Use activity-based filtering!"
                    },
                    {
                        name: "Hybrid Approach (The Answer!)",
                        solution: `<ul>
<li><strong>Normal users (&lt; 10k followers):</strong> Fan-out on WRITE</li>
<li><strong>Celebrities (&gt; 10k followers):</strong> Fan-out on READ</li>
<li><strong>At read time:</strong> Merge pre-computed feed + live celebrity posts</li>
</ul>
<pre style="background:#2d3436; color:#dfe6e9; padding:10px; border-radius:8px; font-size:0.85rem;">
def get_feed(user_id):
    # Pre-computed from normal friends
    cached_feed = redis.lrange(f"feed:{user_id}", 0, 99)
    
    # Live fetch from celebrities user follows
    celeb_posts = fetch_recent_celebrity_posts(user_id)
    
    # Merge and rank
    return rank(cached_feed + celeb_posts)[:100]
</pre>`,
                        trap: "Celebrity threshold is tunable! Start with 10k, adjust based on latency metrics."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                      NEWS FEED ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────┘

WRITE PATH (Post Created):
[User Posts] → [Post Service] → [Posts DB]
                    │
                    ▼
            ┌───────────────┐
            │ Fan-out Svc   │ ← Is celebrity? (> 10k followers)
            └───────┬───────┘
                    │
       ┌────────────┴────────────┐
       ▼ (Normal User)           ▼ (Celebrity)
┌─────────────┐            ┌─────────────┐
│ Push to all │            │ Skip fanout │
│ follower    │            │ (read-time) │
│ feeds       │            └─────────────┘
└─────────────┘

READ PATH (Open App):
[User Opens App] → [Feed Service]
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
  ┌──────────┐   ┌──────────┐   ┌──────────┐
  │ Cached   │   │ Celeb    │   │ Ranking  │
  │ Feed     │ + │ Posts    │ → │ Service  │ → [Feed]
  │ (Redis)  │   │ (Live)   │   │ (ML)     │
  └──────────┘   └──────────┘   └──────────┘
</pre>`,

                traps: [
                    {
                        question: "How to handle deleted posts?",
                        answer: "Soft delete. Filter out at read time. Async cleanup of cached feeds."
                    },
                    {
                        question: "Real-time updates?",
                        answer: "WebSocket push for NEW posts. Pull for full refresh. Rate limit push."
                    }
                ],

                metrics: { time: "60 min interview", space: "Redis: ~100GB, Cassandra: PB scale" },

                codeTitle: "Feed Generation (Python)",
                code: `import redis
from typing import List

r = redis.Redis()
CELEBRITY_THRESHOLD = 10000

def create_post(user_id: int, post_id: str):
    """Create post and fan-out to followers"""
    follower_count = r.scard(f"followers:{user_id}")
    
    if follower_count < CELEBRITY_THRESHOLD:
        # Fan-out on write for normal users
        followers = r.smembers(f"followers:{user_id}")
        pipe = r.pipeline()
        for follower_id in followers:
            pipe.lpush(f"feed:{follower_id}", post_id)
            pipe.ltrim(f"feed:{follower_id}", 0, 999)
        pipe.execute()
    else:
        # Celebrity - index for read-time fetch
        r.zadd(f"celeb_posts:{user_id}", {post_id: time.time()})

def get_feed(user_id: int, count: int = 100) -> List:
    # Pre-computed feed
    cached = r.lrange(f"feed:{user_id}", 0, count - 1)
    
    # Celebrity posts (fan-out on read)
    celeb_ids = r.smembers(f"following_celebs:{user_id}")
    celeb_posts = []
    for cid in celeb_ids:
        recent = r.zrevrange(f"celeb_posts:{cid}", 0, 10)
        celeb_posts.extend(recent)
    
    return rank_posts(list(cached) + celeb_posts)[:count]`
            }
        },
        {
            id: "distributed-cache",
            title: "Design Distributed Cache (Redis)",
            difficulty: "Hard",
            priority: "🔴",
            tags: ["Scaling Reads", "Caching", "Distributed"],

            scaleEstimates: {
                qps: "1 Million QPS",
                dataSize: "1 TB across cluster",
                latency: "< 1ms (99th percentile)",
                availability: "99.99% uptime",
                note: "Cache is on HOT PATH - latency is everything!"
            },

            quiz: {
                description: "How to add new cache node without losing data?",
                options: [
                    "Hash(key) % N - rehash all keys",
                    "Consistent Hashing - minimal rehashing",
                    "Random placement",
                    "Store keys in sorted order"
                ],
                correct: 1,
                explanation: "Consistent Hashing! Adding node = only K/N keys move (K=keys, N=nodes). Normal hash mod = ALL keys rehash. Consistent hashing is essential for distributed caches."
            },

            learn: {
                decisions: [
                    {
                        question: "Cache-aside vs Write-through?",
                        answer: "Cache-aside for reads, async write for writes",
                        why: "Cache-aside: App checks cache → miss → DB → update cache. Simple, app controls."
                    },
                    {
                        question: "How to handle cache node failure?",
                        answer: "Replicas + Consistent Hashing",
                        why: "Each key stored on N nodes (typically 3). Consistent hashing ensures minimal disruption."
                    },
                    {
                        question: "Eviction policy?",
                        answer: "LRU (Least Recently Used) default",
                        why: "LRU works for most workloads. LFU for skewed access patterns."
                    }
                ],

                components: [
                    {
                        name: "Consistent Hashing",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Hash Ring (0 to 2^32):
     
        Node A (pos 1000)
           ●
          / \\
         /   \\
        ●     ●
   Node C    Node B
  (pos 3000) (pos 2000)

Key "user:123" → hash = 1500
→ Goes to next node clockwise = Node B

Add Node D at pos 1500:
→ Only keys between A and D move!
→ Not ALL keys like hash % N
</pre>`,
                        trap: "Use virtual nodes! Real nodes get 100-200 virtual positions for even distribution."
                    },
                    {
                        name: "Cache Stampede Prevention",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Problem: Key expires, 1000 requests hit DB!

Solutions:

1. Locking (Mutex):
   if cache_miss:
       if acquire_lock(key):
           value = db.get(key)
           cache.set(key, value)
           release_lock(key)
       else:
           wait_and_retry()

2. Early Expiration:
   if now > refresh_at:
       async_refresh()
       return stale_value
</pre>`,
                        trap: "Mutex can cause thundering herd on the LOCK. Use short TTL + retry."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                   DISTRIBUTED CACHE ARCHITECTURE                     │
└─────────────────────────────────────────────────────────────────────┘

[App Servers]
    │
    │ Hash(key) → Consistent Hash Ring
    ▼
┌─────────────────────────────────────────────────────────────┐
│                    CACHE CLUSTER                             │
│                                                              │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐  │
│   │ Node A  │    │ Node B  │    │ Node C  │    │ Node D  │  │
│   │ Master  │    │ Master  │    │ Master  │    │ Master  │  │
│   └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘  │
│        │              │              │              │        │
│   ┌────▼────┐    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐  │
│   │ Replica │    │ Replica │    │ Replica │    │ Replica │  │
│   └─────────┘    └─────────┘    └─────────┘    └─────────┘  │
│                                                              │
│   Consistent Hash Ring:                                      │
│   Keys 0-25% → A, 25-50% → B, 50-75% → C, 75-100% → D       │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼ (Cache Miss)
            ┌───────────────┐
            │   Database    │
            └───────────────┘
</pre>`,

                traps: [
                    {
                        question: "Hot key problem (celebrity)?",
                        answer: "Replicate hot key to multiple nodes. Or local cache in app servers."
                    },
                    {
                        question: "Large value (10MB)?",
                        answer: "Chunk into smaller keys. Or use object storage (S3) with cache for metadata."
                    }
                ],

                metrics: { time: "45 min interview", space: "TB scale, sub-ms latency" },

                codeTitle: "Consistent Hashing (Python)",
                code: `import hashlib
import bisect

class ConsistentHash:
    def __init__(self, nodes=None, virtual_nodes=150):
        self.virtual_nodes = virtual_nodes
        self.ring = []
        self.hash_to_node = {}
        
        if nodes:
            for node in nodes:
                self.add_node(node)
    
    def _hash(self, key: str) -> int:
        return int(hashlib.md5(key.encode()).hexdigest(), 16)
    
    def add_node(self, node: str):
        for i in range(self.virtual_nodes):
            h = self._hash(f"{node}:{i}")
            bisect.insort(self.ring, h)
            self.hash_to_node[h] = node
    
    def get_node(self, key: str) -> str:
        if not self.ring:
            return None
        h = self._hash(key)
        idx = bisect.bisect_right(self.ring, h)
        if idx == len(self.ring):
            idx = 0
        return self.hash_to_node[self.ring[idx]]

# Usage:
# ch = ConsistentHash(['node1', 'node2', 'node3'])
# ch.get_node("user:123")  # Returns "node2"
# ch.add_node("node4")     # Only ~25% keys move!`
            }
        }
    ]
};
