---
layout: project
type: project
title: "LookOut: Local Event Finder"
date: 2025
published: true
image: img/projects/lookout-card.svg
labels:
  - TypeScript
  - React
  - Node.js
  - APIs
summary: "Ticketmaster-powered experience that maps concerts, sports, and pop-up events with location-aware search and responsive UI."
---

# Overview
LookOut is a full-stack exploration tool that helps people discover concerts, games, and cultural events near any location. I paired a React + TypeScript frontend with a lightweight Express API that proxies the Ticketmaster Discovery endpoint, adds caching, and normalizes data so users always get a consistent card layout. The interface supports both automatic geolocation and manual searches so it works whether you are planning a trip or already downtown.

# Tech Stack & Architecture
- **Frontend:** React, Vite, React Router, Tailwind-inspired utility classes, Leaflet + OpenStreetMap for the interactive map, Axios for API calls.
- **Backend:** Node.js + Express with TypeScript, Ticketmaster Discovery API integration, structured DTOs, and health checks for uptime monitoring.
- **Deployment:** Frontend on Vercel, backend on Render free tier, static maps through OpenStreetMap so the entire system runs with zero hosting cost.

# Key Features
1. **Smart filters** for category, distance radius, keyword, and price so people can narrow thousands of events down to a handful.
2. **Map + grid views** stay in sync—clicking a card pans the map to the venue, and marker clicks open the full detail view.
3. **Graceful fallbacks** such as defaulting to New York when geolocation permissions are denied and caching the last successful search offline.
4. **API abstraction layer** that centralizes Ticketmaster parameters and error handling, making it simple to plug in future sources like Eventbrite.

# Impact & Next Steps
The project serves as my playground for experimenting with modern TypeScript tooling (Vite, ESLint, Vitest) plus real-world API quotas and deployment workflows. Roadmap items include personal accounts for bookmarking events, push notifications for day-of reminders, and integrating multiple ticket providers for better coverage.

# Repository & Demo
- Source: [github.com/AngePort/LookOut](https://github.com/AngePort/LookOut)
- Live build instructions live in `SETUP.md` inside the repo for both Render + Vercel deployments.
