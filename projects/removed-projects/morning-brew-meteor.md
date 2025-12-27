---
layout: project
type: project
title: "Morning Brew Meteor"
date: 2024
published: false
draft: true
image: img/projects/morning-brew-meteor-card.svg
labels:
  - Meteor
  - React
  - MongoDB
  - UI/UX
summary: "Meteor + React single-page app that prototypes a coffee shop loyalty dashboard with menu browsing, favorites, and admin controls."
---

# Overview
Morning Brew is a classroom-sized but production-minded experiment that mimics the digital experience of a neighborhood coffee shop. Customers can browse drinks, flag favorites, and view specials, while admins manage inventory and featured items. The project let me stretch the standard Meteor Application Template React stack into a polished UI with role-based features.

# Core Capabilities
1. **Menu catalog:** Publications expose drinks, beans, and pastries from MongoDB; subscriptions hydrate responsive cards with images and pricing.
2. **User personalization:** Authenticated users maintain a list of favorites, making it easy to remember complex orders.
3. **Admin workspace:** Admin role surfaces protected routes for creating/updating menu items and highlighting seasonal offerings.
4. **Responsive layout:** Semantic UI React components adapt gracefully from 320px phones to desktop dashboards.

# Engineering Practices
- Adopted the template’s testing culture with eslint, TestCafe smoke tests, and GitHub Actions CI.
- Leveraged fixtures to seed sample data so designers could play with the UI immediately.
- Documented setup instructions for new contributors, mirroring real-world onboarding guides.

# Repository
- Code and setup instructions live at [github.com/AngePort/morning-brew-meteor](https://github.com/AngePort/morning-brew-meteor).
