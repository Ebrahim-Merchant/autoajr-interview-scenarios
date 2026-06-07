# Scenario 1 — Performance Bug: Unnecessary Re-renders

## Client Report

> "Our user dashboard feels really sluggish when typing in the search box, especially when there are more users. It wasn't like this before we added more team members. Can you look into it?"

---

## Setup

```bash
npm install
npm run dev
```

## Your Task

1. Open the browser console
2. Type in the search box
3. Watch the console output — what do you notice?
4. Identify **why** the performance issue is happening
5. Propose and implement a fix

## Hints (use only if stuck)

- `console.log` in `UserCard` will tell you a lot
- Think about what causes a React component to re-render
- Is `handleSelect` the same reference between renders?
- Does React know that `UserCard` hasn't changed?

## What We're Looking For

- Root cause identification
- Knowledge of React rendering model
- Appropriate use of React optimization APIs
- Understanding of *when* to optimize vs. when it's premature
