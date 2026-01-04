#!/bin/bash

# English Feedback Hook for Claude Code
# Captures user prompts and sends them to Ollama (gemma3) for English feedback
# Feedback is saved to daily markdown files in .claude/logs/

set -e

# Read JSON input from stdin
INPUT=$(cat)

# Extract prompt using jq
PROMPT=$(echo "$INPUT" | jq -r '.prompt // empty')

# Exit if no prompt (shouldn't happen, but just in case)
if [ -z "$PROMPT" ]; then
  exit 0
fi

# Skip Claude Code commands (e.g., /commit, /clear, /compact)
if [[ "$PROMPT" == /* ]]; then
  exit 0
fi

# Get project directory
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"

# Get today's date for log file
TODAY=$(date +%Y-%m-%d)
LOG_FILE="${PROJECT_DIR}/.claude/logs/${TODAY}.md"

# Run Ollama API call in background to avoid blocking
(
  # Check if Ollama is running (fail silently if not)
  if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    exit 0
  fi

  # Write log header first
  {
    echo "## $(date +%H:%M)"
    echo ""
    echo "> $PROMPT"
    echo ""
  } >> "$LOG_FILE"

  # Get complete response at once
  RESPONSE=$(jq -n \
    --arg prompt "$PROMPT" \
    '{
      model: "gemma3:latest",
      prompt: ("You are an English language tutor.\n\nContext: The user writes prompts for AI coding assistants (like Claude Code).\nGoal: Help them express ideas more clearly and naturally in English.\n\nUser'\''s message (Korean/English/mixed):\n\"\"\"\n" + $prompt + "\n\"\"\"\n\nProvide CONCISE feedback:\n\nIF the message is already clear, natural English:\n✓ Already clear and well-expressed.\n\nIF it needs improvement:\n→ [Better, clearer English expression]\n\n💡 [One-line tip]\n\nFORMAT EXAMPLE:\n→ \"Your improved sentence here.\"\n\n💡 Keep it simple and direct.\n\nRULES:\n- Output in English only\n- ALWAYS add a blank line before 💡\n- Keep it under 3 lines total (including blank line)\n- NO extra questions or meta-commentary\n- Don'\''t force feedback if the message is already good"),
      stream: false
    }' | curl -s http://localhost:11434/api/generate -d @- 2>/dev/null | \
    jq -r '.response // empty')

  # Write response to log
  echo "$RESPONSE" >> "$LOG_FILE"

  # Write log footer
  {
    echo ""
    echo ""
    echo "---"
    echo ""
  } >> "$LOG_FILE"

) &

# Exit immediately without blocking the main session
exit 0
