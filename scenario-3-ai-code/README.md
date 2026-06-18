# Scenario 3: Post Feed

## Background

A client used an AI agent to build a post feed feature. The feature polls the API every 5 seconds to fetch posts for the currently selected user and displays them in a feed. The AI generated most of the code, the team reviewed it briefly and it looked reasonable to them, so they shipped it. Now the client is reporting problems in production.

## Client Report

> "We had an AI agent generate our post feed. It polls for the user's posts every 5 seconds and updates the feed automatically. The code looked fine when we reviewed it, but users are complaining. Our DevOps team flagged performance slowdowns, and API call counts keep climbing over time and never stop. On top of that, some users say the feed stops refreshing properly when they switch between user profiles. We can't immediately spot what's wrong. Can you take a look?"

## What the App Does

- Displays a feed of posts for a selected user
- Polls every 5 seconds to refresh the feed
- Lets users click a post to mark it as read
- Shows an unread badge count in the feed header

## Your Task

Review the code, investigate the client's report, and make the smallest safe fixes. You are not expected to redesign the app, focus on correctness and stability.

Things worth investigating:

- How polling behaves across component lifecycles
- What happens when the selected user changes quickly
- How the app behaves when API requests fail
- Whether UI state always reflects server state

## Constraints

- Do not change the visible UI or polling interval
- Do not add new libraries; fix what is here

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
