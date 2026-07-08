---
name: session-close
description: What to do at the end of a session before handing off. Load when the session is ending or a task is fully complete.
---

At the end of every session (or when the user signals they're done):

## Close sequence
1. **Mark completed tasks** — in `PROJECT-PLAN.md`, change `🔲 Open` → `✅ Done` for every task completed this session
2. **Update `PROJECT-STATUS.md`** — update the progress table and "Current Focus" section
3. **Capture skills** — for every non-obvious problem solved this session, create or update a skill
4. **Check the component library is in sync** — if the project maintains one (`component-library`) and any block, variant, or section style was added or changed this session, confirm its library page was added/updated in the same breath (the Library-Mirrors-Inventory Rule). A library missing the newest variant gives false confidence at GATE-2 and in the author panel. The library is never frozen, so this is always a safe edit — fix the drift now, don't defer it.
5. **Note current focus** — add a brief note to `PROJECT-STATUS.md` so the next session knows where to resume

## The skill capture test
Ask: "If the next agent starts fresh, what non-obvious thing would they have to re-discover?"
If the answer is anything actionable, write it as a skill.

## Current Focus update format
```
**Last updated:** YYYY-MM-DD
**Branch:** `branch-name`
**Active task:** {task-id} — {task name}
**Last completed:** {what was just finished}
**Next up:** {next task(s)}
**Blocker:** None (or describe blocker)
```

## Pitfalls
- Updating `PROJECT-STATUS.md` with "done" when the task hasn't been verified visually
- Forgetting to add new skills to `skills/README.md` — the skill exists but is never found
- Leaving `PROJECT-PLAN.md` with ambiguous task states — next session won't know where to start
- Closing a session that added a block/variant without adding its component-library page — the library silently drifts from `PROJECT-BLOCKS.md` and stops being a trustworthy reference

See also: `curating-project-knowledge` (run the capture+curate pass at close — route any durable learning to its home, consolidate, reflect, surface consequences), `component-library` (the sync check at step 4 — never-frozen, mirrors the block inventory)
