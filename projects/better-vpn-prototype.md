---
layout: project
type: project
title: "Better VPN Prototype"
date: 2025
published: true
image: img/projects/better-vpn-prototype-card.svg
labels:
  - Security
  - Python
  - Redis
  - Networking
summary: "Research prototype that layers Redis-backed threat intel and quarantined channels onto a traditional VPN tunnel to reduce false positives."
---

# Problem & Concept
While supporting state networks, I saw how legacy VPN concentrators either over-block suspicious traffic or allow risky packets because signatures lag behind. This prototype explores a middle ground by adding a Redis cache for near-real-time threat intel and network quarantined channels (NQC) that isolate suspect flows without tearing down the entire connection.

# Architecture
1. **Ingest layer:** Python services ingest IDS feeds, normalize indicators of compromise (IOCs), and push them into Redis with TTLs so stale data expires automatically.
2. **Policy engine:** A fast evaluator runs inside the VPN gateway, checking each new session against Redis and adaptive heuristics (origin, protocol, device posture).
3. **Quarantined channels:** Instead of dropping the user, unusual flows get rerouted through a sandbox network segment where deeper packet inspection runs, keeping legitimate users online while security investigates.
4. **Metrics + telemetry:** Prometheus-style counters track blocked vs. quarantined events to tune thresholds and justify operational changes.

# Results So Far
- Demonstrated a **32% reduction in false positives** across my lab datasets because Redis lets us expire noisy indicators quickly.
- Measured **sub-5ms policy lookups** thanks to in-memory data and compact key schemas.
- Created runbooks for on-call staff so they know when and how to escalate quarantined channels to full blocks.

# Next Steps
- Harden the policy engine in Rust or Go for even lower latency.
- Add streaming exports to Splunk and Elastic so SOC dashboards show quarantine activity instantly.
- Pilot with a small cohort of state-issued laptops to gather real-world telemetry before proposing production rollout.

# Repository
- Research notes, architecture diagrams, and proof-of-concept code are available at [github.com/AngePort/Better_VPN_Prototype_1](https://github.com/AngePort/Better_VPN_Prototype_1).
