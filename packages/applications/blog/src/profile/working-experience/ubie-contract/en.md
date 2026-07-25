---
company: Ubie, Inc.
startDate: "2024/01"
endDate: "2025/07"
position: Part-time employee
role: Platform Engineer
technologies: ["Node.js", "TypeScript", "Next.js", "GraphQL", "Nest.js", "Kotlin", "tailwind.css"]
---

Joined as a contractor alongside my full-time role at Nikkei, driving technical migrations during Ubie's growth phase.

- Drove the Node.js migration of the toC symptom checker's backend. The project moved a Kotlin-based modular monolith (20-30 modules) to Node.js to unify the company-wide tech stack, and I owned the migration implementation
  - I also built tooling that automated a migration chore taking 30-40 minutes per query, removing that work for roughly 200 GraphQL queries. The migration shipped over about a year
- Consolidated the frontend platform, merging two Next.js applications that lived in separate repositories into one
  - As part of it, the CSS library was reworked from Tailwind CSS to CSS Modules. I built an AST-based codemod that resolves what Tailwind would have produced and emits it as CSS Modules, migrating ~1,000 components with roughly 80% automation coverage
  - A compatibility-verification harness was set up alongside it so the migration could proceed safely, and it finished with zero migration-caused bugs
