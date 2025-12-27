---
layout: project
type: project
title: "Group Navigation Prototype"
date: 2025
published: true
image: img/projects/group-navigation-card.svg
labels:
  - Python
  - Flask
  - WebSockets
  - Mapping
summary: "Full-stack Flask app that authenticates drivers, tracks everyone in real time, and keeps convoys aligned on shared destinations."
---

# Overview
Coordinating multiple cars to the same meetup is harder than it sounds, so I built a prototype that authenticates each driver, tracks their live GPS coordinates, and shares everyone’s position on an interactive Leaflet map. The system combines classic Flask routes for authentication with Flask-SocketIO for location streaming so the UI updates instantly without refreshing.

# Feature Highlights
- **Account system:** Secure registration/login backed by hashed passwords, admin roles, and profile editing right from the dashboard.
- **Live map:** Leaflet + OpenStreetMap tiles show a blue dot for the current user and red markers for the rest of the convoy. Socket events broadcast updates multiple times per minute.
- **Admin controls:** A guard-railed dashboard lets a safety lead reset passwords, remove inactive drivers, or verify that everyone has shared their location before rollout.
- **Testing & scripts:** Pytest suites cover profile CRUD while helper scripts automate admin creation and password resets.

# Implementation Notes
- Built with Python 3.11, Flask 2.3, Flask-SocketIO, SQLite, and vanilla JS on the front end.
- `navigator.geolocation.watchPosition()` powers high-frequency updates; the server fans changes out through `location_update` WebSocket events.
- Database schema keeps metadata like vehicle type, last latitude/longitude, and timestamps for auditing after long drives.

# Next Iterations
Planned enhancements include driving directions between vehicles, historical route playback, and migrating to Postgres + Redis so we can scale beyond a dozen simultaneous drivers.

# Repository
- Source code, API docs, and troubleshooting tips live at [github.com/AngePort/Group-Navigation](https://github.com/AngePort/Group-Navigation).
