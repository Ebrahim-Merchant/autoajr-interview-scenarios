# How to Upload These Projects to StackBlitz

## Option A — StackBlitz CLI (Recommended)

Install the CLI once:
```bash
npm install -g @stackblitz/cli
```

Then for each scenario:
```bash
cd scenario-1-performance
stackblitz login   # first time only
stackblitz upload  # creates a live project at stackblitz.com
```

This gives you a shareable URL like: `https://stackblitz.com/edit/scenario-1-performance-xxxxx`

---

## Option B — Drag and Drop (Simplest)

1. Open [https://stackblitz.com](https://stackblitz.com)
2. Click **"Import a project"** or drag the scenario folder directly onto the StackBlitz homepage
3. StackBlitz auto-detects the Vite + React config and spins it up

---

## Option C — GitHub Import

1. Push each scenario folder to a GitHub repo (or put all 4 in subfolders)
2. Visit: `https://stackblitz.com/github/<your-username>/<repo-name>/tree/main/scenario-1-performance`
3. StackBlitz auto-imports from the GitHub URL

---

## Option D — Manual via StackBlitz Web IDE

1. Go to [https://stackblitz.com/fork/vite-react-ts](https://stackblitz.com/fork/vite-react-ts)
2. This forks a Vite + React + TS template
3. Replace the default files with the files from each scenario folder
4. Files to create/replace:
   - `src/App.tsx`
   - `src/index.tsx`
   - Any additional `src/*.tsx` / `src/*.ts` files
   - `package.json` (merge or replace)

---

## Project Structure Reference

Each scenario folder contains:

```
scenario-X/
├── package.json       # React 18 + TypeScript + Vite
├── vite.config.ts     # Vite config with React plugin
├── tsconfig.json      # TypeScript config
├── index.html         # Entry HTML
├── README.md          # Client complaint + instructions
└── src/
    ├── index.tsx      # React root mount
    ├── App.tsx        # Main app (with buggy code)
    └── *.tsx / *.ts   # Supporting files
```

---

## Sharing Links

Once uploaded, share with candidates as:
- Direct StackBlitz link (they can edit but not save to your account)
- Fork URL: append `?fork=1` to force them to fork before editing
- Embed in a Notion page or Google Doc with the interview questions

## Recommended for Interviews

Use **Option A (CLI)** or **Option B (drag-drop)** — both are fast (under 2 minutes per project).

Upload all 4 before the interview. Test that each one runs cleanly before sharing.
