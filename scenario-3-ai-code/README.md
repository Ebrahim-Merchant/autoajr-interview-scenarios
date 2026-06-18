# Scenario 3 — Post Feed

## Background

A client used an AI coding tool (Cursor) to build a post feed feature. The feature polls the API every 5 seconds to fetch posts for the currently selected user and displays them in a feed. The AI generated most of the code, the team reviewed it briefly and it looked reasonable to them, so they shipped it. Now the client is reporting problems in production.

## Client Report

> "We had Cursor generate our post feed. It polls for the user's posts every 5 seconds and updates the feed automatically. The code looked fine when we reviewed it, but users are complaining. Our DevOps team flagged a memory leak -- API call counts keep climbing over time and never stop. On top of that, some users say the feed stops refreshing properly when they switch between user profiles. We can't immediately spot what's wrong. Can you take a look?"

## What the App Does

- Displays a feed of posts for a selected user (fetched from a mock API)
- Polls every 5 seconds to refresh the feed
- Lets users click a post to mark it as read
- Shows an unread badge count in the feed header

## Your Task

Review the code, identify what is causing the reported issues, and fix them. You are not expected to redesign the app -- focus on correctness and stability.

Things worth investigating:

- How polling is set up and torn down across component lifecycles
- What happens to in-flight requests when the user changes
- Error handling on fetch calls
- How UI state is updated when server calls fail

## Constraints

- Do not change the visible UI or polling interval
- Do not add new libraries; fix what is here
- The mock API uses `jsonplaceholder.typicode.com`

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Interviewer Reference -- Do Not Share With Candidate

| # | Bug | Severity |
|---|---|---|
| 1 | `setInterval` return never stored -- interval never cleared = memory leak + duplicate polls on every `userId` change | Critical |
| 2 | No `AbortController` -- stale fetch overwrites newer data when switching users quickly | High |
| 3 | No `.catch` on initial fetch -- `loading` never set to `false` on error, spinner hangs forever | High |
| 4 | `markAsRead` optimistically updates UI but does not roll back if server POST fails (30% failure rate) | Medium |
| 5 | API response shape trusted blindly -- no validation before mapping | Subtle |
| 6 | `unreadCount` computed inline on every render -- should be wrapped in `useMemo` | Minor |

**Suggested scoring:** Finding bugs 1 and 2 is the baseline pass. Bug 3 shows error handling awareness. Bugs 4 and 5 reflect production experience. Bug 6 is a bonus.
