// System Design - Real-Time Updates
// WhatsApp, Uber, Notification System

const topic_systemdesign_realtime_updates = {
    id: "systemdesign_realtime_updates",
    title: "System Design: Real-Time Updates",
    description: "Principal Engineer • Real-Time Updates",
    color: "#00b894",
    icon: "fas fa-bolt",
    mentalModel: {
        whenToApply: [
            { label: "💬 Chat/Messaging", desc: "1:1 or group chat? → WebSockets + Presence + Message Queue" },
            { label: "📍 Location Tracking", desc: "High-frequency updates? → GeoHash/QuadTree + Pub/Sub" },
            { label: "🔔 Notifications", desc: "Push updates? → WebSocket / SSE / Long Polling" },
            { label: "👥 Presence/Online", desc: "Who's online? → Heartbeats + Redis Bitmap" },
            { label: "🗺️ Geo-Spatial", desc: "Find nearby? → GeoHash / S2 / QuadTree" }
        ],
        patterns: [
            { algo: "WebSockets", use: "Bi-directional real-time", time: "O(1)", space: "1 conn/user", template: "Persistent TCP, full-duplex" },
            { algo: "Long Polling", use: "Fallback for WebSocket", time: "O(1)", space: "1 conn/user", template: "HTTP hold → response → reconnect" },
            { algo: "Pub/Sub", use: "Broadcast updates", time: "O(subscribers)", space: "O(topics)", template: "Redis Pub/Sub, Kafka" },
            { algo: "GeoHash", use: "Location indexing", time: "O(1)", space: "O(N)", template: "Lat/Long → string prefix" },
            { algo: "Heartbeat", use: "Presence detection", time: "O(1)", space: "O(users)", template: "Ping every 30s, timeout = offline" }
        ],
        safetyCheck: [
            { label: "⚠️ Connection Limits", desc: "1M users = 1M WebSocket connections. Need connection pooling!" },
            { label: "🔄 Reconnection", desc: "Handle disconnects gracefully - exponential backoff" },
            { label: "📦 Message Ordering", desc: "Out-of-order messages break chat. Use sequence numbers!" },
            { label: "🗺️ Geo Precision", desc: "GeoHash precision: 6 chars = ~1km, 8 chars = ~20m" }
        ]
    },
    questions: [
        {
            id: "whatsapp",
            title: "Design WhatsApp",
            difficulty: "Hard",
            priority: "🔴",
            tags: ["Real-Time", "Messaging", "Presence"],

            scaleEstimates: {
                dau: "2 Billion users",
                messagesPerDay: "100 Billion messages",
                qps: "~1M messages/sec",
                storage: "~100TB/day (text + media metadata)",
                note: "Read-heavy (100:1 read:write ratio for group chats)"
            },

            quiz: {
                description: "How to handle message delivery when user is offline?",
                options: [
                    "Hold connection open indefinitely",
                    "Store in DB, push when online (Store-and-Forward)",
                    "Discard message after timeout",
                    "Retry every second"
                ],
                correct: 1,
                explanation: "Store-and-Forward! Store offline messages in DB/queue. When user comes online (heartbeat detected), push pending messages. Never lose messages!"
            },

            learn: {
                decisions: [
                    {
                        question: "WebSocket vs Long Polling?",
                        answer: "WebSocket (primary), Long Polling (fallback)",
                        why: "WebSocket = persistent, bi-directional, lower latency. Long Polling for firewalls/proxies that block WS."
                    },
                    {
                        question: "How to detect online/offline?",
                        answer: "Heartbeat every 30 seconds",
                        why: "No heartbeat for 60s = offline. Use Redis with TTL for presence tracking."
                    },
                    {
                        question: "Message storage?",
                        answer: "Cassandra (write-optimized)",
                        why: "Log-structured, handles 1M writes/sec. Partition by (user_id, timestamp)."
                    }
                ],

                components: [
                    {
                        name: "Connection Gateway",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
WebSocket Server Fleet:
- 1M concurrent connections per server
- Sticky sessions (user → same server)
- Connection Registry: user_id → server_id

Message Flow:
1. Client connects to Gateway
2. Gateway registers in Redis: user_123 → gateway_5
3. Messages routed via Redis Pub/Sub
</pre>`,
                        trap: "Don't route ALL messages through one broker - partition by user_id!"
                    },
                    {
                        name: "Message Delivery (Fanout)",
                        solution: `<ul>
<li><strong>1:1 Chat:</strong> Direct push via user's gateway</li>
<li><strong>Group Chat:</strong> Fan-out on read (small groups) or Fan-out on write (large groups)</li>
<li><strong>Offline Users:</strong> Store in pending queue, push on reconnect</li>
</ul>
<pre style="background:#2d3436; color:#dfe6e9; padding:10px; border-radius:8px; font-size:0.85rem;">
# Message States
SENT     → Server received
DELIVERED → Recipient's device received  
READ      → Recipient opened chat
</pre>`,
                        trap: "Group of 1000 users = 1000 writes. Use lazy fan-out for large groups!"
                    },
                    {
                        name: "Presence System",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Redis-based Presence:
SETEX user:123:online 60 "gateway_5"  # TTL 60s

Heartbeat (every 30s):
EXPIRE user:123:online 60  # Refresh TTL

Check Online:
EXISTS user:123:online  # Returns 1 if online

For Contacts List (100 friends):
MGET user:101:online user:102:online ...
</pre>`,
                        trap: "Don't broadcast 'typing...' to everyone - only to current chat partner!"
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                         WHATSAPP ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────┘

  [Phone A]                                              [Phone B]
      │                                                      ▲
      │ WebSocket                                            │
      ▼                                                      │
┌──────────┐      ┌──────────────┐      ┌──────────────┐    │
│ Gateway  │◄────►│ Redis Pub/Sub│◄────►│   Gateway    │────┘
│ Server 1 │      │ (Routing)    │      │   Server 2   │
└────┬─────┘      └──────────────┘      └──────────────┘
     │                   │
     │      ┌────────────┴────────────┐
     │      ▼                         ▼
     │ ┌─────────┐            ┌─────────────┐
     │ │Presence │            │   Message   │
     │ │ (Redis) │            │    Queue    │
     │ │ TTL=60s │            │  (Kafka)    │
     │ └─────────┘            └──────┬──────┘
     │                               │
     │              ┌────────────────┴────────────────┐
     ▼              ▼                                 ▼
┌─────────┐   ┌──────────┐                    ┌─────────────┐
│ Session │   │Cassandra │                    │ Media Store │
│  Store  │   │(Messages)│                    │    (S3)     │
└─────────┘   └──────────┘                    └─────────────┘
</pre>`,

                traps: [
                    {
                        question: "How to handle 1000-member groups?",
                        answer: "Fan-out on READ, not write. Store message once, each member fetches from cursor."
                    },
                    {
                        question: "End-to-end encryption?",
                        answer: "Signal Protocol. Server can't read messages - only stores encrypted blobs."
                    },
                    {
                        question: "Message ordering in group?",
                        answer: "Vector clocks or Lamport timestamps. Server assigns sequence number."
                    }
                ],

                metrics: { time: "60 min interview", space: "Cassandra: PB scale" },

                codeTitle: "Presence Check (Python)",
                code: `import redis
r = redis.Redis()

def set_online(user_id, gateway_id):
    """Mark user as online with 60s TTL"""
    r.setex(f"presence:{user_id}", 60, gateway_id)

def heartbeat(user_id):
    """Refresh TTL on heartbeat"""
    r.expire(f"presence:{user_id}", 60)

def is_online(user_id):
    """Check if user is online"""
    return r.exists(f"presence:{user_id}")

def get_gateway(user_id):
    """Get gateway server for user"""
    return r.get(f"presence:{user_id}")

def get_online_friends(user_id, friend_ids):
    """Bulk check online status"""
    keys = [f"presence:{fid}" for fid in friend_ids]
    results = r.mget(keys)
    return [fid for fid, status in zip(friend_ids, results) if status]`
            }
        },
        {
            id: "uber",
            title: "Design Uber",
            difficulty: "Hard",
            priority: "🔴",
            tags: ["Real-Time", "Geo-Spatial", "Matching"],

            scaleEstimates: {
                dau: "100 Million riders",
                activeDrivers: "5 Million concurrent",
                ridesPerDay: "20 Million",
                locationUpdates: "5M updates/sec (drivers ping every 4s)",
                note: "Location data is ephemeral - only recent positions matter"
            },

            quiz: {
                description: "How to efficiently find nearby drivers?",
                options: [
                    "Calculate distance to ALL drivers",
                    "Use GeoHash/QuadTree spatial indexing",
                    "Store drivers in array sorted by distance",
                    "Random selection"
                ],
                correct: 1,
                explanation: "GeoHash/QuadTree! Spatial indexing allows O(1) lookup of nearby cells. Then filter by exact distance. Don't scan all 5M drivers!"
            },

            learn: {
                decisions: [
                    {
                        question: "GeoHash vs QuadTree vs S2?",
                        answer: "GeoHash for simplicity, S2 for precision",
                        why: "GeoHash = easy prefix matching. S2 = Google's choice, handles sphere geometry better."
                    },
                    {
                        question: "How often to update driver location?",
                        answer: "Every 4 seconds",
                        why: "Balance between accuracy and write load. 5M drivers × 0.25 QPS = 1.25M writes/sec"
                    },
                    {
                        question: "Persistent storage for locations?",
                        answer: "NO! In-memory only (Redis)",
                        why: "Location data is ephemeral. Only current position matters. TTL = 30s."
                    }
                ],

                components: [
                    {
                        name: "Location Service (GeoHash)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
GeoHash Encoding:
Lat: 37.7749, Long: -122.4194 → "9q8yy"

Redis Geo Commands:
GEOADD drivers -122.4194 37.7749 "driver_123"
GEORADIUS drivers -122.4194 37.7749 5 km

Precision Levels:
4 chars = ~20km (city level)
6 chars = ~1km  (neighborhood)
8 chars = ~20m  (street level)
</pre>`,
                        trap: "GeoHash has edge cases at cell boundaries - search adjacent cells too!"
                    },
                    {
                        name: "Matching Algorithm",
                        solution: `<ol>
<li>Rider requests ride at location (lat, lng)</li>
<li>Query Redis: GEORADIUS 5km → Get nearby drivers</li>
<li>Filter: only AVAILABLE drivers</li>
<li>Rank by: ETA, rating, vehicle type</li>
<li>Send request to top driver (timeout 15s)</li>
<li>No accept? Try next driver</li>
</ol>`,
                        trap: "Lock driver during request (15s) to prevent double-booking!"
                    },
                    {
                        name: "Dispatch & State Machine",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Driver States:
OFFLINE → AVAILABLE → MATCHING → EN_ROUTE → ON_TRIP

Ride States:
REQUESTED → MATCHED → DRIVER_ARRIVING → IN_PROGRESS → COMPLETED

State stored in Redis with TTL:
SET ride:456:state "IN_PROGRESS" EX 7200
</pre>`,
                        trap: "Use distributed lock when changing driver state - prevent race conditions!"
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                          UBER ARCHITECTURE                           │
└─────────────────────────────────────────────────────────────────────┘

  [Rider App]                                         [Driver App]
      │                                                    │
      │ Request Ride                          Location (4s)│
      ▼                                                    ▼
┌──────────────┐                                  ┌──────────────┐
│   API GW     │                                  │ Location Svc │
└──────┬───────┘                                  └──────┬───────┘
       │                                                 │
       ▼                                                 ▼
┌──────────────┐         ┌─────────────┐         ┌──────────────┐
│ Ride Service │────────►│   Redis     │◄────────│ Driver Pool  │
│ (Matching)   │         │ (GeoIndex)  │         │              │
└──────┬───────┘         └─────────────┘         └──────────────┘
       │                        │
       │         ┌──────────────┴──────────────┐
       ▼         ▼                             ▼
┌─────────┐ ┌─────────┐                  ┌──────────┐
│  Kafka  │ │ Driver  │                  │   Trip   │
│ (Events)│ │  State  │                  │   DB     │
└─────────┘ └─────────┘                  └──────────┘

MATCHING FLOW:
1. Rider requests ride
2. GEORADIUS query → nearby drivers
3. Filter available drivers
4. Send to best match (lock 15s)
5. Accept? Create trip : Try next
</pre>`,

                traps: [
                    {
                        question: "Driver on cell boundary?",
                        answer: "Query adjacent GeoHash cells (8 neighbors). Union results."
                    },
                    {
                        question: "Surge pricing calculation?",
                        answer: "Pre-compute per grid cell. demand/supply ratio per 5-min window."
                    },
                    {
                        question: "ETA calculation?",
                        answer: "Google Maps API or internal routing. Cache common routes."
                    }
                ],

                metrics: { time: "60 min interview", space: "Redis: ~10GB for 5M drivers" },

                codeTitle: "GeoHash Nearby Query (Python)",
                code: `import redis
r = redis.Redis()

def update_driver_location(driver_id, lat, lng):
    """Update driver location with 30s TTL"""
    r.geoadd("drivers", (lng, lat, driver_id))
    r.setex(f"driver:{driver_id}:active", 30, "1")

def find_nearby_drivers(lat, lng, radius_km=5):
    """Find drivers within radius"""
    # Get all drivers in radius
    nearby = r.georadius(
        "drivers", lng, lat, radius_km, unit="km",
        withdist=True, sort="ASC"
    )
    
    # Filter only active drivers
    available = []
    for driver_id, distance in nearby:
        if r.exists(f"driver:{driver_id}:available"):
            available.append({
                "driver_id": driver_id,
                "distance_km": distance
            })
    
    return available[:10]  # Top 10 closest

def lock_driver_for_matching(driver_id, ride_id, ttl=15):
    """Lock driver during matching (15s timeout)"""
    lock_key = f"driver:{driver_id}:lock"
    if r.setnx(lock_key, ride_id):
        r.expire(lock_key, ttl)
        return True
    return False  # Already locked`
            }
        },
        {
            id: "notification-system",
            title: "Design Notification System",
            difficulty: "Hard",
            priority: "🔴",
            tags: ["Real-Time", "Push", "Multi-Channel"],

            scaleEstimates: {
                notificationsPerDay: "10 Billion",
                peakQPS: "1 Million/sec (Black Friday)",
                channels: "Push, SMS, Email, In-App",
                latency: "< 2 sec for real-time, minutes OK for batch",
                note: "Multi-channel with priority. Don't spam users!"
            },

            quiz: {
                description: "How to ensure user doesn't receive duplicate notifications?",
                options: [
                    "Check DB before every send",
                    "Rate limit per user per channel",
                    "Idempotency key + Deduplication service",
                    "Send all and let user filter"
                ],
                correct: 2,
                explanation: "Idempotency key! Each notification has unique ID. Dedupe service checks if already sent in last X hours. Prevents spam from retries and duplicate events."
            },

            learn: {
                decisions: [
                    {
                        question: "Sync vs Async notification?",
                        answer: "ASYNC always! Queue everything.",
                        why: "Sync = caller waits for SMS/email delivery. Async = instant response, background processing."
                    },
                    {
                        question: "Push, Pull, or Hybrid?",
                        answer: "Push for real-time, Pull for batch",
                        why: "Real-time (messages): WebSocket push. Batch (marketing): user pulls on app open."
                    },
                    {
                        question: "Priority handling?",
                        answer: "Multiple queues by priority",
                        why: "High (OTP, payments) → immediate. Medium (likes) → batch. Low (marketing) → daily digest."
                    }
                ],

                components: [
                    {
                        name: "Multi-Channel Router",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Notification Request → Router

Router Logic:
1. Check user preferences (opt-out?)
2. Check rate limits (max 5/hour?)
3. Select channels based on priority:
   - CRITICAL → All channels (Push + SMS + Email)
   - HIGH → Push + In-App
   - MEDIUM → In-App only
   - LOW → Daily digest

4. Route to channel-specific workers
</pre>`,
                        trap: "Respect user preferences! Check opt-out, quiet hours, and rate limits."
                    },
                    {
                        name: "Rate Limiting & Deduplication",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Rate Limiting (Redis):
  Key: rate_limit:{user_id}:{channel}
  INCR + EXPIRE (1 hour TTL)
  if count > 10: skip notification

Deduplication:
  Key: notif:{idempotency_key}
  SETNX with 24h TTL
  if exists: skip (already sent)

Template Aggregation:
  "John and 5 others liked your post"
  → Aggregate similar notifications
</pre>`,
                        trap: "Don't send 100 'X liked your post' - aggregate into batches!"
                    },
                    {
                        name: "Channel Workers",
                        solution: `<table style="width:100%; border-collapse:collapse; font-size:0.9rem;">
<tr><th style="border:1px solid #eee; padding:8px;">Channel</th><th style="border:1px solid #eee; padding:8px;">Provider</th><th style="border:1px solid #eee; padding:8px;">Latency</th></tr>
<tr><td style="border:1px solid #eee; padding:8px;">Push (iOS)</td><td style="border:1px solid #eee; padding:8px;">APNs</td><td style="border:1px solid #eee; padding:8px;">< 1 sec</td></tr>
<tr><td style="border:1px solid #eee; padding:8px;">Push (Android)</td><td style="border:1px solid #eee; padding:8px;">FCM</td><td style="border:1px solid #eee; padding:8px;">< 1 sec</td></tr>
<tr><td style="border:1px solid #eee; padding:8px;">SMS</td><td style="border:1px solid #eee; padding:8px;">Twilio</td><td style="border:1px solid #eee; padding:8px;">1-5 sec</td></tr>
<tr><td style="border:1px solid #eee; padding:8px;">Email</td><td style="border:1px solid #eee; padding:8px;">SendGrid</td><td style="border:1px solid #eee; padding:8px;">seconds to minutes</td></tr>
<tr><td style="border:1px solid #eee; padding:8px;">In-App</td><td style="border:1px solid #eee; padding:8px;">WebSocket</td><td style="border:1px solid #eee; padding:8px;">< 100ms</td></tr>
</table>`,
                        trap: "Each channel has different failure modes. Implement circuit breakers!"
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                    NOTIFICATION SYSTEM ARCHITECTURE                  │
└─────────────────────────────────────────────────────────────────────┘

[Services: Order, Payment, Social, etc.]
              │
              │ Notification Event
              ▼
     ┌─────────────────┐
     │  API Gateway    │
     │ (Rate Limit)    │
     └────────┬────────┘
              │
              ▼
     ┌─────────────────┐     ┌──────────────┐
     │   Notification  │────►│   Dedup      │
     │    Service      │     │   (Redis)    │
     └────────┬────────┘     └──────────────┘
              │
              ▼
     ┌─────────────────┐
     │  Message Queue  │ (Kafka - partitioned by priority)
     │  HIGH | MED | LOW│
     └───┬─────┬─────┬──┘
         │     │     │
    ┌────▼───┐ ▼  ┌──▼──────┐
    │ Push   │ │  │ Email   │
    │ Worker │ │  │ Worker  │
    └────┬───┘ │  └────┬────┘
         │     │       │
    ┌────▼───┐ │  ┌────▼────┐
    │ APNs   │ │  │SendGrid │
    │ FCM    │ │  └─────────┘
    └────────┘ │
         ┌─────▼─────┐
         │SMS Worker │
         │ (Twilio)  │
         └───────────┘
</pre>`,

                traps: [
                    {
                        question: "What if push provider is down?",
                        answer: "Circuit breaker pattern. Fallback to other channels. Retry with exponential backoff."
                    },
                    {
                        question: "User has multiple devices?",
                        answer: "Send to ALL registered device tokens. Track per device."
                    },
                    {
                        question: "Analytics on notification opens?",
                        answer: "Deep link with tracking ID. Async log to analytics service."
                    }
                ],

                metrics: { time: "45 min interview", space: "Kafka + Redis + Channel APIs" },

                codeTitle: "Notification Service (Python)",
                code: `import redis
from enum import Enum
from typing import List, Dict

r = redis.Redis()

class Priority(Enum):
    CRITICAL = 1  # OTP, security alerts
    HIGH = 2      # Messages, mentions
    MEDIUM = 3    # Likes, follows
    LOW = 4       # Marketing, digests

class Channel(Enum):
    PUSH = "push"
    SMS = "sms"
    EMAIL = "email"
    IN_APP = "in_app"

def send_notification(
    user_id: str,
    notification_id: str,  # Idempotency key
    title: str,
    body: str,
    priority: Priority,
    channels: List[Channel] = None
):
    # 1. Deduplication check
    dedupe_key = f"notif_sent:{notification_id}"
    if not r.set(dedupe_key, "1", nx=True, ex=86400):
        return {"status": "duplicate", "skipped": True}
    
    # 2. Check user preferences
    preferences = get_user_preferences(user_id)
    if preferences.get("do_not_disturb"):
        return {"status": "dnd_active", "queued": True}
    
    # 3. Rate limit check
    rate_key = f"rate:{user_id}:{priority.name}"
    count = r.incr(rate_key)
    r.expire(rate_key, 3600)  # 1 hour window
    
    limits = {Priority.CRITICAL: 100, Priority.HIGH: 20, 
              Priority.MEDIUM: 10, Priority.LOW: 3}
    if count > limits[priority]:
        return {"status": "rate_limited"}
    
    # 4. Select channels based on priority
    if channels is None:
        channels = get_channels_for_priority(priority)
    
    # 5. Queue to workers
    for channel in channels:
        queue_notification(user_id, channel, {
            "notification_id": notification_id,
            "title": title,
            "body": body,
            "priority": priority.value
        })
    
    return {"status": "queued", "channels": [c.value for c in channels]}

def get_channels_for_priority(priority: Priority) -> List[Channel]:
    if priority == Priority.CRITICAL:
        return [Channel.PUSH, Channel.SMS, Channel.EMAIL]
    elif priority == Priority.HIGH:
        return [Channel.PUSH, Channel.IN_APP]
    elif priority == Priority.MEDIUM:
        return [Channel.IN_APP]
    else:
        return []  # Daily digest, don't push`
            }
        }
    ]
};
