#!/bin/bash

# Binos Platform Development Launcher
# This script starts the development server and auto-relocates based on execution success

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_NAME="binos-dev-launcher.sh"
PROJECT_DIR="$SCRIPT_DIR/binos-platform-shell"
CLAUDE_SCRIPTS_DIR="$HOME/Claude Scripts"
COMPLETED_DIR="$CLAUDE_SCRIPTS_DIR/completed"
REUSABLE_DIR="$CLAUDE_SCRIPTS_DIR/reusable utility"

# Ensure Claude Scripts directories exist
mkdir -p "$CLAUDE_SCRIPTS_DIR" "$COMPLETED_DIR" "$REUSABLE_DIR"

# Check if project exists
if [ ! -d "$PROJECT_DIR" ]; then
 echo "❌ Error: Binos Platform project not found at $PROJECT_DIR"
 exit 1
fi

echo "🚀 Starting Binos Platform Development Server..."
echo "📁 Project: $PROJECT_DIR"

# Navigate to project
cd "$PROJECT_DIR" || exit 1

# Check if node_modules exists, install if missing
if [ ! -d "node_modules" ]; then
 echo "📦 Installing dependencies..."
 npm install
 if [ $? -ne 0 ]; then
 echo "❌ Failed to install dependencies"
 exit 1
 fi
fi

# Start the dev server
echo "🔧 Starting Vite development server..."
npm run dev

# If we get here, dev server exited cleanly
SCRIPT_PATH="$SCRIPT_DIR/$SCRIPT_NAME"

if [ -f "$SCRIPT_PATH" ]; then
 echo "📂 Moving script to reusable utility folder..."
 mv "$SCRIPT_PATH" "$REUSABLE_DIR/$SCRIPT_NAME"
 echo "✅ Script moved to: $REUSABLE_DIR/$SCRIPT_NAME"
fi

exit 0
