import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

// Default sections data
const defaultSections = [
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  console.error('Please add it to your .env.local file:')
  console.error('NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function seedSanity() {
  try {
    console.log('🌱 Seeding Sanity with default page content...')

    // Check if pageContent already exists
    const existing = await client.fetch(`*[_type == "pageContent"][0]`)

    if (existing) {
      console.log('📄 Page Content already exists. Updating with default sections...')
      
      // Update existing document
      await client
        .patch(existing._id)
        .set({
          title: 'Home Page',
          sections: defaultSections,
        })
        .commit()

      console.log('✅ Successfully updated Page Content with default sections!')
    } else {
      console.log('📝 Creating new Page Content document...')
      
      // Create new document
      await client.create({
        _type: 'pageContent',
        title: 'Home Page',
        sections: defaultSections,
      })

      console.log('✅ Successfully created Page Content with default sections!')
    }

    console.log('\n🎉 Done! Your home page is now editable in Sanity Studio.')
    console.log('👉 Visit http://localhost:3000/studio to edit your content')
  } catch (error) {
    console.error('❌ Error seeding Sanity:', error)
    process.exit(1)
  }
}

seedSanity()

