---
company: Plaid, Inc.
startDate: "2022/04"
endDate: "2023/12"
position: Part-time employee
technologies: ["TypeScript", "Rollup", "Playwright", "GitHub Actions", "CloudFlare Workers"]
role: Platform Engineer
---

I conducted a Proof of Concept (PoC) for an on-request build foundation for 3rd party scripts. The content of these scripts, delivered via Plaid, varied based on customer settings. While previously built whenever customer settings changed, I leveraged Edge Computing to enable on-request builds and cache them on the CDN. This approach allowed for rapid reflection of customer configurations, simplified the system, and achieved faster loading times. My work involved running web application bundlers and compilers on Cloudflare Workers, optimizing them for low memory consumption and high speed within the CDN environment.

I also led the establishment of an on-browser/QA testing foundation. The complex build system for our 3rd party scripts made it difficult to test their functionality holistically or in real environments. Given their direct impact on customer business, high SLOs were required, leading to a "release phobia" due to the difficulty of testing and the severe consequences of failures. To overcome this, I built a robust testing foundation. First, I streamlined the complex build system. Then, I developed a framework where customer configurations could be defined as JSON within test scenarios. This allowed scripts to be built during tests and validated directly in a browser using Playwright, enabling continuous and automated testing of critical functionalities in a realistic environment, thereby enhancing application stability.

Furthermore, I contributed to building the QA testing foundation. By utilizing VCL within the Fastly CDN layer, I developed a mechanism that allowed us to redirect scripts to a development environment via cookie-based control, directly on the actual homepages of customers who had implemented our 3rd party script. This enabled real-world QA testing, making it easier to identify and resolve issues that only occurred in specific environments or usage patterns. These initiatives significantly boosted the application's reliability.
Finally, I automated our deployment flow. The complexity of our build process meant the deployment flow was equally intricate, requiring all components to be deployed to update the service. Furthermore, deployment targets were managed across disparate repositories, necessitating complex cross-repository modifications and resulting in high operational costs. Recognizing that these tasks were entirely automatable, I implemented CI/CD-driven automation. This transformed a nearly 10-minute manual release process into a one-click operation, vastly improving field operations.