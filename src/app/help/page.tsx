import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const topics = [
  {
    title: 'Getting Started',
    description: 'Set up your account, complete your profile, and publish your first listing, classified, or article.',
    href: '/register',
    cta: 'Create account',
  },
  {
    title: 'Classifieds & Listings',
    description: 'Post local offers, update pricing, choose categories, and keep your business details accurate.',
    href: '/classifieds',
    cta: 'Open classifieds',
  },
]

const helpFaqs = [
  {
    id: 'publish-post',
    question: 'How do I publish a post on this website?',
    answer:
      'Go to Create, choose the page type (Classified, Listing, Article, Image, or Bookmark), fill in title, category, and details, then submit. Your post will appear under the matching page section.',
  },
  {
    id: 'category-filter',
    question: 'How do category filters work on pages like Classifieds?',
    answer:
      'Use the category dropdown on the page header and apply the filter. The page updates using URL query params, so you can share the filtered view link directly.',
  },
  {
    id: 'edit-content',
    question: 'Can I update my listing, ad, or article later?',
    answer:
      'Yes. Open your dashboard, find the item in its section (Ads, Listings, or Articles), then edit details such as title, description, category, contact info, and media.',
  },
  {
    id: 'contact-display',
    question: 'How do I show correct contact details on detail pages?',
    answer:
      'Add valid email, phone, address, and website fields while creating or editing the post. These fields are used to render contact blocks and action buttons on detail pages.',
  },
  {
    id: 'support-route',
    question: 'Where can I get support if a page is not loading correctly?',
    answer:
      'Use the Contact Support button on this page and share the exact page URL, what you expected, and any error shown. This helps resolve issues much faster.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Find practical guides for key website pages: classifieds, listings, articles, profile, and bookmarks."
      actions={
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className="border-border bg-card transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{topic.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
                <Link href={topic.href} className="mt-4 inline-flex text-sm font-medium text-foreground hover:underline">
                  {topic.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">FAQ</h3>
            <Accordion type="single" collapsible className="mt-4">
              {helpFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
