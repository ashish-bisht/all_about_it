#!/bin/bash
# File Watcher for data.js auto-rebuild
# Run this in background: ./watch_data.sh &

echo "👀 Watching data/ folder for changes..."
echo "📦 Will auto-rebuild data.js on any change"
echo "🛑 Press Ctrl+C to stop"
echo ""

# Check if fswatch is installed
if ! command -v fswatch &> /dev/null; then
    echo "❌ fswatch not found. Installing via Homebrew..."
    brew install fswatch
fi

# Watch the data folder and rebuild on changes
fswatch -o data/ | while read; do
    echo ""
    echo "🔄 Change detected! Rebuilding data.js..."
    python3 build_data.py
    echo "✅ Done! $(date '+%H:%M:%S')"
done
