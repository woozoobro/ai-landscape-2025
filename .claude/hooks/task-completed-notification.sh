#!/bin/bash
# Hook: Task Completed Notification
# Event: Stop
# Description: Shows a macOS notification when Claude Code stops/completes a task

osascript -e 'display notification "Task completed" with title "Claude Code" sound name "Glass"'
