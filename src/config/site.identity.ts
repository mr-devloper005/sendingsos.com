export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'gdh9licoul',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Sendingsos',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Premium classifieds',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A premium classified marketplace for browsing local posts, trusted offers, and curated updates.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'sendingsos.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sendingsos.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@sendingsos.com',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

