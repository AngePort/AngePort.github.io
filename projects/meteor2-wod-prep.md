---
layout: project
type: project
title: "Meteor WOD Prep"
date: 2024
published: true
image: img/projects/meteor2-wod-prep-card.svg
labels:
  - JavaScript
  - Meteor
  - Practice
  - Testing
summary: "Hands-on warmup repo where I extended the ICS Meteor Application Template React stack to prep for rapid Work-Out-of-the-Day (WOD) assignments."
---

# Overview
Before shipping larger products like Flavor Forge, I spent time mastering the ICS Meteor + React stack used across UH Mānoa’s software engineering curriculum. This repo documents my drills: wiring up publications/subscriptions, enforcing schema validation, and automating CI so I could finish timed WODs with confidence.

# What I Practiced
- **Component scaffolding:** Built reusable layouts, navigation, and card views using Semantic UI React and the app template’s design tokens.
- **Mongo collections & schemas:** Added new domain models, associated publications, and server-side validators so forms reject bad data before it reaches the database.
- **Testing pipeline:** Kept GitHub Actions green by running ESLint, `meteor npm test`, and Cypress smoke tests on every push.
- **Deployment hygiene:** Followed the template’s guidelines for settings files, sample data, and README badges to match production expectations.

# Takeaways
The drills paid off when my teams jumped into Meteor-based hackathons. Having muscle memory for publications, accounts, and React patterns meant I could focus on user experience instead of fighting the framework under a deadline.

# Repository
- Explore the exercises and CI history at [github.com/AngePort/Meteor2-WOD-PREP](https://github.com/AngePort/Meteor2-WOD-PREP).
