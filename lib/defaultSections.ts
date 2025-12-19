import type { PageSection } from "@/lib/sanity/types"

export function getDefaultSections(): PageSection[] {
  return [
    {
      _key: 'default-hero',
      sectionType: 'hero',
      enabled: true,
      hero: {
        badge: "Empowering tomorrow's infrastructure today",
        heading: "Build the future with AI-powered infrastructure",
        description: "Transform your operations with cutting-edge AI solutions. Join a global community of innovators building scalable, intelligent infrastructure.",
        primaryButton: "Start Building",
        secondaryButton: "Watch Demo",
      },
    },
    {
      _key: 'default-stats',
      sectionType: 'stats',
      enabled: true,
      stats: [
        {
          value: "500K+",
          label: "Active Users",
          description: "Professionals worldwide trust our platform",
        },
        {
          value: "99.9%",
          label: "Uptime",
          description: "Industry-leading reliability",
        },
        {
          value: "150+",
          label: "Countries",
          description: "Global reach and impact",
        },
        {
          value: "10M+",
          label: "API Calls",
          description: "Processed daily across infrastructure",
        },
      ],
    },
    {
      _key: 'default-solutions',
      sectionType: 'solutions',
      enabled: true,
      solutions: [
        {
          icon: "Brain",
          title: "AI-Powered Analytics",
          description: "Harness the power of machine learning to gain actionable insights from your infrastructure data in real-time.",
        },
        {
          icon: "Cloud",
          title: "Cloud Infrastructure",
          description: "Scalable, resilient cloud solutions designed for the modern enterprise. Deploy anywhere, scale infinitely.",
        },
        {
          icon: "Database",
          title: "Data Management",
          description: "Intelligent data orchestration and management systems that grow with your business needs.",
        },
        {
          icon: "Zap",
          title: "Automation",
          description: "Streamline operations with intelligent automation that learns and adapts to your workflow patterns.",
        },
      ],
    },
    {
      _key: 'default-community',
      sectionType: 'community',
      enabled: true,
      community: {
        heading: "Join a thriving community of innovators",
        description: "Connect with like-minded professionals, share knowledge, and collaborate on groundbreaking projects. Our community is where innovation happens.",
        buttonText: "Join Community",
        features: [
          {
            icon: "Users",
            title: "Global Network",
            description: "Connect with 500K+ professionals",
          },
          {
            icon: "MessageSquare",
            title: "Discussions",
            description: "Join expert-led conversations",
          },
          {
            icon: "BookOpen",
            title: "Resources",
            description: "Access exclusive learning materials",
          },
          {
            icon: "Calendar",
            title: "Events",
            description: "Attend workshops and webinars",
          },
        ],
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
        heading: "Ready to transform your infrastructure?",
        description: "Join thousands of forward-thinking companies building the future with AI-powered solutions",
        buttonText: "Get Started",
        disclaimer: "No credit card required • Free 14-day trial",
      },
    },
  ]
}

