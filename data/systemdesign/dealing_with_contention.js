// System Design - Dealing with Contention Patterns
// Ticketmaster, Online Auction

const topic_systemdesign_dealing_with_contention = {
    id: "systemdesign_dealing_with_contention",
    title: "System Design: Dealing with Contention",
    description: "Principal Engineer • Handling Race Conditions",
    color: "#d63031",
    icon: "fas fa-lock",
    mentalModel: {
        whenToApply: [
            { label: "🎫 Limited Inventory", desc: "Selling finite items to many? → Pessimistic Locking / Queue" },
            { label: "💰 Bidding/Auction", desc: "Highest bid wins? → Distributed Locks + Event Ordering" },
            { label: "🏃 Flash Sales", desc: "10M users, 1000 items? → Virtual Queue + Lottery" },
            { label: "💺 Seat Selection", desc: "One seat, one user? → SELECT FOR UPDATE / Optimistic Lock" },
            { label: "⚔️ Race Conditions", desc: "Multiple writers same data? → Locks, CAS, Versioning" }
        ],
        patterns: [
            { algo: "Pessimistic Lock", use: "High contention", time: "O(1)", space: "O(locks)", template: "SELECT FOR UPDATE, hold lock" },
            { algo: "Optimistic Lock", use: "Low contention", time: "O(1)", space: "O(1)", template: "Version check on write, retry on conflict" },
            { algo: "Distributed Lock", use: "Multi-node", time: "O(1)", space: "O(keys)", template: "Redis SETNX with TTL, Redlock" },
            { algo: "Virtual Queue", use: "Fairness", time: "O(1)", space: "O(users)", template: "Assign position, process in order" },
            { algo: "Compare-And-Swap", use: "Atomic updates", time: "O(1)", space: "O(1)", template: "if current == expected: update" }
        ],
        safetyCheck: [
            { label: "⚠️ Deadlocks", desc: "Always acquire locks in same order. Set timeouts!" },
            { label: "🔄 Retry Storm", desc: "Exponential backoff on lock failures, not instant retry" },
            { label: "⏱️ Lock TTL", desc: "Always set expiry - crashed process = permanent lock!" },
            { label: "🎭 False Failures", desc: "Optimistic lock: high contention = many retries. Switch to pessimistic." }
        ]
    },
    questions: [
        {
            id: "ticketmaster",
            title: "Design Ticketmaster",
            difficulty: "Hard",
            priority: "🔴",
            tags: ["Contention", "Inventory", "Locking"],

            scaleEstimates: {
                peakUsers: "10 Million concurrent (Taylor Swift sale)",
                tickets: "50,000 seats",
                saleWindow: "First 10 minutes = 90% sold",
                qps: "1M+ requests in first minute",
                note: "Extreme read/write skew - 10M reads, 50k writes"
            },

            quiz: {
                description: "How to prevent overselling when 1M users try to book same seats?",
                options: [
                    "First-come-first-serve, no locks",
                    "Optimistic locking with version numbers",
                    "Pessimistic locking (SELECT FOR UPDATE)",
                    "Virtual queue + sequential processing"
                ],
                correct: 3,
                explanation: "Virtual Queue! At 1M QPS, even pessimistic locks will deadlock. Queue users, process sequentially. Fair + prevents system overload."
            },

            learn: {
                decisions: [
                    {
                        question: "Pessimistic vs Optimistic locking?",
                        answer: "Pessimistic for seat selection",
                        why: "High contention = many optimistic failures. Pessimistic: lock seat, hold for 10 min, release if not paid."
                    },
                    {
                        question: "How to handle 10M users for 50k seats?",
                        answer: "Virtual Waiting Room + Lottery",
                        why: "Queue everyone, randomly select 50k to enter buying flow. Rest get 'sold out' message. Fair and controlled."
                    },
                    {
                        question: "Seat hold timeout?",
                        answer: "10 minutes with countdown",
                        why: "Hold seat while user enters payment. Release after 10 min if not completed. Prevents hoarding."
                    }
                ],

                components: [
                    {
                        name: "Virtual Waiting Room",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Flow:
1. User visits → Assigned queue position (Redis INCR)
2. Server processing capacity: 1000 users/batch
3. Every 30s: admit next 1000 from queue
4. Position displayed: "You are #45,234 in line"

Redis:
INCR queue:event_123:position → Returns user's position
GET queue:event_123:current  → Currently serving position
</pre>`,
                        trap: "Don't let users refresh to get better position - tie to session/user ID!"
                    },
                    {
                        name: "Seat Locking (SELECT FOR UPDATE)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
BEGIN TRANSACTION;

-- Lock the seat (blocks other transactions)
SELECT * FROM seats 
WHERE event_id = 123 AND seat_id = 'A15' AND status = 'AVAILABLE'
FOR UPDATE;

-- If returned, seat is yours (locked)
UPDATE seats SET status = 'HELD', held_by = user_id, 
       held_until = NOW() + INTERVAL 10 MINUTE
WHERE seat_id = 'A15';

COMMIT;

-- Background job releases expired holds every minute
</pre>`,
                        trap: "Set lock timeout! User closes browser = seat locked forever without TTL."
                    },
                    {
                        name: "Inventory Counter",
                        solution: `<ul>
<li><strong>Don't count on every request:</strong> SELECT COUNT(*) is slow</li>
<li><strong>Pre-decrement:</strong> Redis DECR for fast inventory check</li>
<li><strong>Oversell buffer:</strong> Allow 5% oversell, handle manually</li>
</ul>
<pre style="background:#2d3436; color:#dfe6e9; padding:10px; border-radius:8px; font-size:0.85rem;">
# Fast inventory check
remaining = redis.DECR("event:123:tickets")
if remaining < 0:
    redis.INCR("event:123:tickets")  # Rollback
    return "SOLD OUT"
</pre>`,
                        trap: "Redis DECR can go negative. Check and rollback!"
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                      TICKETMASTER ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────────┘

  [10M Users]
      │
      ▼
┌──────────────┐     ┌─────────────────┐
│   CDN/WAF    │────►│ Waiting Room    │  "You are #45,234"
│              │     │ (Static page)   │
└──────────────┘     └────────┬────────┘
                              │ Admitted (1000/batch)
                              ▼
                     ┌─────────────────┐
                     │   Load Balancer │
                     └────────┬────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
    ┌──────────┐        ┌──────────┐        ┌──────────┐
    │ App Srv 1│        │ App Srv 2│        │ App Srv N│
    └────┬─────┘        └────┬─────┘        └────┬─────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
        ┌──────────┐                 ┌────────────┐
        │  Redis   │                 │ PostgreSQL │
        │ (Queue,  │                 │  (Seats,   │
        │ Inventory)│                │  Orders)   │
        └──────────┘                 └────────────┘

SEAT BOOKING FLOW:
1. Check inventory (Redis DECR)
2. SELECT seat FOR UPDATE
3. Hold seat 10 min
4. Payment → Confirm or Release
</pre>`,

                traps: [
                    {
                        question: "How to handle payment failures?",
                        answer: "Release seat back to pool after timeout. Idempotency key for payment retry."
                    },
                    {
                        question: "Prevent bots?",
                        answer: "CAPTCHA, rate limiting, device fingerprinting, queue randomization."
                    },
                    {
                        question: "Show seat map in real-time?",
                        answer: "WebSocket broadcast on seat status change. Debounce to avoid flood."
                    }
                ],

                metrics: { time: "45 min interview", space: "PostgreSQL + Redis" },

                codeTitle: "Seat Locking (Python + SQLAlchemy)",
                code: `from sqlalchemy import select, update
from datetime import datetime, timedelta

def try_hold_seat(session, event_id, seat_id, user_id):
    """Pessimistic lock: hold seat for 10 minutes"""
    
    # SELECT FOR UPDATE - blocks concurrent access
    stmt = select(Seat).where(
        Seat.event_id == event_id,
        Seat.seat_id == seat_id,
        Seat.status == 'AVAILABLE'
    ).with_for_update()
    
    seat = session.execute(stmt).scalar_one_or_none()
    
    if not seat:
        return {"success": False, "error": "Seat not available"}
    
    # Hold the seat for 10 minutes
    seat.status = 'HELD'
    seat.held_by = user_id
    seat.held_until = datetime.now() + timedelta(minutes=10)
    
    session.commit()
    return {"success": True, "held_until": seat.held_until}

def release_expired_holds(session):
    """Background job: release expired seat holds"""
    stmt = update(Seat).where(
        Seat.status == 'HELD',
        Seat.held_until < datetime.now()
    ).values(status='AVAILABLE', held_by=None, held_until=None)
    
    session.execute(stmt)
    session.commit()`
            }
        },
        {
            id: "online-auction",
            title: "Design Online Auction",
            difficulty: "Hard",
            priority: "🟡",
            tags: ["Contention", "Real-Time", "Distributed Lock"],

            scaleEstimates: {
                concurrentAuctions: "100,000",
                bidsPerSecond: "10,000",
                hotAuctions: "Top 1% = 90% of bids",
                latencyRequirement: "<100ms bid confirmation",
                note: "Highest bid MUST win - ordering is critical!"
            },

            quiz: {
                description: "How to ensure bid ordering when 1000 bids arrive in same second?",
                options: [
                    "Timestamp from client",
                    "Database auto-increment",
                    "Server timestamp + distributed lock",
                    "Random tie-breaker"
                ],
                correct: 2,
                explanation: "Server timestamp + lock! Client time is untrusted. Lock the auction item, check current price, accept/reject, update, unlock. Atomic operation."
            },

            learn: {
                decisions: [
                    {
                        question: "Where to store current bid?",
                        answer: "Redis (hot) + DB (persistent)",
                        why: "Redis for real-time: 1000s of reads/sec. Async write to DB for durability."
                    },
                    {
                        question: "How to prevent bid sniping?",
                        answer: "Auto-extend auction if bid in last 30 sec",
                        why: "Fair to all bidders. Prevents last-second snipes."
                    },
                    {
                        question: "Distributed lock algorithm?",
                        answer: "Redis Redlock or single Redis with SETNX",
                        why: "Simple SETNX for most cases. Redlock for high availability (5 Redis nodes)."
                    }
                ],

                components: [
                    {
                        name: "Bid Processing (Redis Lock)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
1. Acquire lock: SETNX auction:123:lock user_id EX 5
2. Get current bid: GET auction:123:current_bid
3. Validate: new_bid > current_bid + min_increment
4. Update: SET auction:123:current_bid new_bid
5. Release lock: DEL auction:123:lock
6. Broadcast: Publish to WebSocket

If lock fail → Return "Please try again"
</pre>`,
                        trap: "Always set lock TTL! Crashed process = permanent lock. Use 5s TTL."
                    },
                    {
                        name: "Real-Time Updates (WebSocket)",
                        solution: `<ul>
<li><strong>Subscribe:</strong> User opens auction → subscribe to auction:123</li>
<li><strong>Publish:</strong> On bid → broadcast to all subscribers</li>
<li><strong>Payload:</strong> {current_bid, bidder_name, time_left}</li>
</ul>`,
                        trap: "Throttle broadcasts! 100 bids/sec = 100 updates. Batch to 1 update/500ms."
                    },
                    {
                        name: "Anti-Sniping Timer",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
On every bid:
  if time_remaining < 30 seconds:
      extend_end_time by 30 seconds
      notify all watchers

Maximum extensions (optional):
  total_extension <= 5 minutes
</pre>`,
                        trap: "Cap extensions! Or auction could run forever."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
BID FLOW:

[Bidder] ──► [API Gateway] ──► [Bid Service]
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              ┌─────────┐    ┌──────────┐    ┌──────────┐
              │ Acquire │    │  Kafka   │    │ WebSocket│
              │  Lock   │    │ (Events) │    │ Broadcast│
              │ (Redis) │    └──────────┘    └──────────┘
              └────┬────┘
                   │
              ┌────▼────┐
              │ Validate│ current_bid < new_bid?
              │   Bid   │
              └────┬────┘
                   │ ✓
              ┌────▼────┐
              │ Update  │ Redis + Async DB
              │  State  │
              └────┬────┘
                   │
              ┌────▼────┐
              │ Release │
              │  Lock   │
              └────┬────┘
                   │
                   ▼
              [Notify All Watchers via WebSocket]
</pre>`,

                traps: [
                    {
                        question: "What if Redis node fails during bid?",
                        answer: "Redlock across 5 Redis nodes. Majority quorum for lock acquisition."
                    },
                    {
                        question: "Late bid arrives after auction ended?",
                        answer: "Reject. Server time is authoritative. Log for dispute resolution."
                    },
                    {
                        question: "How to handle reserve price?",
                        answer: "Hidden min price. If final bid < reserve, item doesn't sell."
                    }
                ],

                metrics: { time: "45 min interview", space: "Redis + Kafka + DB" },

                codeTitle: "Atomic Bid with Redis Lock",
                code: `import redis
import time

r = redis.Redis()

def place_bid(auction_id, user_id, bid_amount):
    lock_key = f"auction:{auction_id}:lock"
    
    # Try to acquire lock (5s TTL)
    if not r.set(lock_key, user_id, nx=True, ex=5):
        return {"success": False, "error": "Auction busy, try again"}
    
    try:
        # Get current state
        current = r.hgetall(f"auction:{auction_id}")
        current_bid = float(current.get(b'current_bid', 0))
        min_increment = float(current.get(b'min_increment', 1))
        end_time = float(current.get(b'end_time', 0))
        
        # Validate
        if time.time() > end_time:
            return {"success": False, "error": "Auction ended"}
        
        if bid_amount < current_bid + min_increment:
            return {"success": False, "error": f"Bid must be >= {current_bid + min_increment}"}
        
        # Update
        r.hmset(f"auction:{auction_id}", {
            'current_bid': bid_amount,
            'current_bidder': user_id,
            'last_bid_time': time.time()
        })
        
        # Anti-snipe: extend if < 30s remaining
        if end_time - time.time() < 30:
            r.hset(f"auction:{auction_id}", 'end_time', end_time + 30)
        
        # Publish update to WebSocket
        r.publish(f"auction:{auction_id}:updates", 
                  f'{{"bid": {bid_amount}, "user": "{user_id}"}}')
        
        return {"success": True, "message": "Bid accepted!"}
    
    finally:
        r.delete(lock_key)  # Always release lock`
            }
        }
    ]
};
