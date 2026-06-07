# Scenario 3 — Debugging AI-Generated Code

## Client Report

> "We used Cursor to build the notification feature. It works most of the time, but we've had reports that notifications don't always show up properly, and our DevOps team flagged what looks like a memory leak — API calls keep growing over time. The AI wrote most of this and the code looks reasonable to us. Can you review it?"

---

## Setup

```bash
npm install
npm run dev
```

## Reproducing the Issues

1. **Memory leak:** Open the browser console, leave the app open, and watch how many `[API] fetchNotifications called` logs appear over time
2. **Accumulating intervals:** Switch between users a few times — watch the API call frequency increase
3. **Failed mark-as-read:** Click notifications to mark them as read — the mock API fails ~30% of the time. Does the UI handle this correctly?
4. **Infinite loading:** (Harder to trigger) — can you find a code path that leaves the spinner up forever?

## Your Task

1. Review `useNotifications.ts` — it was AI-generated. What bugs do you see?
2. How many issues can you find? (There are at least 4)
3. Fix them and explain your reasoning
4. Bonus: Is polling the right architecture here?

## What We're Looking For

- Memory leak identification (missing cleanup)
- Race condition awareness
- Error handling completeness
- Optimistic update rollback
- Critical evaluation of AI-generated code
- Architectural thinking (polling vs. WebSocket/SSE)
