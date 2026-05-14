import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark, ArrowRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteIdentity } from '@/config/site.identity'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

const tone = {
  shell: 'bg-[linear-gradient(180deg,#fff8f2_0%,#f7ebe1_100%)] text-[#452829]',
  panel: 'border border-[#d8c7bc] bg-[#fffaf7] shadow-[0_24px_70px_rgba(69,40,41,0.08)]',
  soft: 'border border-[#e1d0c3] bg-[#f7ebe1]',
  muted: 'text-[#6c5c58]',
  action: 'bg-[#452829] text-[#fff8f3] hover:bg-[#5a3a3b]',
  actionAlt: 'border border-[#d8c7bc] bg-transparent text-[#452829] hover:bg-[#f7ebe1]',
  badge: 'bg-[#452829] text-[#fff8f3]',
}

const contactEmail = siteIdentity.contactEmail

const lanes = [
  { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
  { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
  { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a766e]">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#452829]">Get in touch with the right lane.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.</p>

            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5 text-[#452829]" />
                  <h2 className="mt-3 text-xl font-semibold text-[#452829]">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>

            <div className={`mt-8 rounded-[1.8rem] p-6 ${tone.panel}`}>
              <div className="flex items-center gap-3">
                <div className={`inline-flex items-center justify-center rounded-full ${tone.badge} h-10 w-10`}>
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a766e]">Email us directly</p>
                  <p className="mt-1 text-lg font-semibold text-[#452829]">{contactEmail}</p>
                </div>
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className={`mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${tone.action}`}
              >
                <Mail className="h-4 w-4" />
                Send email
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-semibold text-[#452829]">Send a message</h2>
            <p className={`mt-2 text-sm ${tone.muted}`}>Or drop us a message and we will get back to you.</p>
            <ContactLeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
