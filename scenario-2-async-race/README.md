# Scenario 2 — Race Condition in Search

## Client Report

> "The live search is acting weird. Sometimes when I type quickly, I see old results flash in for a second before it shows the right ones — like I type 'Bob' and I briefly see results for 'B' before it updates. It's jarring and makes us look broken. Please investigate."

---

## Setup

```bash
npm install
npm run dev
```

## Reproducing the Bug

1. Type **"b"** in the search box, then immediately type **"bo"** (fast!)
2. Watch the results — do you ever see "b" results appear after "bo" results?
3. Also try: type "a", then quickly type "al" or "ali"

**Note:** The mock API is intentionally slower for shorter queries to make the bug easy to reproduce.

## Your Task

1. Identify why stale results can appear
2. Explain the race condition — what's the exact sequence of events?
3. Propose and implement a fix
4. Bonus: What else could be improved?

## What We're Looking For

- Understanding of async race conditions
- Knowledge of `useEffect` cleanup
- Awareness of `AbortController`
- Consideration of debouncing
- Error state handling
