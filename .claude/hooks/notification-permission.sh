#!/bin/bash
# Hook: Permission Prompt Notification
# Event: Notification (permission_prompt)
# Description: Shows a macOS notification when Claude Code needs permission

osascript -e 'display notification "Permission needed" with title "Claude Code" sound name "Ping"'
