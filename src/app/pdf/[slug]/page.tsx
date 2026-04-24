import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FileText, Download, ChevronLeft, BookOpen } from 'lucide-react'

import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3

export async function generateStaticParams() {
  const posts = await fetchTaskPosts('pdf', 50)
  if (!posts.length) {
    return [{ slug: 'placeholder' }]
  }
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  try {
    const post = await fetchTaskPostBySlug('pdf', resolvedParams.slug)
    return post ? await buildPostMetadata('pdf', post) : await buildTaskMetadata('pdf')
  } catch (error) {
    console.warn('PDF metadata lookup failed', error)
    return await buildTaskMetadata('pdf')
  }
}

export default async function PdfDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  let post = null
  try {
    post = await fetchTaskPostBySlug('pdf', resolvedParams.slug)
  } catch (error) {
    console.warn('PDF detail lookup failed', error)
  }
  if (!post) {
    notFound()
  }

  const content = post.content && typeof post.content === 'object' ? post.content : {}
  const contentAny = content as Record<string, unknown>
  const fileUrl =
    (typeof contentAny.fileUrl === 'string' && contentAny.fileUrl) ||
    (typeof contentAny.pdfUrl === 'string' && contentAny.pdfUrl) ||
    ''

  if (!fileUrl || !/^https?:\/\//i.test(fileUrl)) {
    notFound()
  }

  const viewerUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const category = typeof contentAny.category === 'string' ? contentAny.category : ''
  const related = (await fetchTaskPosts('pdf', 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!category) return true
      const itemContent = item.content && typeof item.content === 'object' ? item.content : {}
      const itemCategory = typeof (itemContent as Record<string, unknown>).category === 'string' ? (itemContent as Record<string, unknown>).category : ''
      return itemCategory === category
    })
    .slice(0, 3)

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'PDF Library',
        item: `${baseUrl}/pdf`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/pdf/${post.slug}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbf4ec_0%,#f3e8df_48%,#ecddd1_100%)] text-[#452829]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        <Link href="/pdf" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#6c5c58] hover:text-[#452829]">
          <ChevronLeft className="h-4 w-4" />
          Back to PDF Library
        </Link>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-[2.25rem] border border-[#d8c7bc] bg-[#fffaf7] p-6 shadow-[0_24px_70px_rgba(69,40,41,0.08)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#452829] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fff8f3]">
                  <FileText className="h-3.5 w-3.5" />
                  PDF
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a766e]">{category || 'Document'}</span>
              </div>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{post.title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[#6c5c58]">
                A document-first layout with a lighter reference rail and a more premium reading frame.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#452829] px-5 py-3 text-sm font-semibold text-[#fff8f3] hover:bg-[#5a3436]">
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
                <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-[#d8c7bc] bg-[#fffaf7] px-5 py-3 text-sm font-semibold text-[#452829] hover:bg-[#efe3da]">
                  Search archive
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Format', 'Reference file'],
                ['Reading mode', 'Viewer + archive'],
                ['Priority', 'Utility first'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.35rem] border border-[#d8c7bc] bg-[#fffaf7] p-4 shadow-[0_14px_38px_rgba(69,40,41,0.06)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a766e]">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-[#452829]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2.4rem] border border-[#d8c7bc] bg-[#fffaf7] shadow-[0_24px_70px_rgba(69,40,41,0.08)]">
              <div className="flex items-center justify-between border-b border-[#e4d4c9] px-6 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a766e]">Viewer</p>
                  <p className="mt-1 text-sm text-[#6c5c58]">Embedded document preview</p>
                </div>
                <BookOpen className="h-5 w-5 text-[#452829]" />
              </div>
              <iframe src={viewerUrl} title={post.title} className="h-[78vh] w-full border-0" />
            </div>

            <div className="rounded-[2rem] border border-[#d8c7bc] bg-[#fffaf7] p-6 shadow-[0_20px_54px_rgba(69,40,41,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a766e]">Reading notes</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {['Tighter document framing', 'Cleaner metadata row', 'Fewer visual distractions', 'Better archive scanning'].map((item) => (
                  <div key={item} className="rounded-[1.1rem] border border-[#e3d1c5] bg-[#f7ebe1] px-4 py-4 text-sm text-[#5f514d]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-[#d8c7bc] pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a766e]">More like this</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Related PDFs in the archive.</h2>
              </div>
              <Link href="/pdf" className="text-sm font-semibold text-[#452829] hover:opacity-80">
                View all
              </Link>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={buildPostUrl('pdf', item.slug)} taskKey="pdf" />
              ))}
            </div>
            <nav className="mt-6 rounded-[1.75rem] border border-[#d8c7bc] bg-[#fffaf7] p-5 shadow-[0_20px_54px_rgba(69,40,41,0.08)]">
              <p className="text-sm font-semibold text-[#452829]">Related links</p>
              <ul className="mt-2 space-y-2 text-sm text-[#6c5c58]">
                {related.map((item) => (
                  <li key={`related-${item.id}`}>
                    <Link href={buildPostUrl('pdf', item.slug)} className="hover:text-[#452829] hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/pdf" className="hover:text-[#452829] hover:underline">
                    Browse all PDFs
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
