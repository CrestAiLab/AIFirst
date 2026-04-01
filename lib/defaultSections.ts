import type { PageSection } from "@/lib/sanity/types"

export function getDefaultSections(): PageSection[] {
  return [
    {
      _key: 'default-hero',
      sectionType: 'hero',
      enabled: true,
      hero: {
        badge: "Next-Gen AI Platform",
        heading: "AI Infrastructure Made Simple. Zero to Production in Minutes.",
        description: "From students to enterprise researchers—we provide the Dagster orchestration, Vector/Graph databases, and RAG support so you can focus on the work that matters.",
        primaryButton: "Book a Consultation",
        secondaryButton: "Explore the Knowledge Hub",
        primaryButtonUrl: "/contact",
        secondaryButtonUrl: "/insights",
      },
    },
    {
      _key: 'default-stats',
      sectionType: 'stats',
      enabled: true,
      stats: [
        { value: "10k+", label: "Network Size", description: "Active users globally" },
        { value: "500+", label: "Projects Hosted", description: "Deployed in production" },
        { value: "5 mins", label: "Setup Time Saved", description: "From 5 Days to 5 Minutes" },
      ]
    },
    {
      _key: 'default-solutions',
      sectionType: 'solutions',
      enabled: true,
      solutions: [
        { icon: "Database", title: "Vector Databases", description: "One-click deployment of Milvus and Qdrant clusters tailored for high scale." },
        { icon: "Network", title: "Graph RAG", description: "Pre-configured Neo4j and LlamaIndex templates for structured reasoning." },
        { icon: "GitMerge", title: "Dagster Orchestration", description: "Production-ready data pipelines to keep your AI context fresh." },
        { icon: "Shield", title: "AI Scanning Tools", description: "Automated vulnerability checks and red-teaming utilities baked in." }
      ]
    },
    {
      _key: 'default-cyberSecurity',
      sectionType: 'cyberSecurity',
      enabled: true,
      cyberSecurity: {
        heading: "AI-Powered Security Scan Tool",
        description: "Continuous vulnerability scanning for your entire infrastructure stack and RAG components. Deep defense mechanics out-of-the-box.",
        buttonText: "Run Diagnostics",
        features: [
          { title: "Prompt Injection Defense", description: "Automatic adversarial prompt detection." },
          { title: "Vector DB Access Control", description: "Granular tenant isolation." },
          { title: "Vulnerability Scanning", description: "Automated container scanning and dependency audits." }
        ]
      }
    },
    {
      _key: 'default-community',
      sectionType: 'community',
      enabled: true,
      community: {
        heading: "Learning & Development Pathways",
        description: "Choose your journey and start building with enterprise-grade infrastructure today.",
        features: [
          { title: "Students", description: "Start your AI Journey (Zero Background Required).", icon: "GraduationCap" },
          { title: "Tech Enthusiasts", description: "Optimize & Build with our Infrastructure.", icon: "Terminal" },
          { title: "Businesses", description: "Consulting & Enterprise Scaling.", icon: "Building" }
        ]
      }
    },
    {
      _key: 'default-insights',
      sectionType: 'insights',
      enabled: true,
      insights: {
        heading: "Latest Insights & Discussion",
        description: "Join the conversation on #RAG, #CyberSecurity, and orchestration best practices.",
        buttonText: "Join Forum",
      },
    },
  ]
}

