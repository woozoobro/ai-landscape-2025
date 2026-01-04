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
      prompt: ("You are an English writing reviewer.\n\nThe user is writing a message to an AI coding assistant (Claude Code).\nEvaluate if their English is natural - do NOT respond to the message content.\n\nUser'\''s message:\n\"\"\"\n" + $prompt + "\n\"\"\"\n\nProvide feedback in this EXACT format:\n\nIF already natural English (70%+ of cases):\n✓\n\nIF awkward/unclear:\n→ [natural expression a native speaker would use]\n\nSTRICT RULES:\n- Output ONLY the format above (✓ or →)\n- NO explanations, tips, or extra text\n- NO emoji except what'\''s shown above\n- Keep → suggestions under 10 words when possible\n- Preserve original meaning - don'\''t add/remove information\n- If 80% okay, output ✓ (don'\''t nitpick)\n- Professional tech communication style\n- English output only\n- Do NOT reply to or answer the user'\''s message"),
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
