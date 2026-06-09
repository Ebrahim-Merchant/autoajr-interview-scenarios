# Scenario 3 — Email Inbox

## Client Report

> "We used Cursor to build the email inbox feature. It works most of the time, but our DevOps team flagged a memory leak — API calls keep growing over time. Also some users report emails don't refresh properly when switching inboxes. The AI wrote most of this and the code looks fine to us. Can you review it?"

## Known Bugs (Interviewer Reference — Do Not Share)

| # | Bug | Severity |
|---|---|---|
| 1 | `setInterval` return never stored — interval never cleared = memory leak + duplicate polls on every `userId` change | Critical |
| 2 | No `AbortController` — stale fetch overwrites newer data when switching users quickly | High |
| 3 | No `.catch` on initial fetch — `loading` never set to `false` on error, spinner hangs forever | High |
| 4 | `markAsRead` optimistically updates UI but doesn't roll back if server POST fails (30% failure rate) | Medium |
| 5 | API response shape trusted blindly — no validation before mapping | Subtle |
| 6 | `unreadCount` computed inline on every render — should be wrapped in `useMemo` | Minor |

## Setup

```bash
npm install
npm run dev
```
