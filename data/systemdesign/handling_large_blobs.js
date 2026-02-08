// System Design - Handling Large Blobs
// Dropbox, YouTube

const topic_systemdesign_handling_large_blobs = {
    id: "systemdesign_handling_large_blobs",
    title: "System Design: Handling Large Blobs",
    description: "Principal Engineer • Large Files & Streaming",
    color: "#6c5ce7",
    icon: "fas fa-database",
    mentalModel: {
        whenToApply: [
            { label: "📁 File Sync", desc: "Sync across devices? → Chunking + Merkle Trees + Dedup" },
            { label: "🎬 Video Streaming", desc: "Serve video? → CDN + Adaptive Bitrate + Encoding Pipeline" },
            { label: "📤 Large Uploads", desc: "Files > 100MB? → Chunked upload + Resume support" },
            { label: "🗂️ Object Storage", desc: "Billions of files? → S3/GCS + Metadata DB" },
            { label: "🔄 Conflict Resolution", desc: "Offline edits? → Version vectors + Last-write-wins" }
        ],
        patterns: [
            { algo: "File Chunking", use: "Large file handling", time: "O(N)", space: "O(1)", template: "Split into 4MB chunks, hash each" },
            { algo: "Content-Addressed", use: "Deduplication", time: "O(1)", space: "O(unique)", template: "Hash as key: if exists, skip upload" },
            { algo: "Merkle Tree", use: "Diff detection", time: "O(log N)", space: "O(N)", template: "Hash tree: changed node = changed subtree" },
            { algo: "Adaptive Bitrate", use: "Video quality", time: "O(1)", space: "O(versions)", template: "Multiple qualities, switch on bandwidth" },
            { algo: "CDN Edge Cache", use: "Global delivery", time: "O(1) local", space: "Distributed", template: "Cache at edge, origin fallback" }
        ],
        safetyCheck: [
            { label: "⚠️ Upload Resume", desc: "Large upload fails at 90%? Allow resume from last chunk!" },
            { label: "🔐 Pre-signed URLs", desc: "Don't proxy blobs through app servers. Direct S3 upload." },
            { label: "📊 Metadata vs Blob", desc: "Store metadata in DB, blobs in object storage. Never mix." },
            { label: "🌍 CDN Cache Keys", desc: "Include file version in URL to invalidate cache on update" }
        ]
    },
    questions: [
        {
            id: "dropbox",
            title: "Design Dropbox",
            difficulty: "Hard",
            priority: "🔴",
            tags: ["Storage", "Sync", "Deduplication"],

            scaleEstimates: {
                users: "700 Million",
                filesStored: "1 Trillion files",
                dailySyncs: "1 Billion sync operations",
                storage: "Exabytes (EB) total",
                note: "Most files never accessed after upload - cold storage!"
            },

            quiz: {
                description: "How to detect file changes across 100,000 files efficiently?",
                options: [
                    "Compare file content byte-by-byte",
                    "Check modification timestamps",
                    "Use Merkle Tree with content hashes",
                    "Sync everything on every change"
                ],
                correct: 2,
                explanation: "Merkle Tree! Hash each file, build tree. Compare root hash - if different, traverse to find changed files. O(log N) not O(N)!"
            },

            learn: {
                decisions: [
                    {
                        question: "Why chunk files?",
                        answer: "Dedup, resume, parallel upload",
                        why: "Same chunk across users = store once! Upload fails = resume from last chunk. Multiple chunks = parallel upload."
                    },
                    {
                        question: "Chunk size?",
                        answer: "4MB typical",
                        why: "Smaller = more overhead. Larger = slower dedup. 4MB is sweet spot."
                    },
                    {
                        question: "Client vs Server sync?",
                        answer: "Client-initiated, server-validated",
                        why: "Client detects changes, computes chunks, uploads. Server validates and stores."
                    }
                ],

                components: [
                    {
                        name: "File Chunking & Deduplication",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Upload Flow:
1. Split file into 4MB chunks
2. SHA256 hash each chunk
3. Send chunk hashes to server
4. Server: "I need chunks [2, 5]" (others exist)
5. Upload only missing chunks
6. Server stores metadata: file → [chunk_hashes]

Dedup Rate: 50%+ for enterprise (many copies of same docs)
</pre>`,
                        trap: "Use content-defined chunking (CDC) not fixed size - file insert doesn't shift all hashes!"
                    },
                    {
                        name: "Sync Protocol (Delta Sync)",
                        solution: `<ul>
<li><strong>Client Database:</strong> SQLite tracks local file state</li>
<li><strong>Server Journal:</strong> Ordered list of changes</li>
<li><strong>Sync:</strong> Client pulls changes since last cursor</li>
</ul>
<pre style="background:#2d3436; color:#dfe6e9; padding:10px; border-radius:8px; font-size:0.85rem;">
GET /delta?cursor=1234567
Response: {
  changes: [{path: "/a.txt", action: "modified"},
            {path: "/b.txt", action: "deleted"}],
  cursor: 1234890
}
</pre>`,
                        trap: "Long polling or WebSocket for real-time. Polling = battery drain on mobile!"
                    },
                    {
                        name: "Conflict Resolution",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Conflict Detection:
- Client sends: base_version + new_content
- Server checks: current_version == base_version?
- If not: CONFLICT!

Resolution:
1. Last-write-wins (simple, data loss)
2. Keep both: "file.txt" + "file (conflict).txt"
3. Merge (for text/code - complex)

Dropbox uses: Keep both copies, let user resolve
</pre>`,
                        trap: "Offline edits are tricky! User might edit same file on 3 devices. Timestamp alone isn't enough."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                        DROPBOX ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────┘

  [Desktop Client]
      │ Local SQLite (file state)
      │
      ├──► Detect Changes (Merkle Tree)
      │
      ├──► Chunk File (4MB blocks)
      │
      ├──► Hash Chunks (SHA256)
      │
      ▼
┌──────────────┐                    ┌──────────────┐
│  Block Svc   │ ──── Upload ─────► │     S3       │
│ (Dedup check)│    (Missing only)  │ (Blob Store) │
└──────┬───────┘                    └──────────────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐
│ Metadata Svc │────►│  PostgreSQL  │
│ (File→Chunks)│     │ (File tree)  │
└──────┬───────┘     └──────────────┘
       │
       ▼
┌──────────────┐
│ Notification │ ───► Other Devices (Long Poll/WS)
│    Service   │
└──────────────┘
</pre>`,

                traps: [
                    {
                        question: "How to handle file rename (100GB file)?",
                        answer: "Just update metadata! Chunks don't move. Rename is O(1)."
                    },
                    {
                        question: "Customer deletes file by accident?",
                        answer: "Soft delete with 30-day recovery. Versioning for file history."
                    },
                    {
                        question: "Sharing a folder with 10M users?",
                        answer: "Copy-on-write. Shared = pointer. Edit = create user's copy."
                    }
                ],

                metrics: { time: "60 min interview", space: "S3 + PostgreSQL + Local SQLite" },

                codeTitle: "File Chunking (Python)",
                code: `import hashlib

CHUNK_SIZE = 4 * 1024 * 1024  # 4MB

def chunk_file(file_path):
    """Split file into chunks and return hashes"""
    chunks = []
    
    with open(file_path, 'rb') as f:
        index = 0
        while True:
            data = f.read(CHUNK_SIZE)
            if not data:
                break
            
            chunk_hash = hashlib.sha256(data).hexdigest()
            chunks.append({
                'index': index,
                'hash': chunk_hash,
                'size': len(data),
                'data': data  # In practice, write to temp file
            })
            index += 1
    
    return chunks

def get_missing_chunks(local_chunks, server_chunks):
    """Compare with server, find what to upload"""
    server_hashes = set(server_chunks)
    missing = []
    
    for chunk in local_chunks:
        if chunk['hash'] not in server_hashes:
            missing.append(chunk)
    
    return missing

# Usage:
# chunks = chunk_file("large_video.mp4")
# missing = get_missing_chunks(chunks, server.get_existing_hashes())
# for chunk in missing:
#     upload_chunk(chunk)  # Upload only what's needed`
            }
        },
        {
            id: "youtube",
            title: "Design YouTube",
            difficulty: "Hard",
            priority: "🔴",
            tags: ["Storage", "Streaming", "CDN"],

            scaleEstimates: {
                dau: "2 Billion users",
                videosWatched: "1 Billion hours/day",
                uploadsPerDay: "500,000 videos",
                storagePerVideo: "~5GB (all qualities)",
                note: "Top 1% videos = 99% of views. HEAVY caching!"
            },

            quiz: {
                description: "How does YouTube adjust video quality based on network?",
                options: [
                    "User manually selects quality",
                    "Adaptive Bitrate Streaming (HLS/DASH)",
                    "Always serve lowest quality",
                    "Re-encode on every request"
                ],
                correct: 1,
                explanation: "Adaptive Bitrate (HLS/DASH)! Pre-encode multiple qualities (240p-4K). Client measures bandwidth, requests appropriate segments. Seamless quality switching."
            },

            learn: {
                decisions: [
                    {
                        question: "Encoding pipeline sync vs async?",
                        answer: "Async! DAG-based pipeline",
                        why: "Video upload → Queue → Encode 8 qualities in parallel → Store. User doesn't wait."
                    },
                    {
                        question: "Store all qualities?",
                        answer: "Yes! Encode once, serve forever",
                        why: "Pre-encode: 240p, 360p, 480p, 720p, 1080p, 4K. Storage cheap vs compute."
                    },
                    {
                        question: "Serve from origin or CDN?",
                        answer: "CDN for popular (99%), origin for long-tail",
                        why: "Top 1% videos in CDN edge cache. Rest fetched from origin on-demand."
                    }
                ],

                components: [
                    {
                        name: "Video Encoding Pipeline (DAG)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Upload → Queue → Workers (DAG):

[Original Video]
       │
       ├──► [Extract Audio]
       │          │
       │          ▼
       │    [Audio Encode] → AAC 128k
       │
       ├──► [Video 240p] ──► [Segment HLS]
       ├──► [Video 480p] ──► [Segment HLS]
       ├──► [Video 720p] ──► [Segment HLS]
       ├──► [Video 1080p] ─► [Segment HLS]
       └──► [Video 4K] ────► [Segment HLS]
                                   │
                                   ▼
                           [Upload to S3]
                                   │
                                   ▼
                           [Update Metadata]
                           "Video ready!"
</pre>`,
                        trap: "Failures in pipeline = partial encode. Use idempotent workers, checkpoint progress."
                    },
                    {
                        name: "Adaptive Bitrate (HLS/DASH)",
                        solution: `<pre style="background:#2d3436; color:#dfe6e9; padding:15px; border-radius:8px; font-size:0.85rem;">
Manifest File (m3u8):
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=800000
video_480p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2000000
video_720p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=5000000
video_1080p.m3u8

Player Flow:
1. Fetch manifest
2. Start with mid-quality
3. Measure download speed per segment
4. Upgrade/downgrade quality accordingly
</pre>`,
                        trap: "Segment duration matters! 2-4 seconds typical. Too short = overhead, too long = slow adaptation."
                    },
                    {
                        name: "CDN & Caching Strategy",
                        solution: `<ul>
<li><strong>Edge Caching:</strong> Popular videos cached globally</li>
<li><strong>Cache Key:</strong> video_id + quality + segment_number</li>
<li><strong>Eviction:</strong> LRU with TTL (24h for viral, 7d for trending)</li>
<li><strong>Origin Shield:</strong> Second-tier cache to reduce origin load</li>
</ul>`,
                        trap: "Cache by segment, not whole video! User might only watch first 30 seconds."
                    }
                ],

                diagram: `<pre style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:8px; font-size:0.75rem; line-height:1.3; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────┐
│                        YOUTUBE ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────┘

UPLOAD FLOW:
[Creator] ──► [Upload Service] ──► [S3 Raw] ──► [Encoding Queue]
                                                        │
                    ┌───────────────────────────────────┘
                    ▼
           [Encoding Workers] (DAG)
           │  │  │  │  │
           ▼  ▼  ▼  ▼  ▼
         [240p][480p][720p][1080p][4K]
                    │
                    ▼
           [S3 Processed Videos]
                    │
                    ▼
           [Metadata DB: "Video Ready"]

WATCH FLOW:
[Viewer] ──► [CDN Edge]
                │
          Cache Hit? ──► [Return Segment]
                │
                ▼ Miss
          [Origin Shield]
                │
          Cache Hit? ──► [Return + Cache at Edge]
                │
                ▼ Miss
          [S3 Origin] ──► [Return + Cache Both Tiers]
</pre>`,

                traps: [
                    {
                        question: "Live streaming vs VOD?",
                        answer: "Live = no CDN pre-cache. Push to edge on ingest. Higher complexity."
                    },
                    {
                        question: "Thumbnails at scale?",
                        answer: "Extract frames during encode. Store as sprite sheets for seek preview."
                    },
                    {
                        question: "Copyright detection?",
                        answer: "Content ID: fingerprint audio/video during encode. Match against database."
                    }
                ],

                metrics: { time: "60 min interview", space: "S3 + CDN + PostgreSQL" },

                codeTitle: "HLS Manifest Generator (Python)",
                code: `def generate_master_manifest(video_id, qualities):
    """Generate HLS master playlist"""
    lines = ["#EXTM3U", "#EXT-X-VERSION:3"]
    
    bandwidth_map = {
        "240p": 400000,
        "480p": 800000,
        "720p": 2000000,
        "1080p": 5000000,
        "4k": 15000000
    }
    
    for quality in qualities:
        bandwidth = bandwidth_map.get(quality, 800000)
        resolution = {
            "240p": "426x240",
            "480p": "854x480",
            "720p": "1280x720",
            "1080p": "1920x1080",
            "4k": "3840x2160"
        }.get(quality, "854x480")
        
        lines.append(
            f"#EXT-X-STREAM-INF:BANDWIDTH={bandwidth},"
            f"RESOLUTION={resolution}"
        )
        lines.append(f"/video/{video_id}/{quality}/playlist.m3u8")
    
    return "\\n".join(lines)

def generate_quality_manifest(video_id, quality, segments):
    """Generate HLS quality-specific playlist"""
    lines = [
        "#EXTM3U",
        "#EXT-X-VERSION:3",
        "#EXT-X-TARGETDURATION:4",
        "#EXT-X-MEDIA-SEQUENCE:0"
    ]
    
    for i, segment in enumerate(segments):
        lines.append(f"#EXTINF:{segment['duration']},")
        lines.append(f"/video/{video_id}/{quality}/segment_{i}.ts")
    
    lines.append("#EXT-X-ENDLIST")
    return "\\n".join(lines)`
            }
        }
    ]
};
