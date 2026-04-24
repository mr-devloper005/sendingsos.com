import type { TaskKey } from './site-config'
import type { SitePost } from './site-connector'

type MockSeed = {
  title: string
  category: string
  summary: string
  location: string
  website?: string
  phone?: string
  email?: string
  address?: string
  price?: number | string
  priceRange?: string
  condition?: string
  highlights?: string[]
}

const taskSeeds: Record<TaskKey, string> = {
  listing: 'listing',
  classified: 'classified',
  article: 'article',
  image: 'image',
  profile: 'profile',
  social: 'social',
  pdf: 'pdf',
  org: 'org',
  sbm: 'sbm',
  comment: 'comment',
}

const taskSummaries: Record<TaskKey, string> = {
  listing: 'Verified local business with complete contact details and service context.',
  classified: 'Live marketplace post with price, location, and quick response details.',
  article: 'Editorial piece with practical advice and a polished reading rhythm.',
  image: 'Visual story with a premium gallery feel and lighter supporting copy.',
  profile: 'Identity-first profile for a business, creator, or agency.',
  social: 'Short community update with clear context and a conversational tone.',
  pdf: 'Document-style resource for downloads, guides, and reference material.',
  org: 'Organization surface with brand and team context.',
  sbm: 'Curated bookmark entry with resource context and link value.',
  comment: 'Response post with perspective and discussion value.',
}

const taskTitles: Record<TaskKey, MockSeed[]> = {
  listing: [
    {
      title: 'Oak & Elm Workspace',
      category: 'Coworking',
      summary: 'Private cabins, day passes, and meeting rooms for small teams.',
      location: 'Bengaluru, India',
      address: '12 Indiranagar Main Road, Bengaluru 560038',
      priceRange: 'Starts at INR 7,500/month',
      website: 'https://example.com/oak-elm',
      phone: '+91 98765 32100',
      highlights: ['Daily passes', 'Conference room', 'Reception support'],
    },
    {
      title: 'Mint Street Dental Studio',
      category: 'Healthcare',
      summary: 'General dentistry, whitening, and family care in a calm neighborhood clinic.',
      location: 'Chennai, India',
      address: '44 Mint Street, Chennai 600003',
      website: 'https://example.com/mint-dental',
      phone: '+91 98840 55440',
      priceRange: 'Consultation INR 600',
      highlights: ['Digital X-ray', 'Emergency slots', 'Family care'],
    },
    {
      title: 'Northshore Hardware & Tools',
      category: 'Retail',
      summary: 'Local hardware counter for repairs, fittings, and weekend projects.',
      location: 'Pune, India',
      address: '18 FC Road, Pune 411004',
      website: 'https://example.com/northshore-tools',
      phone: '+91 98220 41010',
      priceRange: 'Open daily',
      highlights: ['Paint matching', 'Door fittings', 'Delivery available'],
    },
    {
      title: 'Studio Nine Photography',
      category: 'Creative Services',
      summary: 'Portrait, product, and event coverage with same-week turnaround.',
      location: 'New Delhi, India',
      address: '91 Hauz Khas Village, New Delhi 110016',
      website: 'https://example.com/studio-nine',
      phone: '+91 98110 90234',
      priceRange: 'Packages from INR 8,000',
      highlights: ['Portraits', 'Product shoots', 'Event coverage'],
    },
    {
      title: 'Harbor Slice Pizza Bar',
      category: 'Food & Drink',
      summary: 'Small-batch dough, seasonal toppings, and dine-in / takeaway service.',
      location: 'Mumbai, India',
      address: '7 Carter Road, Bandra West, Mumbai 400050',
      website: 'https://example.com/harbor-slice',
      phone: '+91 97731 22099',
      priceRange: 'Meals for two INR 1,200',
      highlights: ['Dine-in', 'Takeaway', 'Late night kitchen'],
    },
  ],
  classified: [
    {
      title: 'Used iPhone 15 Pro - 256GB',
      category: 'Electronics',
      summary: 'One-year-old device, excellent condition, battery health at 92%, original box included.',
      location: 'Delhi NCR',
      price: 'INR 74,000',
      condition: 'like-new',
      phone: '+91 98100 44556',
      highlights: ['No scratches', 'Original charger', 'Pickup preferred'],
    },
    {
      title: '2BHK Flat for Rent in Indiranagar',
      category: 'Real Estate',
      summary: 'Semi-furnished apartment with parking, modular kitchen, and quick access to metro.',
      location: 'Bengaluru, India',
      address: 'Indiranagar, Bengaluru 560038',
      price: 'INR 38,000/month',
      condition: 'new',
      phone: '+91 98450 11020',
      highlights: ['Semi-furnished', 'Parking included', 'Near metro'],
    },
    {
      title: 'Hiring: Frontend Developer - Remote',
      category: 'Jobs',
      summary: 'We are looking for a React and Next.js developer with a strong eye for layout and performance.',
      location: 'Remote - India',
      website: 'https://example.com/careers/frontend-developer',
      email: 'jobs@example.com',
      price: 'INR 18-24 LPA',
      highlights: ['Remote role', 'React + Next.js', 'Premium products'],
    },
    {
      title: 'Weekend Wedding Photography Package',
      category: 'Services',
      summary: 'Candid photography, edited album, and fast preview gallery for small events.',
      location: 'Jaipur, India',
      price: 'INR 22,000',
      condition: 'good',
      phone: '+91 98291 77110',
      highlights: ['8 hours coverage', 'Edited gallery', 'Album add-on'],
    },
    {
      title: 'Office Chairs - 12 Available',
      category: 'Furniture',
      summary: 'Ergonomic task chairs from a closed workspace, in good condition, bulk preferred.',
      location: 'Hyderabad, India',
      price: 'INR 4,500 each',
      condition: 'good',
      phone: '+91 90003 55118',
      highlights: ['Bulk lot', 'Pickup only', 'Negotiable'],
    },
  ],
  article: [
    {
      title: 'How Classified Sites Win on Trust',
      category: 'Marketplace',
      summary: 'A practical look at photos, descriptions, and contact clarity that make posts feel credible.',
      location: 'Editorial Desk',
    },
    {
      title: 'Writing Better Listings in Five Minutes',
      category: 'Content Ops',
      summary: 'A lightweight checklist for titles, calls to action, and local details that matter.',
      location: 'Editorial Desk',
    },
    {
      title: 'The Premium Utility Trend',
      category: 'Design',
      summary: 'Why warmer palettes and stronger spacing are replacing generic classifieds UI.',
      location: 'Editorial Desk',
    },
    {
      title: 'Local Search Behavior in 2026',
      category: 'SEO',
      summary: 'How users compare offers, scan location cues, and decide who to contact first.',
      location: 'Editorial Desk',
    },
    {
      title: 'Marketplace Copy That Converts',
      category: 'Growth',
      summary: 'Simple patterns for making offers easier to read on mobile screens.',
      location: 'Editorial Desk',
    },
  ],
  image: [
    {
      title: 'Coffee Counter at Golden Hour',
      category: 'Hospitality',
      summary: 'Warm interiors, subtle light, and a storefront that feels easy to walk into.',
      location: 'Mumbai, India',
    },
    {
      title: 'Warehouse Forklift Detail',
      category: 'Operations',
      summary: 'A practical close-up showing tools, logistics, and industrial utility.',
      location: 'Noida, India',
    },
    {
      title: 'Founder Portrait Session',
      category: 'Profile',
      summary: 'A polished studio portrait with clear brand identity cues.',
      location: 'Bengaluru, India',
    },
    {
      title: 'Neighborhood Storefronts',
      category: 'Local',
      summary: 'Street-level retail moments that give classifieds a grounded, human feel.',
      location: 'Kolkata, India',
    },
    {
      title: 'Minimal Desk Setup',
      category: 'Workspace',
      summary: 'A clean visual for offices, listings, and creative services.',
      location: 'Pune, India',
    },
  ],
  profile: [
    {
      title: 'Aisha Khan - Property Consultant',
      category: 'Real Estate',
      summary: 'Specializes in premium rentals, quick response, and transparent listings.',
      location: 'Delhi, India',
      website: 'https://example.com/aisha-khan',
    },
    {
      title: 'Studio North - Creative Agency',
      category: 'Agency',
      summary: 'A small team helping local brands launch, list, and look premium.',
      location: 'Mumbai, India',
      website: 'https://example.com/studio-north',
    },
    {
      title: 'Rohan Patel - Vehicle Broker',
      category: 'Automotive',
      summary: 'Buys and sells verified used cars with inspection reports.',
      location: 'Ahmedabad, India',
      website: 'https://example.com/rohan-patel',
    },
    {
      title: 'Maya Desai - Events Photographer',
      category: 'Services',
      summary: 'Event and product photography with same-week delivery.',
      location: 'Jaipur, India',
      website: 'https://example.com/maya-desai',
    },
    {
      title: 'Northwind Repairs',
      category: 'Home Services',
      summary: 'Trusted local repair and maintenance profile for small jobs.',
      location: 'Hyderabad, India',
      website: 'https://example.com/northwind-repairs',
    },
  ],
  social: [
    {
      title: 'New category pages are live',
      category: 'Community',
      summary: 'We just published a fresh batch of listings and classifieds with cleaner filters.',
      location: 'Platform Update',
    },
    {
      title: 'Partner spotlight: local studios',
      category: 'Updates',
      summary: 'Three neighborhood creatives joined the marketplace this week.',
      location: 'Platform Update',
    },
    {
      title: 'Weekend inventory refresh',
      category: 'News',
      summary: 'More rental posts, service offers, and second-hand items are now live.',
      location: 'Platform Update',
    },
    {
      title: 'Looking for camera gear',
      category: 'Community',
      summary: 'A buyer is searching for a used Sony A7 or equivalent kit in good condition.',
      location: 'Platform Update',
    },
    {
      title: 'Seller onboarding tips',
      category: 'Insights',
      summary: 'Short reminder: add a price, location, and one clear photo to improve replies.',
      location: 'Platform Update',
    },
  ],
  pdf: [
    {
      title: 'Local SEO Playbook',
      category: 'Guides',
      summary: 'A practical guide for improving local visibility on directory-style platforms.',
      location: 'Downloadable resource',
    },
    {
      title: 'Marketplace UX Guide',
      category: 'Design',
      summary: 'Patterns for trustworthy product cards, filters, and contact-first layouts.',
      location: 'Downloadable resource',
    },
    {
      title: 'Seller Intake Template',
      category: 'Templates',
      summary: 'A simple form to capture title, price, location, and contact details.',
      location: 'Downloadable resource',
    },
    {
      title: 'Pricing Sheet for Services',
      category: 'Operations',
      summary: 'A reference sheet for quoting services consistently across categories.',
      location: 'Downloadable resource',
    },
    {
      title: 'Listing Quality Checklist',
      category: 'Checklist',
      summary: 'A quick review sheet to make sure each post is ready for the public feed.',
      location: 'Downloadable resource',
    },
  ],
  org: [
    {
      title: 'Northwind Collective',
      category: 'Agency',
      summary: 'A local group managing listings, launches, and partner pages.',
      location: 'India',
    },
    {
      title: 'Brightline Media',
      category: 'Studio',
      summary: 'Brand content and photography for local businesses.',
      location: 'India',
    },
    {
      title: 'Atlas Labs',
      category: 'Network',
      summary: 'Product and engineering services for marketplace products.',
      location: 'India',
    },
    {
      title: 'Cobalt Studio',
      category: 'Collective',
      summary: 'Creative partners with a clean, service-first approach.',
      location: 'India',
    },
    {
      title: 'Zenith Partners',
      category: 'Business',
      summary: 'Operations support and local growth consulting.',
      location: 'India',
    },
  ],
  sbm: [
    {
      title: 'SEO Checklist 2026',
      category: 'Resources',
      summary: 'A saved reference for improving titles, snippets, and discoverability.',
      location: 'Bookmark library',
    },
    {
      title: 'Directory Growth Tactics',
      category: 'Strategies',
      summary: 'A shortlist of tactics for increasing quality submissions and replies.',
      location: 'Bookmark library',
    },
    {
      title: 'Outreach Email Templates',
      category: 'Templates',
      summary: 'Copy-paste drafts for lead generation and seller follow-up.',
      location: 'Bookmark library',
    },
    {
      title: 'Local Listing Audit',
      category: 'Audits',
      summary: 'A saved audit guide for cleaning up weak or incomplete listings.',
      location: 'Bookmark library',
    },
    {
      title: 'Marketplace Trust Signals',
      category: 'Research',
      summary: 'Research links on how photos, proof, and response speed affect trust.',
      location: 'Bookmark library',
    },
  ],
  comment: [
    {
      title: 'Reply: Better Photos Win Replies',
      category: 'Opinion',
      summary: 'A short comment on why clear images matter more than long descriptions.',
      location: 'Discussion thread',
    },
    {
      title: 'Commentary: Price Clarity Matters',
      category: 'Feedback',
      summary: 'Why posts with obvious pricing get more serious contacts.',
      location: 'Discussion thread',
    },
    {
      title: 'Thread: Response Time Tips',
      category: 'Discussion',
      summary: 'A quick note on answering buyers fast and setting expectations early.',
      location: 'Discussion thread',
    },
    {
      title: 'Hot Take: Simpler Filters Convert',
      category: 'Debate',
      summary: 'A point of view on keeping marketplace filters clear and compact.',
      location: 'Discussion thread',
    },
    {
      title: 'Reply: Location Is the First Trust Signal',
      category: 'Feedback',
      summary: 'A discussion note about why city and area details should appear early.',
      location: 'Discussion thread',
    },
  ],
}

const randomFrom = (items: string[], index: number) => items[index % items.length]

const buildImage = (task: TaskKey, index: number) => `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`

const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  return taskTitles[task].map((seed, index) => {
    const slug = normalizeSlug(seed.title)
    const price = typeof seed.price === 'number' ? String(seed.price) : seed.price

    return {
      id: `${task}-mock-${index + 1}`,
      title: seed.title,
      slug,
      summary: seed.summary || taskSummaries[task],
      content: {
        type: task,
        category: seed.category,
        location: seed.location,
        address: seed.address,
        website: seed.website,
        phone: seed.phone,
        email: seed.email,
        description: seed.summary || taskSummaries[task],
        price,
        priceRange: seed.priceRange,
        condition: seed.condition,
        highlights: seed.highlights || [
          randomFrom(['Fast replies', 'Trusted contact', 'Local pickup', 'Verified details'], index),
          randomFrom(['Mobile friendly', 'Premium placement', 'Clear pricing', 'Short listing'], index + 1),
        ],
      },
      media: [{ url: buildImage(task, index), type: 'IMAGE' }],
      tags: [task, seed.category],
      authorName: 'Sendingsos Desk',
      publishedAt: new Date().toISOString(),
    }
  })
}
