---
company: Plaid, Inc.
startDate: "2022/02"
endDate: "2022/03"
position: Long-term Internship Student
role: Platform Engineer
technologies: ["TypeScript", "Rollup", "GitHub Actions"]
---

I focused on optimizing third-party scripts, which significantly improved user experience. The plugin system's architecture inherently supported small file sizes, but I took it further by implementing additional tuning that reduced the file size by over 5%. I achieved this by:
- Revisiting the transpiler targets for dependent libraries.
- Removing unnecessary polyfills.
- Refining and validating minifier settings.
- Restructuring the codebase to maximize tree-shaking and minification effectiveness.

To prevent future bloat, I also introduced a mechanism in our CI/CD pipeline to notify developers of file size changes, fostering a culture of file size awareness among the team.