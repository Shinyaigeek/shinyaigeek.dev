---
company: Ubie, Inc.
startDate: "2025/08"
position: Full-time employee
role: Platform Engineer
technologies: ["TypeScript", "Node.js", "Nest.js", "Next.js", "GraphQL", "GCP", "k6", "Sentry"]
---

Working as an embedded enabling engineer across several product teams in the medical-institution business unit. With "maximizing the delivery of user value" as the goal, I work backward from each team's stage toward it, through SLI/SLO definition, automated error triage, and developer productivity.

- Core implementer on the re-architecture of the toC symptom checker (~10M MAU) from Rails to Node.js (Nest.js + GraphQL), leading the migration implementation, load testing, and performance tuning
  - Agreed the performance baselines to preserve with the owning product team, then built a k6-based load-testing harness and scenarios around them. This surfaced performance regressions that only appear at production data volumes, which unit-level testing kept missing, and they were fixed before cutover
  - Turned those findings into an internal ISUCON event (~10 participants), and shipped the migration with user-perceived question-to-question latency cut to ~40% of the original at the median
- Re-architected the LLM batch platform with a preprocessing layer that curates the information handed to the model. Using past execution logs to enrich what it can reason about cut token consumption by ~40%, kept the workload under token-usage caps as volume grew, and made re-runs cheap and reliable
- Built a Sentry-tag-driven LLM agent error-routing layer so production errors reach the engineers who own them, cutting incident rates and speeding up resolution of browser- and environment-specific bugs
- Built a Claude-Code-driven dev-environment bootstrap that turned a ~3-day onboarding into a mostly hands-off ~30-minute setup
