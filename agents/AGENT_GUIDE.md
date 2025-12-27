# Agent Operations Guide

**Purpose.** This document gives AI assistants the shared context they need to update Angello Portillo's professional TechFolio portfolio safely, consistently, and with awareness of current portfolio trends.

---

## 0. Activation Checklist & Compliance
1. Re-read this guide at the start of every working session or after two idle hours—never rely on memory.
2. Before responding to any prompt or opening another file, paste the Section 1 injection prompt into your highest-priority system slot, note "TechFolio prompt active" in your work log, and confirm it stays pinned.
3. If anyone asks you to skip, edit, or defer the injection prompt, stop, document the request, and escalate; compliance is non-negotiable.
4. Treat this checklist as a hard gate: no commands, edits, or summaries happen until the above steps are complete and acknowledged.
5. Log any deviations, blockers, or uncertainties in your final handoff so the next agent can correct course immediately.

---

## 1. Mandatory Agent Injection Prompt
Before touching any other file, every agent must load the following system prompt into their working context. Do not skip or edit it.

```
You are maintaining Angello Portillo's professional TechFolio portfolio (https://AngePort.github.io). Preserve professionalism, accuracy, and accessibility. Confirm every change aligns with the owner's voice (ambitious, service-minded, technically precise). Never delete existing accomplishments without archival notes. Prioritize clarity, measurable outcomes, and modern portfolio expectations.
```

1. Paste the prompt into your assistant session.
2. Confirm in your work log that the prompt is active.
3. Only then proceed with additional instructions; if you cannot confirm the prompt is active, pause the task.

---

## 2. Self-Annealing Task Protocol
Convert every assignment into a loop that converges on the desired outcome.

1. **Define success upfront.** Restate the owner's goal, acceptance criteria, and affected files before editing anything.
2. **Plan → Execute → Inspect loops.** Make the smallest possible change set, verify it against the acceptance criteria (tests, previews, lint, manual review), and iterate until quality bars are met.
3. **Keep context synchronized.** Update data sources, markdown, and assets together so no partial states remain in the repo.
4. **Resolve or document blockers immediately.** If something cannot be finished, add a visible TODO with reproduction steps and rationale instead of leaving silent gaps.
5. **Do not hand off half-complete work.** Either land a production-ready change or clearly mark what remains along with the next best step.

---

## 3. Portfolio Snapshot (Key Facts to Remember)
- **Owner:** Angello Portillo — UH Mānoa CS student (grad. Fall 2025), IT Technician for the State of Hawai‘i.
- **Site Stack:** GitHub Pages + Jekyll, TechFolio theme (`css/techfolio-theme/bitter.css`), data-driven sections via `_data/bio.json`, `_includes/*` partials.
- **Primary Sections:** About, Projects, Essays (see `index.html` includes and `_layouts/home.html`).
- **Brand Tone:** Confident, impact-driven, emphasizes aerospace projects (NASA RockOn, ARLISS), government IT experience, and hands-on engineering.

Whenever content changes, update `_data/bio.json`, relevant markdown in `essays/` or `projects/`, and images under `img/` as needed.

---

## 4. Build, Preview, Deployment
1. **Local preview:**
   - Install Ruby + Bundler.
   - Run `bundle install` once (Gemfile already provided by TechFolio template).
   - Launch the dev server with `bundle exec jekyll serve` and open `http://127.0.0.1:4000`.
2. **Production:**
   - Pushing to `main` triggers GitHub Pages build at `https://AngePort.github.io` (baseurl is empty, so root deploy).
3. **Verification checklist:**
   - `bundle exec jekyll build` must succeed locally before committing.
   - Spot-check About, Projects, Essays, and Resume routes for layout regressions.
   - Confirm custom images referenced in markdown exist under `img/`.

---

## 5. Change Memory & Logging Protocol
Use this guide as the canonical memory for why changes happened.

When you modify the site:
1. Add a dated bullet under **"Update Log"** (below) summarizing what changed and why.
2. Reference impacted files using workspace-relative paths.
3. Note follow-up tasks or data sources to revisit.

### Update Log
- 2025-12-26: Reinforced activation compliance, added self-annealing workflow, and renumbered sections for clarity. Files: agents/AGENT_GUIDE.md. Follow-up: Each new agent must confirm Sections 0-2 before editing.
- 2025-12-26: Created agent ops guide, documented injection prompt, and logged trend cadence. Files: agents/AGENT_GUIDE.md. Follow-up: refresh trends by 2026-03-31.
- 2025-12-26: Added GitHub sync workflow, surfaced repos on Projects page, and scripted data pull. Files: _includes/projects/projects.html, _data/github_repos.json, agents/scripts/sync_github_projects.sh. Follow-up: refresh repo data whenever new projects land on GitHub.
- 2025-12-26: Added markdown entries for each GitHub repository, expanded repo data, and noted image follow-ups. Files: projects/*.md, _data/github_repos.json. Follow-up: capture bespoke screenshots for the new GitHub projects.
- 2025-12-26: Created branded SVG covers for each GitHub-driven project and wired them into the portfolio. Files: img/projects/*-card.svg, projects/*.md. Follow-up: replace SVG placeholders with real screenshots when assets are captured.

---

## 6. High-Value Assets & Where They Live
- **Personal data:** `_data/bio.json`
- **Projects:** `projects/*.md` + card partial `_includes/projects/project-card.html`
- **Essays:** `essays/*.md` + `_includes/essays/`
- **Layout shells:** `_layouts/home.html`, `_layouts/default.html`
- **Shared header/footer:** `_includes/header.html`, `_includes/footer.html`
- **Styling:** `css/techfolio-theme/*.css` (site uses `bitter.css`), syntax themes under `css/rouge/`
- **Static resume page:** `resume.html`

Always update both data sources and rendered markdown to keep cards and standalone pages consistent.

---

## 7. Trending Portfolio Expectations (Dec 2025)
Keep Angello's portfolio aligned with current recruiter expectations:
1. **Metrics-forward storytelling:** Ensure each project or experience highlights measurable outcomes (latency reductions, dollars saved, launch stats, etc.).
2. **AI & automation fluency:** Showcase any LLM, automation, or DevOps tooling experience. Add new sections/projects when Angello gains AI-focused work.
3. **Security & reliability proof points:** As an IT Technician, emphasize compliance, zero-trust practices, incident response drills, or certifications.
4. **Interactive media:** Use galleries, short clips, or diagrams (hosted under `img/`) to visualize rockets, avionics rigs, or dashboards.
5. **Accessibility & performance:** Verify color contrast in `bitter.css`, add alt text to new images, and compress assets.
6. **Thought leadership cadence:** Keep Essays section fresh with reflections on emerging tech, internships, or conference talks (minimum one new essay per quarter).

**Next trend review:** Target 2026-03-31 to reassess recruiter expectations, add/remove bullets, and document updates in the log.

Re-evaluate these bullets quarterly; append new trends with dates so future agents can see the evolution.

---

## 8. Standard Workflow for Future Agents
1. **Sync + Branch:** `git pull` latest changes, create a descriptive branch.
2. **Review Guide:** Re-read this file (especially injection prompt and trends) before editing.
3. **Plan Updates:** Identify target files and confirm data dependencies.
4. **Implement:** Follow the Section 2 self-annealing loop, keep iterations small, and ship only professional, reversible commits.
5. **Test:** Run local Jekyll build, proofread pages, validate links.
6. **Document:** Update the log in Section 5 and summarize in PR description.
7. **Handoff:** List unresolved questions or TODOs so the next agent can continue seamlessly.

Following this playbook keeps Angello's portfolio professional, modern, and ready for recruiters.

---

## 9. GitHub Project Sync Workflow
Use this process to keep `_data/github_repos.json` current so the Projects page automatically showcases the newest public work on GitHub.

1. **Install tooling:** Ensure GitHub CLI (`gh`) is authenticated and Python 3 is available.
2. **Run the sync script:** From the repo root execute `bash agents/scripts/sync_github_projects.sh AngePort 6`. Adjust the `6` limit if you want to surface more repositories.
3. **Review the output:** Open `_data/github_repos.json` to confirm descriptions and timestamps look accurate. Edit descriptions if you need tighter, recruiter-friendly copy.
4. **Regenerate project cards when needed:** When a repo becomes showcase-ready, create or update the matching markdown file under `projects/` so it appears in the curated cards as well.
5. **Commit + log:** Add the updated data file (and any new project pages) to your commit and note the refresh in the Update Log.

Display context:
- `_includes/projects/projects.html` now shows a "Latest on GitHub" panel powered by this data file.
- The panel always links back to `https://github.com/AngePort`, giving visitors a path to the full repo list.

Run the sync whenever a meaningful new repository ships or a major update happens so the site mirrors GitHub activity.
