// System Design - Multi-Step Processes
// Payment System, Google Docs

const topic_systemdesign_multi_step_processes = {
    id: "systemdesign_multi_step_processes",
    title: "System Design: Multi-Step Processes",
    description: "Principal Engineer • Multi-Step Transactions",
    color: "#e17055",
    icon: "fas fa-exchange-alt",
    mentalModel: {
        whenToApply: [
            { label: "💳 Payment/Transfer", desc: "Money movement? → Saga Pattern + Idempotency + Double Entry" },
            { label: "📝 Collaborative Edit", desc: "Real-time multi-user? → OT/CRDT + Operation Log" },
            { label: "🔄 Distributed Transaction", desc: "Multi-service update? → Saga (Choreography/Orchestration)" },
            { label: "↩️ Rollback Needed", desc: "Failure mid-flow? → Compensating transactions" },
            { label: "🔁 Retry Safety", desc: "Network failures? → Idempotency keys everywhere" }
        ],
        patterns: [
            { algo: "Saga Pattern", use: "Distributed transactions", time: "O(steps)", space: "O(log)", template: "T1→T2→T3 or C3→C2→C1 (compensate)" },
            { algo: "2PC (Two-Phase)", use: "Strong consistency", time: "O(1)", space: "O(participants)", template: "Prepare→Vote→Commit/Rollback" },
            { algo: "Idempotency Key", use: "Safe retries", time: "O(1)", space: "O(keys)", template: "Same key = same result (dedupe)" },
            { algo: "OT (Operational Transform)", use: "Conflict resolution", time: "O(ops²)", space: "O(history)", template: "Transform concurrent ops" },
            { algo: "CRDT", use: "Eventual consistency", time: "O(1)", space: "O(state)", template: "Merge without coordination" },
            { algo: "Double Entry", use: "Financial accuracy", time: "O(1)", space: "O(accounts)", template: "Debit A = Credit B (balanced)" }
        ],
        safetyCheck: [
            { label: "⚠️ At-Least-Once", desc: "Network can duplicate. Every handler MUST be idempotent!" },
            { label: "💰 Money = Append-Only", desc: "Never update balances. Log transactions, compute balance." },
            { label: "🔒 PCI Compliance", desc: "Never store raw card numbers. Tokenize via Stripe/Adyen." },
            { label: "📝 Audit Trail", desc: "Every state change logged. Who, what, when - immutable." }
        ]
    },
    questions: [
        {
            id: "payment-system",
            title: "Design Payment System",
            difficulty: "Hard",
            priority: "🔴",
            tags: ["Flows", "Financial", "Saga"],

            scaleEstimates: {
                transactionsPerDay: "100 Million",
                peakTPS: "10,000 transactions/sec",
                failureRate: "0.1% (retry required)",
                consistency: "MUST be exactly-once!",
                note: "Money can't disappear or duplicate. Audit everything."
            },

            quiz: {
                description: "User retries failed payment. How to prevent double charge?",
                options: [
                    "Check if already charged in DB",
                    "Use idempotency key (same key = same result)",
                    "Timeout lock on user account",
                    "Random UUID per request"
                ],
                correct: 1,
                explanation: "Idempotency Key! Client generates unique key per payment intent. Server stores key→result. Retry with same key = return cached result, no duplicate charge."
            },

            learn: {
                decisions: [
                    {
                        question: "2PC vs Saga for payment flow?",
                        answer: "Saga! (2PC blocks too long)",
                        why: "Payment gateways take seconds. 2PC = lock everything. Saga = async, compensate on failure."
                    },
                    {
                        question: "Store balance or calculate?",
                        answer: "Calculate from transaction log",
                        why: "Append-only ledger. Balance = SUM(credits) - SUM(debits). Immutable audit trail."
                    },
                    {
                        question: "What if external payment fails?",
                        answer: "Compensating transaction (refund)",
                        why: "Can't rollback external systems. Issue refund as new transaction."
                    }
                ],

                components: [
                    {
                        name: "Double Entry Ledger",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Every transaction = TWO entries:

User pays $100:
  DEBIT  user_wallet    $100
  CREDIT merchant_wallet $100

Refund:
  DEBIT  merchant_wallet $100
  CREDIT user_wallet     $100

Rules:
- SUM(debits) == SUM(credits) (always balanced)
- Entries are IMMUTABLE (append-only)
- Balance = SUM(credits) - SUM(debits)
</pre>`,
                        trap: "Never UPDATE balance! Only INSERT transactions. Updates lose audit trail."
                    },
                    {
                        name: "Saga: Payment Flow",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Happy Path (all succeed):
T1: Reserve inventory → 
T2: Charge card (Stripe) → 
T3: Record transaction →
T4: Notify (email/SMS)

Failure at T3:
C2: Refund card (compensate)
C1: Release inventory (compensate)

Each step has:
- Transaction (do)
- Compensation (undo)
</pre>`,
                        trap: "Compensation must be idempotent too! Might run multiple times."
                    },
                    {
                        name: "Idempotency Implementation",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Client:
  idempotency_key = UUID per payment intent
  (Same key on retry)

Server:
  1. Check: SELECT * FROM idempotency 
            WHERE key = ? AND status != 'PROCESSING'
  2. If found: return cached_result
  3. If not: INSERT key with status='PROCESSING'
  4. Process payment
  5. UPDATE status='DONE', cached_result=...
  
Key TTL: 24-48 hours (cleanup old keys)
</pre>`,
                        trap: "Race condition on check! Use INSERT...ON CONFLICT or Redis SETNX."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                     PAYMENT SYSTEM ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────────────┘

[User App] ──► [API Gateway] ──► [Payment Service]
     │               │                   │
     │ Idempotency   │           ┌───────┴───────┐
     │ Key           │           ▼               ▼
     │               │    ┌──────────┐    ┌──────────┐
     │               │    │ Idempotency│    │  Saga    │
     │               │    │ Store     │    │Orchestrator│
     │               │    │ (Redis)   │    └────┬─────┘
     │               │    └──────────┘         │
     │               │                         │
     │               │    ┌────────────────────┼────────────────────┐
     │               │    ▼                    ▼                    ▼
     │               │ ┌──────┐          ┌──────────┐         ┌───────┐
     │               │ │Wallet │          │ Stripe   │         │Ledger │
     │               │ │Service│          │ Gateway  │         │(Append)│
     │               │ └──────┘          └──────────┘         └───────┘

SAGA FLOW:
[Reserve] ──✓──► [Charge Card] ──✓──► [Record] ──✓──► [Notify] ✅

SAGA COMPENSATE (on failure):
[Release] ◄──── [Refund Card] ◄──── [Mark Failed] ❌
</pre>`,

                traps: [
                    {
                        question: "Stripe webhook arrives twice?",
                        answer: "Idempotent handler. Check if already processed by payment_intent_id."
                    },
                    {
                        question: "User sees 'pending' forever?",
                        answer: "Timeout + async reconciliation job. Mark stale transactions as failed."
                    },
                    {
                        question: "How to handle partial refunds?",
                        answer: "New ledger entry: DEBIT merchant, CREDIT user (partial amount)."
                    }
                ],

                metrics: { time: "60 min interview", space: "PostgreSQL + Redis + Payment Gateway" },

                codeTitle: "Idempotent Payment Handler",
                code: `import redis
from uuid import uuid4

r = redis.Redis()

def process_payment(idempotency_key, amount, user_id, merchant_id):
    """Process payment with idempotency"""
    
    cache_key = f"idempotency:{idempotency_key}"
    
    # Check if already processed
    cached = r.get(cache_key)
    if cached:
        return {"status": "duplicate", "result": cached}
    
    # Acquire processing lock (prevent concurrent processing)
    lock_acquired = r.set(cache_key, "PROCESSING", nx=True, ex=300)
    if not lock_acquired:
        return {"status": "in_progress", "message": "Try again shortly"}
    
    try:
        # 1. Reserve balance (local DB)
        if not reserve_balance(user_id, amount):
            raise Exception("Insufficient balance")
        
        # 2. Charge via Stripe
        stripe_result = stripe.charge(amount, user_id)
        if not stripe_result.success:
            release_balance(user_id, amount)  # Compensate
            raise Exception("Card declined")
        
        # 3. Record in ledger (double entry)
        record_transaction(
            debit_account=f"user:{user_id}",
            credit_account=f"merchant:{merchant_id}",
            amount=amount,
            stripe_id=stripe_result.id
        )
        
        # 4. Cache successful result
        result = {"status": "success", "transaction_id": stripe_result.id}
        r.set(cache_key, str(result), ex=86400)  # 24h TTL
        
        return result
        
    except Exception as e:
        r.set(cache_key, f"FAILED:{str(e)}", ex=3600)
        raise`
            }
        },
        {
            id: "google-docs",
            title: "Design Google Docs",
            difficulty: "Hard",
            priority: "🟡",
            tags: ["Flows", "Collaboration", "CRDT"],

            scaleEstimates: {
                dau: "1 Billion users",
                concurrentEditors: "Up to 100 per doc",
                editsPerSecond: "1000s per popular doc",
                latency: "<100ms local, <500ms sync",
                note: "Conflicts happen constantly - must resolve seamlessly!"
            },

            quiz: {
                description: "Two users type at same position simultaneously. How to resolve?",
                options: [
                    "Last write wins (overwrite)",
                    "Lock the document",
                    "Operational Transformation (OT)",
                    "Reject second user's edit"
                ],
                correct: 2,
                explanation: "Operational Transformation! Transform concurrent operations so both apply correctly. Result is same regardless of order received."
            },

            learn: {
                decisions: [
                    {
                        question: "OT vs CRDT?",
                        answer: "Google Docs uses OT, newer tools use CRDT",
                        why: "OT = central server, simpler. CRDT = peer-to-peer, works offline. Both valid."
                    },
                    {
                        question: "When to persist to DB?",
                        answer: "Batch every 30 seconds + major events",
                        why: "Save every keystroke = too expensive. Batch changes, save periodically."
                    },
                    {
                        question: "How to show cursor positions?",
                        answer: "Broadcast via WebSocket, store ephemerally",
                        why: "Cursors are transient. Redis with TTL, not persistent storage."
                    }
                ],

                components: [
                    {
                        name: "Operational Transformation (OT)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Example: Doc = "Hello"

User A: Insert "X" at position 1 → "HXello"
User B: Insert "Y" at position 3 → "HelYlo"

Both arrive at server:
- A's op: INSERT(1, "X")
- B's op: INSERT(3, "Y")

Transform B's op relative to A:
- A inserted at 1, so positions >= 1 shift by 1
- B's position 3 becomes 4
- Transformed: INSERT(4, "Y")

Apply both:
"Hello" → "HXello" → "HXelYlo"
</pre>`,
                        trap: "OT is complex! Consider using existing library (ShareDB, Yjs)."
                    },
                    {
                        name: "CRDT Alternative (Yjs)",
                        solution: `<ul>
<li><strong>CRDT:</strong> Conflict-free Replicated Data Type</li>
<li><strong>No central server needed</strong> - peers sync directly</li>
<li><strong>Each character has unique ID</strong> - position is relative to neighbors</li>
<li><strong>Merge:</strong> Union of all operations - always converges</li>
</ul>
<pre style="background:#2d3436; color:#dfe6e9; padding:10px; border-radius:8px; font-size:0.85rem;">
# Yjs example
import Y from 'yjs';
const doc = new Y.Doc();
const text = doc.getText('content');
text.insert(0, 'Hello');  // ID: user1:0
// Syncs to all peers automatically
</pre>`,
                        trap: "CRDT memory grows with history. Need garbage collection for long docs."
                    },
                    {
                        name: "Document Version & History",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Versioning Options:

1. Snapshot versioning:
   - Save full doc every 100 ops
   - Version history = list of snapshots

2. Operation log:
   - Store every operation
   - Reconstruct any point in time
   - Expensive for long docs

3. Hybrid (Google Docs):
   - Recent: operation log
   - Old: snapshots only (discard ops)
</pre>`,
                        trap: "Infinite undo = infinite storage. Keep ops for X days, then snapshot."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                     GOOGLE DOCS ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────┘

  [User A]        [User B]        [User C]
      │               │               │
      │ Local Edit    │               │
      ▼               ▼               ▼
  [Local OT     [Local OT      [Local OT
   Engine]       Engine]        Engine]
      │               │               │
      └───────────────┼───────────────┘
                      │ WebSocket
                      ▼
              ┌──────────────┐
              │  Collab Svc  │ (OT Server)
              │  - Transform │
              │  - Broadcast │
              └──────┬───────┘
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Presence │  │ Op Log   │  │ Doc Store│
│ (Redis)  │  │ (Kafka)  │  │ (Spanner)│
│ Cursors  │  │ History  │  │ Snapshots│
└──────────┘  └──────────┘  └──────────┘

SYNC FLOW:
1. User types → Local apply (instant)
2. Send op to server
3. Server transforms vs concurrent ops
4. Broadcast transformed op to all clients
5. Persist to op log
6. Batch save snapshots every 30s
</pre>`,

                traps: [
                    {
                        question: "What about formatting (bold, italic)?",
                        answer: "Rich text = nested ops. Libraries like Quill/ProseMirror handle this."
                    },
                    {
                        question: "Offline editing?",
                        answer: "Queue ops locally. Sync when online. CRDT handles merges better than OT for offline."
                    },
                    {
                        question: "100 users = 100 cursors?",
                        answer: "Show only nearby cursors. Throttle position updates (every 200ms)."
                    }
                ],

                metrics: { time: "60 min interview", space: "Spanner/DynamoDB + Redis + Kafka" },

                codeTitle: "Basic OT Transform",
                code: `class Operation:
    INSERT = 'insert'
    DELETE = 'delete'

def transform(op1, op2):
    """
    Transform op1 against op2.
    Returns new op1 that achieves same effect after op2 applied.
    """
    if op1['type'] == Operation.INSERT and op2['type'] == Operation.INSERT:
        if op1['position'] <= op2['position']:
            return op1  # op1 is before, no change
        else:
            # op2 inserted before op1, shift position
            return {**op1, 'position': op1['position'] + len(op2['char'])}
    
    elif op1['type'] == Operation.INSERT and op2['type'] == Operation.DELETE:
        if op1['position'] <= op2['position']:
            return op1
        else:
            return {**op1, 'position': op1['position'] - 1}
    
    elif op1['type'] == Operation.DELETE and op2['type'] == Operation.INSERT:
        if op1['position'] < op2['position']:
            return op1
        else:
            return {**op1, 'position': op1['position'] + len(op2['char'])}
    
    elif op1['type'] == Operation.DELETE and op2['type'] == Operation.DELETE:
        if op1['position'] < op2['position']:
            return op1
        elif op1['position'] > op2['position']:
            return {**op1, 'position': op1['position'] - 1}
        else:
            return None  # Same char deleted, op1 is no-op

# Example:
# op1 = {'type': 'insert', 'position': 5, 'char': 'X'}
# op2 = {'type': 'insert', 'position': 2, 'char': 'Y'}
# transform(op1, op2) → {'type': 'insert', 'position': 6, 'char': 'X'}`
            }
        }
    ]
};
