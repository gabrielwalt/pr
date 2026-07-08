---
name: preview-server-content-serving
description: The local AEM dev server (`aem up`) serves this project's content under a URL prefix and only scans content files at boot — new .plain.html files 404 until restart, and the wrong project renders if the server was started from another repo's directory. Use when a locally-created page 404s, edits don't appear, the preview shows a different site, or you need to know the correct localhost URL for a content page.
---

**The dev server serves local content under the `/content` URL prefix and scans the folder ONCE at boot.** Two recurring traps on this hosted setup:

**1. New content files 404 until you restart.** `aem up --html-folder content` enumerates content at startup. A `.plain.html` created *after* boot is proxied to the remote origin (404) instead of served locally. **After creating any new content file, restart the server.**

**2. URL prefix ≠ authoring path.** Because the server runs with `--html-folder content`, a page at `content/library/x.plain.html` serves at **`http://localhost:3000/content/library/x`** (decorated) and `…/content/library/x.plain.html` (raw). In DA/published it lives at `/library/x` (no `/content`). Use the `/content`-prefixed URL for all local preview.

**3. Wrong project renders → server started from a stale cwd.** If preview shows another site's styles/fonts, the `aem up` process is running from a different (possibly deleted) repo directory. Check `readlink /proc/<pid>/cwd`; restart from this repo.

## Recipe
```bash
# Diagnose: what's serving, from where
for p in $(pgrep -f "aem up"); do echo "$p cwd=$(readlink /proc/$p/cwd)"; done
# Restart cleanly (detach so it survives the shell; pkill can SIGKILL your own chain)
cd <repo-root>
setsid nohup aem up --html-folder content --prefer-plain-html --addr '*' --no-open --port 3000 > /tmp/aemup.log 2>&1 < /dev/null & disown
sleep 6
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/content/<path>   # expect 200
```
The boot log confirms wiring: `Serving content from local content/ … Serving HTML files from folder: content at /content`.

## Pitfalls
- Loading `http://localhost:3000/<path>` (no `/content`) for a local page — 404s or proxies to remote. Add the prefix.
- `pkill -f "aem up"` from inside a Bash tool call can kill the tool's own process chain (exit 143/144) — prefer `kill <pid>`, and relaunch with `setsid … & disown` so the new server detaches.
- Header/footer 404s in console are expected until nav/footer content exists — not a serving bug.
- The remote proxy origin comes from the git remote (`main--<repo>--<owner>.aem.page`), not an `fstab.yaml` — this repo has none.

See also: `eds-dom-structure` ("local vs remote serving" pitfall — main page comes from remote, only `.plain.html` serves local), `component-library` (records the `/content` quirk in PROJECT-IMPORT.md).
