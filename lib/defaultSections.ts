import type { PageSection } from "@/lib/sanity/types"

export function getDefaultSections(): PageSection[] {
  return [
    {
      _key: 'default-hero',
      sectionType: 'hero',
      enabled: true,
      hero: {
        badge: "Community Event",
        heading: "Artificial Intelligence and Data Festival",
        description: "Bring together practitioners, solution builders, and government agencies to strengthen shared capability on data for AI—how to design, create, evaluate, govern, and continuously improve data assets that enable effective, reliable, and responsible AI in real operational settings.",
        primaryButton: "Join the Community",
        secondaryButton: "Learn More",
      },
    },
    {
      _key: 'default-background',
      sectionType: 'content',
      enabled: true,
      content: {
        title: "Background",
        body: "AI adoption increasingly depends on the quality, availability, and governability of data—not just the choice of model. A data-centric approach treats AI success as a lifecycle discipline: deliberately engineering training and operational data, building fit-for-purpose evaluation data, and maintaining data assets as systems evolve.",
        layout: 'default',
      },
    },
    {
      _key: 'default-purpose',
      sectionType: 'content',
      enabled: true,
      content: {
        title: "Purpose of the Community Event",
        body: "Bring together practitioners, solution builders, and government agencies to strengthen shared capability on data for AI—how to design, create, evaluate, govern, and continuously improve data assets that enable effective, reliable, and responsible AI in real operational settings. The event aims to move organizations beyond isolated pilots toward repeatable, scalable practices.",
        layout: 'imageRight',
      },
      showMore: {
        enabled: true,
        text: "Explore more",
        linkType: 'internal',
        internalPage: '/insights',
      },
    },
    {
      _key: 'default-why-matters',
      sectionType: 'content',
      enabled: true,
      content: {
        title: "Why it Matters",
        body: "Model improvements alone rarely deliver durable value when data is incomplete, biased, drifting, inconsistently labeled, or constrained by governance and access barriers. Weak data practices can compound downstream issues, undermine performance, and increase operational and reputational risk—especially in high-stakes and regulated environments. At the same time, modern data scale requires balancing automation (to scale and standardize) with human expertise (to preserve meaning, context, and accountability).",
        layout: 'default',
      },
    },
    {
      _key: 'default-goals',
      sectionType: 'content',
      enabled: true,
      content: {
        title: "Goals",
        items: [
          "Create a shared \"data for AI\" lifecycle playbook with common vocabulary and reference practices spanning collection, labeling, preparation, evaluation data design, monitoring, and maintenance.",
          "Identify and prioritize cross-sector challenges that block AI adoption (data readiness, governance constraints, interoperability, workforce gaps, procurement and partnership needs).",
          "Exchange proven methods and tools for improving data quality, representativeness, and robustness, including testing for edge cases and distribution shifts.",
          "Establish collaboration mechanisms that connect agencies and practitioners for pilots, benchmarking, and reusable assets.",
        ],
        layout: 'default',
      },
    },
    {
      _key: 'default-outcomes',
      sectionType: 'content',
      enabled: true,
      content: {
        title: "Expected Outcomes",
        items: [
          "A community charter with agreed scope, principles, and shared terminology for data-centric AI work.",
          "A prioritized backlog of real-world \"data for AI\" challenges contributed by participating agencies and practitioners.",
          "Working groups organized around high-impact themes (e.g., data readiness and governance, labeling and ground truth, evaluation data design, monitoring and maintenance).",
          "Reusable starter artifacts such as data readiness checklists, labeling guidelines, evaluation set design patterns, and monitoring metric templates.",
          "A small set of jointly defined pilot initiatives with clear problem statements, datasets (or data access pathways), evaluation criteria, and governance constraints documented up front.",
          "A practical set of \"how-to\" playbooks clarifying what to automate, where expert oversight is required, and how to operationalize continuous data improvement.",
          "A shared pathway for sustained collaboration (regular meetups, knowledge repository, and a mechanism to onboard new partners and contribute reusable assets).",
        ],
        layout: 'default',
      },
    },
    {
      _key: 'default-insights',
      sectionType: 'insights',
      enabled: true,
      insights: {
        heading: "Latest insights",
        description: "Stay ahead with industry trends and expert perspectives",
        buttonText: "View All",
      },
    },
    {
      _key: 'default-cta',
      sectionType: 'cta',
      enabled: true,
      cta: {
        heading: "Join the Community",
        description: "Connect with practitioners, solution builders, and government agencies working on data for AI",
        buttonText: "Get Started",
        disclaimer: "Open to all practitioners and organizations interested in data-centric AI",
      },
    },
  ]
}

