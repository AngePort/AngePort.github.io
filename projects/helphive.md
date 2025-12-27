---
layout: project
type: project
title: "HelpHive: AI Folder Renamer"
date: 2025
published: true
image: img/projects/helphive-card.svg
labels:
  - Python
  - AI
  - CLI
  - Automation
summary: "Command-line assistant that inspects folder contents, drafts clear names with LLMs, and safely applies renames on macOS."
---

# Overview
HelpHive began as a personal productivity tool for reorganizing chaotic project archives on my Mac. The CLI walks each folder, samples representative text, PDF, and image content (via OCR when Tesseract is installed), then asks an LLM for a short, filesystem-safe title. Instead of blindly renaming files, the tool surfaces a proposal, shows a diff, and only applies changes after my confirmation.

# Architecture at a Glance
- **Language & runtime:** Python 3.10+ with `typer` for the CLI interface.
- **AI integration:** Calls OpenAI via their REST endpoint, with prompt guards to enforce safe characters and 50-character limits.
- **Content extraction:** Mix of built-in text parsing, `pdfminer.six`, and optional Tesseract OCR for screenshots or scans.
- **Safety controls:** Dry-run by default, per-folder confirmation, and fallback suffixes if a target name already exists.

# Highlights
1. **Context-aware naming.** The agent reads a few kilobytes from each folder, creating summaries like “uhm-cs-capstone-notes” instead of “Folder 12.”
2. **Root-file bundling.** A flag lets me summarize loose files alongside subdirectories so top-level documents never get ignored.
3. **Extensible pipeline.** Roadmap items include per-file renaming, CLIP-based vision tags, and a lightweight SwiftUI wrapper for non-terminal users.
4. **Idempotent operations.** Re-running the CLI skips folders whose current name already reflects the detected content, preventing churn in Git histories.

# Usage Notes
```bash
# Dry run (default)
python -m src.main /Volumes/projects/archive

# Apply renames and include loose files in the scan
python -m src.main /Volumes/projects/archive --apply --include-root-files
```

# Repository & Docs
- Source and setup guide: [github.com/AngePort/HelpHive](https://github.com/AngePort/HelpHive)
- Detailed prerequisites (Python env, OpenAI key, Tesseract install) are documented in the repository README.
