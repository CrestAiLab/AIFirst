import type { PageSection } from "@/lib/sanity/types"

/** Section order matches docs/initial_content.md: Background → Purpose → Why it Matters → Goals → Expected Outcomes, then community & insights. */
export function getDefaultSections(): PageSection[] {
  return [
    {
      _key: "default-hero",
      sectionType: "hero",
      enabled: true,
      hero: {
        badge: "Artificial Intelligence and Data Festival (AIDFest)",
        heading: "Artificial Intelligence and Data Festival. Data for AI in practice.",
        description:
          "One place to align on what \"good data\" means for AI: from labeling and evaluation sets to governance and production monitoring—so pilots turn into repeatable practice across teams and sectors.",
        primaryButton: "Get in touch",
        secondaryButton: "Events & insights",
        primaryButtonUrl: "/contact",
        secondaryButtonUrl: "/insights",
      },
    },
    {
      _key: "default-content-background",
      sectionType: "content",
      enabled: true,
      content: {
        title: "Background",
        lead:
          "Models get the headlines; data does the work. If the data is wrong, drifting, or locked away, the best model in the world will still fail in production.",
        body:
          "AI adoption increasingly depends on the quality, availability, and governability of data—not just the choice of model. A data-centric approach treats AI success as a lifecycle discipline: deliberately engineering training and operational data, building fit-for-purpose evaluation data, and maintaining data assets as systems evolve. That is the thread AIDFest pulls on—end to end, not just a one-off dataset handoff.",
        layout: "imageRight",
        imageUrl: "/images/aidfest-background.svg",
        imageAlt:
          "Diagram-style illustration of a data lifecycle: collect, label, evaluate, operate and maintain.",
      },
    },
    {
      _key: "default-content-purpose",
      sectionType: "content",
      enabled: true,
      content: {
        title: "Purpose of the Community Event",
        lead:
          "This is a working meeting, not a slide deck tour: compare notes, surface blockers, and leave with shared language and next steps.",
        body:
          "Bring together practitioners, solution builders, and government agencies to strengthen shared capability on data for AI—how to design, create, evaluate, govern, and continuously improve data assets that enable effective, reliable, and responsible AI in real operational settings. The event aims to move organizations beyond isolated pilots toward repeatable, scalable practices: fewer one-off demos, more documented pipelines, evaluation criteria, and governance that teams can actually run.",
        layout: "imageLeft",
        imageUrl: "/images/aidfest-purpose.svg",
        imageAlt:
          "Diagram of three groups—solution builders, practitioners, and agencies—connected to a shared hub for data-for-AI practice.",
      },
    },
    {
      _key: "default-cyberSecurity",
      sectionType: "cyberSecurity",
      enabled: true,
      cyberSecurity: {
        heading: "Why it Matters",
        description:
          "Model improvements alone rarely deliver durable value when data is incomplete, biased, drifting, inconsistently labeled, or constrained by governance and access barriers. Weak data practices can compound downstream issues, undermine performance, and increase operational and reputational risk—especially in high-stakes and regulated environments. At the same time, modern data scale requires balancing automation (to scale and standardize) with human expertise (to preserve meaning, context, and accountability).",
        buttonText: "Read the principles",
        features: [
          {
            title: "Data quality and drift",
            description:
              "Incomplete, biased, or drifting data undermines reliability when ground truth and operational inputs do not keep pace with change.",
          },
          {
            title: "Governance and access",
            description:
              "Constraints and access barriers must be navigated without freezing innovation in regulated or high-stakes settings.",
          },
          {
            title: "Automation and human oversight",
            description:
              "Scale with automation where it helps; preserve expert judgment where meaning, context, and accountability matter.",
          },
        ],
      },
    },
    {
      _key: "default-solutions",
      sectionType: "solutions",
      enabled: true,
      solutions: [
        {
          icon: "BookOpen",
          title: "Lifecycle playbook",
          description:
            'Create a shared "data for AI" lifecycle playbook with common vocabulary and reference practices spanning collection, labeling, preparation, evaluation data design, monitoring, and maintenance.',
        },
        {
          icon: "Users",
          title: "Cross-sector challenges",
          description:
            "Identify and prioritize cross-sector challenges that block AI adoption (data readiness, governance constraints, interoperability, workforce gaps, procurement and partnership needs).",
        },
        {
          icon: "Database",
          title: "Methods & robustness",
          description:
            "Exchange proven methods and tools for improving data quality, representativeness, and robustness, including testing for edge cases and distribution shifts.",
        },
        {
          icon: "Brain",
          title: "Collaboration mechanisms",
          description:
            "Establish collaboration mechanisms that connect agencies and practitioners for pilots, benchmarking, and reusable assets.",
        },
      ],
    },
    {
      _key: "default-content-outcomes",
      sectionType: "content",
      enabled: true,
      content: {
        title: "Expected Outcomes",
        lead: "Tangible outputs you can point to after the festival—not vague “alignment,” but artifacts and commitments.",
        body:
          "Each outcome below is something participants can co-own: a charter, a prioritized backlog, working groups, reusable templates, pilots with clear evaluation gates, playbooks for automation vs. human review, and a path to keep collaborating after the room clears.",
        items: [
          "A community charter with agreed scope, principles, and shared terminology for data-centric AI work.",
          'A prioritized backlog of real-world "data for AI" challenges contributed by participating agencies and practitioners.',
          "Working groups organized around high-impact themes (e.g., data readiness and governance, labeling and ground truth, evaluation data design, monitoring and maintenance).",
          "Reusable starter artifacts such as data readiness checklists, labeling guidelines, evaluation set design patterns, and monitoring metric templates.",
          "A small set of jointly defined pilot initiatives with clear problem statements, datasets (or data access pathways), evaluation criteria, and governance constraints documented up front.",
          'A practical set of "how-to" playbooks clarifying what to automate, where expert oversight is required, and how to operationalize continuous data improvement.',
          "A shared pathway for sustained collaboration (regular meetups, knowledge repository, and a mechanism to onboard new partners and contribute reusable assets).",
        ],
      },
    },
    {
      _key: "default-community",
      sectionType: "community",
      enabled: true,
      community: {
        heading: "Who the festival is for",
        description:
          "A community event for people who build, buy, regulate, or operate AI systems—and care that the data behind them is intentional, evaluable, and governable.",
        features: [
          {
            title: "Practitioners",
            description:
              "Engineers, data scientists, and operators improving training and operational data, evaluation sets, and monitoring in production.",
            icon: "Brain",
          },
          {
            title: "Solution builders",
            description:
              "Teams shipping platforms, tooling, and integrations that make data quality, labeling, and lifecycle practices repeatable at scale.",
            icon: "Zap",
          },
          {
            title: "Government agencies",
            description:
              "Public-sector partners aligning data readiness, interoperability, procurement, and responsible use in real operational settings.",
            icon: "Users",
          },
        ],
      },
    },
    {
      _key: "default-insights",
      sectionType: "insights",
      enabled: true,
      insights: {
        heading: "Resources & ongoing collaboration",
        description:
          "Follow updates on working groups, playbooks, pilots, and reusable artifacts—plus ways to stay involved after the event.",
        buttonText: "Browse insights",
      },
    },
    {
      _key: "default-sources",
      sectionType: "sources",
      enabled: true,
      sources: {
        heading: "Curated sources",
        description: "Recommended reading and listening.",
        buttonText: "Browse sources",
        buttonUrl: "/sources",
      },
    },
  ]
}
