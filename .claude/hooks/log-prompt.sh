#!/bin/bash
# Claude Code Prompt Logger
# Logs user prompts to daily markdown files for later review

set -e

# Read JSON input from stdin
input=$(cat)

# Extract the prompt using jq
prompt=$(echo "$input" | jq -r '.prompt // empty')

# Exit if no prompt
if [ -z "$prompt" ]; then
    exit 0
fi

# Use CLAUDE_PROJECT_DIR if available, otherwise use current working directory from input
if [ -n "$CLAUDE_PROJECT_DIR" ]; then
    project_dir="$CLAUDE_PROJECT_DIR"
else
    project_dir=$(echo "$input" | jq -r '.cwd // empty')
fi

# Define log directory
log_dir="$project_dir/.claude/prompts"

# Create directory if it doesn't exist
mkdir -p "$log_dir"

# Get current date and time
date_file=$(date '+%Y-%m-%d')
time_stamp=$(date '+%H:%M')

# Log file path
log_file="$log_dir/$date_file.md"

# Process the prompt:
# 1. Replace newlines with spaces (for multiline prompts)
# 2. Collapse multiple spaces into one
# 3. Trim leading/trailing whitespace
processed_prompt=$(echo "$prompt" | tr '\n' ' ' | tr -s ' ' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

# Truncate if longer than 500 characters
max_length=500
if [ ${#processed_prompt} -gt $max_length ]; then
    processed_prompt="${processed_prompt:0:$max_length}..."
fi

# Create file with date header if it doesn't exist
if [ ! -f "$log_file" ]; then
    echo "# $date_file" > "$log_file"
    echo "" >> "$log_file"
fi

# Append the prompt entry
echo "- [$time_stamp] $processed_prompt" >> "$log_file"

# Exit successfully to allow the prompt to proceed
exit 0
