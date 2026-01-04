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

  # Create JSON payload using jq for proper escaping
  RESPONSE=$(jq -n \
    --arg prompt "$PROMPT" \
    '{
      model: "gemma3:latest",
      prompt: ("You are an English language tutor. The user wrote the following message (it could be in English, Korean, or mixed). Provide concise feedback on how to express this more naturally in English:\n\n" + $prompt + "\n\nProvide:\n1. Grammar corrections (if any)\n2. More natural/professional alternative expressions\n3. Brief explanation (keep it concise)"),
      stream: false
    }' | curl -s http://localhost:11434/api/generate -d @- 2>/dev/null)

  # Extract feedback response
  FEEDBACK=$(echo "$RESPONSE" | jq -r '.response // "Error: No response from Ollama"')

  # Append to today's log file
  {
    echo "## $(date +%H:%M:%S) - Original Prompt"
    echo ""
    echo '```'
    echo "$PROMPT"
    echo '```'
    echo ""
    echo "### Feedback"
    echo ""
    echo "$FEEDBACK"
    echo ""
    echo "---"
    echo ""
  } >> "$LOG_FILE"

) &

# Exit immediately without blocking the main session
exit 0
