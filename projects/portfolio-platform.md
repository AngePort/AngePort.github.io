---
layout: project
type: project
title: "TechFolio Portfolio Platform"
date: 2024
published: true
image: img/projects/portfolio-platform-card.svg
labels:
  - Jekyll
  - GitHub Pages
  - Web Design
  - Automation
summary: "Customized TechFolio deployment hosted on GitHub Pages with structured data and a growing knowledge base."
---

# Overview
This repository powers the site you are reading. I forked the TechFolio starter, modernized the Bitter theme, and layered on custom includes and essay feeds. Every section—About, Projects, Essays, Resume—pulls from structured data files so updates stay consistent across cards and standalone pages.

# What Makes It Different
- **Dynamic GitHub feed:** `_data/github_repos.json` keeps the Projects page aware of the latest public repositories.
- **Content architecture:** `_data/bio.json` drives hero content, `_includes/*` handles reusable sections, and `_layouts/*` keep page shells clean for future redesigns.
- **Accessibility pass:** Color contrast tweaks, responsive typography, and alt-text guidance ensure the site remains recruiter-friendly.

# Tooling & Deployment
- Built with **Jekyll** + **kramdown** and deployed automatically via **GitHub Pages**.
- Local preview uses `bundle exec jekyll serve`, while CI relies on the same command to catch errors before publishing.
- Rouge syntax themes and TechFolio skins remain available for quick visual refreshes.

# Repository
- Explore the full source at [github.com/AngePort/AngePort.github.io](https://github.com/AngePort/AngePort.github.io).
