# Scenario 4 — External API Limitation: Address Autofill

## Client Report

> "The address autocomplete field isn't working properly for some of our customers. When they type their address, sometimes they get suggestions and sometimes they get nothing at all. Rural customers are especially affected. It's causing checkout abandonment. Please investigate and fix it."

---

## Setup

```bash
npm install
npm run dev
```

## Reproducing the Issue

Try typing these addresses:

| Address | Expected | What happens |
|---------|----------|--------------|
| `123 Main` | Suggestions appear | ✅ Works |
| `456 Oak` | Suggestions appear | ✅ Works |
| `789` | Suggestions appear | ✅ Works |
| `742 Evergreen` | Suggestions appear | ❌ No results |
| `1 Country Road` | Suggestions appear | ❌ No results |
| `99 Nowhere Lane` | Suggestions appear | ❌ No results |

## Your Task

1. **Diagnose:** Open the console. What is the API returning for failing addresses? Is there an error?
2. **Root cause:** Is this a bug in the code? A missing API key permission? Or something else?
3. **Solution:** What are your options? Propose at least 2 approaches with trade-offs.
4. **Communication:** How would you explain this to a non-technical client?

## Investigation Hints

- Check browser console for API call logs
- Look at what `getAutocompletePredictions` returns for failing addresses
- Is the component handling the failure correctly?
- What's the difference between "API error" and "API returned empty results"?

## Key Insight

This scenario tests whether you can correctly identify **external API data limitations** vs. **code bugs** — and what you do about it.
