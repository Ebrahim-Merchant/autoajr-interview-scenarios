# Scenario 3 — Notification System

## Client Report

> "We used Cursor to build the notification feature. It works most of the time, but we've had reports that notifications don't always show up properly, and our DevOps team flagged what looks like a memory leak — API calls keep growing over time. The AI wrote most of this and the code looks reasonable to us. Can you review it?"

## Known Bugs (Interviewer Reference — Do Not Share)

| # | Bug | Severity |
|---|---|---|
| 1 | `setInterval` return value never stored — interval never cleared → memory leak + duplicate polls on every `userId` change | Critical |
| 2 | No `AbortController` — stale fetch can overwrite newer data when `userId` changes quickly | High |
| 3 | No `.catch` on initial fetch — `loading` never set to `false` on error, spinner hangs forever | High |
| 4 | `markAsRead` optimistically updates UI but doesn't roll back if server POST fails | Medium |
| 5 | API response shape trusted blindly — if shape changes, `notifications.filter` silently breaks | Subtle |
| 6 | `unreadCount` computed inline on every render — fires on every poll tick, should be wrapped in `useMemo` | Minor |

## Setup

```bash
npm install
npm run dev
```
