'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Tag,
  Twitter,
  X,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { useState, useCallback, useEffect } from 'react'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, closeLightbox, goToPrev, goToNext])

  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []

  
  const shareUrl = `${taskRoute}/${post.slug}`

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />

      <header className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
        <div className="absolute inset-0">
          <ContentImage src={images[0]} alt="" fill className="object-cover opacity-40 blur-[1px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.72)_0%,rgba(2,6,23,0.86)_55%,rgba(2,6,23,0.96)_100%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <Link href={taskRoute} className="hover:text-white">
              {taskLabel}
            </Link>
            <span className="text-white/45">/</span>
            <span className="text-white/85">{category || taskLabel}</span>
            {location ? (
              <>
                <span className="text-white/45">/</span>
                <span className="text-white/85">{location}</span>
              </>
            ) : null}
            <span className="text-white/45">/</span>
            <span className="text-white/85">This page</span>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">{post.title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          â† Back to {taskLabel}
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div
                className="relative h-[460px] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image, idx) => (
                    <div
                      key={image}
                      className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer"
                      onClick={() => openLightbox(idx + 1)}
                    >
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Overview</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{task === 'classified' ? 'Details' : `About this ${task}`}</h2>
              <div className="mt-4 text-sm leading-8 text-slate-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: description }} />
              {highlights.length ? (
                <div className="mt-7 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{category || taskLabel}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">{post.title}</h3>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-4 text-sm leading-8 text-slate-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: description }} />

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                {location ? (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    {location}
                  </span>
                ) : null}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                  <span className="font-semibold text-slate-950">Category</span>
                  <span className="text-slate-700">{category || taskLabel}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {email ? (
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                    <Mail className="h-4 w-4" /> E-mail
                  </a>
                ) : null}
                {phone ? (
                  <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">
                    <Phone className="h-4 w-4" /> {phone}
                  </a>
                ) : website ? (
                  <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">
                    <Globe className="h-4 w-4" /> Visit website <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Share</p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white hover:bg-slate-800"
                    aria-label="Share via email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-950 hover:bg-slate-200"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-950 hover:bg-slate-200"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-950 hover:bg-slate-200"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Contact</p>
              <div className="mt-5 grid gap-3">
                {location ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <MapPin className="h-4 w-4" /> {location}
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <Phone className="h-4 w-4" /> {phone}
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <Mail className="h-4 w-4" /> {email}
                  </div>
                ) : null}
                {website ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <Globe className="h-4 w-4" /> {website}
                  </div>
                ) : null}
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                </div>
                <iframe
                  src={mapEmbedUrl}
                  title={`${post.title} map`}
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </aside>
        </section>

        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            <button
              className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                  onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div
              className="relative h-[80vh] w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <ContentImage
                src={images[lightboxIndex]}
                alt={`Gallery image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                intrinsicWidth={1440}
                intrinsicHeight={900}
                priority
              />
            </div>

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                {lightboxIndex + 1} / {images.length}
              </div>
            )}
          </div>
        )}

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
