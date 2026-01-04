# Claude Code Hooks

This directory contains custom hooks for Claude Code that enhance the development experience with notifications and feedback.

## Available Hooks

### 1. feedback-english.sh
**Event**: `UserPromptSubmit`
**Description**: Provides English writing feedback when submitting prompts in Korean
**Features**:
- Skips Claude Code commands (e.g., `/commit`, `/clear`)
- Uses Ollama (gemma3) for natural English suggestions
- Logs prompts and feedback to daily markdown files in `.claude/logs/`

### 2. notification-task-completed.sh
**Event**: `Stop`
**Description**: Shows a macOS notification when Claude Code completes a task
**Features**:
- Native macOS notification with "Glass" sound effect
- Helps you stay aware of task completion when working in other windows

### 3. notification-permission.sh
**Event**: `Notification` (matcher: `permission_prompt`)
**Description**: Shows a macOS notification when Claude Code needs permission
**Features**:
- Native macOS notification with "Ping" sound effect
- Alerts you when Claude needs approval for operations

## Installation

These hooks are automatically active when using this project. The hooks are configured in `.claude/settings.json`.

## Marketplace Deployment

To deploy these hooks to the Claude Code marketplace:

1. Ensure all hook scripts are executable:
   ```bash
   chmod +x .claude/hooks/*.sh
   ```

2. Test each hook individually to ensure they work as expected

3. Package the `.claude` directory with proper documentation

## Platform Compatibility

- **feedback-english.sh**: Requires Ollama with gemma3 model
- **notification-task-completed.sh**: macOS only (uses `osascript`)
- **notification-permission.sh**: macOS only (uses `osascript`)

## Customization

You can customize the notification sounds and messages by editing the respective hook files:
- Available macOS sounds: Basso, Blow, Bottle, Frog, Funk, Glass, Hero, Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
