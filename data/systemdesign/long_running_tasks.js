// System Design - Managing Long Running Tasks
// Web Crawler, LeetCode Code Execution

const topic_systemdesign_long_running_tasks = {
    id: "systemdesign_long_running_tasks",
    title: "System Design: Managing Long Running Tasks",
    description: "Principal Engineer • Long-Running Tasks",
    color: "#2d3436",
    icon: "fas fa-tasks",
    mentalModel: {
        whenToApply: [
            { label: "🕷️ Web Crawling", desc: "Explore internet? → URL Frontier + BFS + Politeness" },
            { label: "⚡ Code Execution", desc: "Run untrusted code? → Sandbox + Container + Limits" },
            { label: "⏰ Scheduled Jobs", desc: "Periodic tasks? → Leader Election + Cron + Idempotency" },
            { label: "📊 Batch Processing", desc: "Process millions? → MapReduce + Partitioning" },
            { label: "🔄 Async Workflows", desc: "Long-running? → Job Queue + State Machine" }
        ],
        patterns: [
            { algo: "URL Frontier", use: "Crawl scheduling", time: "O(1)", space: "O(URLs)", template: "Priority queue + seen set" },
            { algo: "Sandbox", use: "Code isolation", time: "Variable", space: "Container", template: "Docker + cgroups + seccomp" },
            { algo: "Leader Election", use: "Single coordinator", time: "O(1)", space: "O(nodes)", template: "Raft/Paxos, or Redis SETNX" },
            { algo: "MapReduce", use: "Parallel processing", time: "O(N/workers)", space: "Distributed", template: "Map → Shuffle → Reduce" },
            { algo: "Job Queue", use: "Async work", time: "O(1)", space: "O(jobs)", template: "Producer → Queue → Consumer" }
        ],
        safetyCheck: [
            { label: "⚠️ Resource Bombs", desc: "Infinite loop / memory bomb. Set CPU, memory, time limits!" },
            { label: "🕸️ Spider Traps", desc: "Infinite URL generator. Track depth, detect patterns." },
            { label: "⏱️ Job Timeouts", desc: "Long job = stuck worker. Heartbeat + timeout + requeue." },
            { label: "🔄 Exactly-Once", desc: "Worker crashes mid-job. Use idempotent processing." }
        ]
    },
    questions: [
        {
            id: "web-crawler",
            title: "Design Web Crawler",
            difficulty: "Hard",
            priority: "🟡",
            tags: ["Distributed", "Crawling", "BFS"],

            scaleEstimates: {
                urlsToVisit: "1 Billion pages",
                crawlersNeeded: "1000+ workers",
                pagesPerSecond: "10,000",
                storagePerPage: "~100KB (compressed)",
                note: "Politeness = don't DDoS! 1 req/sec per domain max."
            },

            quiz: {
                description: "How to avoid crawling same URL twice across 1000 workers?",
                options: [
                    "Each worker keeps local seen set",
                    "Centralized Redis set of all URLs",
                    "Bloom filter for probabilistic check",
                    "Don't check - duplicates are fine"
                ],
                correct: 2,
                explanation: "Bloom Filter! Space-efficient (10 bytes vs 100 bytes per URL). False positives OK (skip some pages), no false negatives. Distributed or per-worker."
            },

            learn: {
                decisions: [
                    {
                        question: "BFS vs DFS traversal?",
                        answer: "BFS - get breadth first",
                        why: "Important pages linked from homepage. DFS = deep in one path. BFS = wide coverage."
                    },
                    {
                        question: "How to be polite?",
                        answer: "1 request/second per domain",
                        why: "Respect robots.txt. Separate queues per domain. Delay between requests."
                    },
                    {
                        question: "How to prioritize URLs?",
                        answer: "PageRank + freshness + domain authority",
                        why: "Not all pages equal. Prioritize high-value pages first."
                    }
                ],

                components: [
                    {
                        name: "URL Frontier (Priority Queue)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Two-Level Queue:
1. Front Queue (Priority):
   - High: Homepage, popular sites
   - Medium: Linked from high-priority
   - Low: Deep pages, low PageRank

2. Back Queue (Per-Domain):
   - Separate queue per domain
   - Enforces politeness (1 req/sec)
   - Round-robin across domains

Worker picks:
1. Get next priority item
2. Check domain's last crawl time
3. If too recent, get another domain
</pre>`,
                        trap: "Be polite! Check robots.txt. Respect Crawl-Delay directive."
                    },
                    {
                        name: "Duplicate Detection (Bloom Filter)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Bloom Filter:
- Probabilistic set membership
- 1% false positive rate @ 10 bits/element
- No false negatives!

1 Billion URLs:
- Hash set: 100GB+
- Bloom filter: ~1.2GB

Distributed:
- Partition by URL hash
- Each worker checks its shard
</pre>`,
                        trap: "Bloom filters can't delete. Use counting bloom filter or rebuild periodically."
                    },
                    {
                        name: "Content Processing",
                        solution: `<ul>
<li><strong>Parse HTML:</strong> Extract links, text, title</li>
<li><strong>Normalize URLs:</strong> Remove fragments, lowercase domain</li>
<li><strong>Checksum:</strong> Detect duplicate content (SimHash)</li>
<li><strong>Store:</strong> Compressed HTML + metadata</li>
</ul>`,
                        trap: "Spider traps! calendar.php?date=2025-01-01, date=2025-01-02... infinite URLs. Limit depth per domain."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                       WEB CRAWLER ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────────┘

              ┌─────────────┐
              │ Seed URLs   │
              └──────┬──────┘
                     ▼
              ┌─────────────┐
              │   Frontier  │◄──────────────────────┐
              │ (Priority Q)│                       │
              └──────┬──────┘                       │
                     │                              │
    ┌────────────────┼────────────────┐             │
    ▼                ▼                ▼             │
┌────────┐      ┌────────┐      ┌────────┐         │
│Worker 1│      │Worker 2│      │Worker N│         │
│ Fetch  │      │ Fetch  │      │ Fetch  │         │
└───┬────┘      └───┬────┘      └───┬────┘         │
    │               │               │              │
    └───────────────┼───────────────┘              │
                    ▼                              │
             ┌──────────┐     ┌──────────┐         │
             │  Parser  │────►│  Bloom   │──(new)──┘
             │ (Extract │     │  Filter  │
             │  Links)  │     │ (Dedup)  │
             └────┬─────┘     └──────────┘
                  │
                  ▼
       ┌──────────────────┐
       │   Content Store  │ (S3 / HDFS)
       │   Index Builder  │
       └──────────────────┘
</pre>`,

                traps: [
                    {
                        question: "What about JavaScript-rendered pages?",
                        answer: "Headless browser (Puppeteer) for JS pages. Much slower - use selectively."
                    },
                    {
                        question: "Site blocks crawler?",
                        answer: "Rotate IPs, use proxies, respect 429/503. May need to skip site."
                    },
                    {
                        question: "How to recrawl for freshness?",
                        answer: "Recrawl frequency based on update history. News = hourly. Static = monthly."
                    }
                ],

                metrics: { time: "45 min interview", space: "S3 + Redis + Kafka" },

                codeTitle: "Bloom Filter Implementation",
                code: `import hashlib
import math

class BloomFilter:
    def __init__(self, expected_items, false_positive_rate=0.01):
        # Calculate optimal size and hash count
        self.size = self._optimal_size(expected_items, false_positive_rate)
        self.hash_count = self._optimal_hash_count(self.size, expected_items)
        self.bit_array = [False] * self.size
    
    def _optimal_size(self, n, p):
        """Optimal bit array size"""
        return int(-n * math.log(p) / (math.log(2) ** 2))
    
    def _optimal_hash_count(self, m, n):
        """Optimal number of hash functions"""
        return int((m / n) * math.log(2))
    
    def _hashes(self, item):
        """Generate k hash values for item"""
        hashes = []
        for i in range(self.hash_count):
            h = hashlib.md5(f"{item}{i}".encode()).hexdigest()
            hashes.append(int(h, 16) % self.size)
        return hashes
    
    def add(self, item):
        """Add item to filter"""
        for pos in self._hashes(item):
            self.bit_array[pos] = True
    
    def might_contain(self, item):
        """Check if item might be in filter (false positives possible)"""
        return all(self.bit_array[pos] for pos in self._hashes(item))

# Usage:
# bf = BloomFilter(1_000_000_000, 0.01)  # 1B URLs, 1% FP
# bf.add("https://example.com/page1")
# bf.might_contain("https://example.com/page1")  # True
# bf.might_contain("https://new-url.com")        # Probably False`
            }
        },
        {
            id: "leetcode",
            title: "Design LeetCode (Code Execution)",
            difficulty: "Hard",
            priority: "🟡",
            tags: ["Distributed", "Sandbox", "Scheduler"],

            scaleEstimates: {
                submissionsPerDay: "1 Million",
                peakSubmissions: "1000/sec (contest)",
                executionTime: "< 5 seconds typical",
                languagesSupported: "20+",
                note: "Untrusted code! Must sandbox completely - fork bombs, infinite loops, file access."
            },

            quiz: {
                description: "How to safely run untrusted user code?",
                options: [
                    "Run directly on worker VM",
                    "Docker container with resource limits",
                    "Parse and validate code first",
                    "Run in same process, catch exceptions"
                ],
                correct: 1,
                explanation: "Docker + cgroups + seccomp! Container isolates filesystem. Cgroups limit CPU/memory. Seccomp blocks syscalls. Never trust user code."
            },

            learn: {
                decisions: [
                    {
                        question: "Container per submission or pool?",
                        answer: "Pool with cleanup between runs",
                        why: "Cold start = 2s delay. Warm pool, reset state between runs."
                    },
                    {
                        question: "How to enforce time limits?",
                        answer: "Wall clock + CPU time limits",
                        why: "sleep(100) cheats CPU time. Wall clock catches everything. Kill after 10s."
                    },
                    {
                        question: "How to run test cases?",
                        answer: "Parallel on same container",
                        why: "100 test cases × fresh container = slow. Run all tests, track which fail."
                    }
                ],

                components: [
                    {
                        name: "Sandbox (Docker + cgroups)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Resource Limits:
- CPU: 1 core max
- Memory: 256MB (hard limit)
- Time: 10 seconds wall clock
- Disk: Read-only (no writes)
- Network: Disabled
- PIDs: 64 max (prevent fork bombs)

Security:
- seccomp: Block dangerous syscalls
- No root access
- Minimal base image
- Fresh filesystem each run
</pre>`,
                        trap: "Memory limit must be HARD. Soft limits can be bypassed. OOM = immediate kill."
                    },
                    {
                        name: "Judge System Architecture",
                        solution: `<ul>
<li><strong>Submission Queue:</strong> RabbitMQ/SQS for durability</li>
<li><strong>Worker Pool:</strong> Auto-scale based on queue depth</li>
<li><strong>Result Store:</strong> Redis for real-time, DB for persistence</li>
<li><strong>Test Case Storage:</strong> S3 with caching</li>
</ul>`,
                        trap: "Queue can explode during contests! Pre-scale workers + rate limit per user."
                    },
                    {
                        name: "Result Comparison",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Comparison Modes:
1. Exact match: strcmp(output, expected)
2. Token match: split and compare (ignore whitespace)
3. Float tolerance: |output - expected| < 1e-6
4. Special judge: custom validator (for multiple valid answers)

Results:
- Accepted ✓
- Wrong Answer ✗
- Time Limit Exceeded ⏱️
- Memory Limit Exceeded 💾
- Runtime Error 💥
- Compilation Error 🔧
</pre>`,
                        trap: "Trailing newline / whitespace causes many 'Wrong Answer'. Be lenient or clear in spec."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                    LEETCODE JUDGE ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────────┘

[User] ──► [API] ──► [Submission Queue]
              │              │
              │              ▼
              │      ┌───────────────┐
              │      │ Judge Workers │ (Auto-scale pool)
              │      │ ┌───────────┐ │
              │      │ │ Container │ │  ← Docker + cgroups
              │      │ │ - Compile │ │
              │      │ │ - Execute │ │
              │      │ │ - Compare │ │
              │      │ └───────────┘ │
              │      └───────┬───────┘
              │              │
              │              ▼
              │      ┌───────────────┐
              │      │ Test Cases    │ (S3 + Cache)
              │      │ - Input       │
              │      │ - Expected    │
              │      └───────────────┘
              │              │
              │              ▼
              │      ┌───────────────┐
              ├─────►│ Result Store  │ ──► [WebSocket]
              │      │ (Redis + DB)  │      "Accepted!"
              │      └───────────────┘
              │
              ▼
       [Leaderboard / Stats]
</pre>`,

                traps: [
                    {
                        question: "User submits malware?",
                        answer: "Container can't escape. No network. Read-only FS. Kill after timeout."
                    },
                    {
                        question: "How to handle compilation?",
                        answer: "Compile in same container. Compilation timeout separate from runtime."
                    },
                    {
                        question: "Contest: 10k submissions in 1 minute?",
                        answer: "Pre-warm containers. Queue with priority. Rate limit per user."
                    }
                ],

                metrics: { time: "45 min interview", space: "K8s + Docker + SQS + Redis" },

                codeTitle: "Docker Sandbox Runner",
                code: `import docker
import tempfile
import os

client = docker.from_env()

def run_code(language, code, test_input, timeout=10):
    """Run user code in isolated container"""
    
    # Create temp directory with code
    with tempfile.TemporaryDirectory() as tmpdir:
        code_file = os.path.join(tmpdir, "solution.py")
        input_file = os.path.join(tmpdir, "input.txt")
        
        with open(code_file, 'w') as f:
            f.write(code)
        with open(input_file, 'w') as f:
            f.write(test_input)
        
        try:
            # Run in container with strict limits
            result = client.containers.run(
                image="python:3.9-slim",
                command="python solution.py < input.txt",
                volumes={tmpdir: {'bind': '/app', 'mode': 'ro'}},
                working_dir="/app",
                mem_limit="256m",
                cpu_period=100000,
                cpu_quota=100000,  # 1 CPU
                pids_limit=64,
                network_disabled=True,
                read_only=True,
                remove=True,
                timeout=timeout
            )
            return {
                "status": "success",
                "output": result.decode('utf-8')
            }
            
        except docker.errors.ContainerError as e:
            return {"status": "runtime_error", "error": str(e)}
        except Exception as e:
            if "timeout" in str(e).lower():
                return {"status": "time_limit_exceeded"}
            return {"status": "error", "error": str(e)}

# Usage:
# result = run_code("python", "print(input())", "Hello World")
# result = {"status": "success", "output": "Hello World\\n"}`
            }
        }
    ]
};
