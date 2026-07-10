import type { Metadata } from 'next'
import Link from 'next/link'
import GuideLayout from '@/components/ui/GuideLayout'
import Button from '@/components/ui/Button'

const PATH = '/guides/local-seo-checklist'
const TITLE = 'The Local SEO Checklist for Morris County Businesses'

const description =
  'A step-by-step, no-gate checklist you can run yourself to show up when local customers search for what you do, plus which parts Render handles for you.'

export const metadata: Metadata = {
  title: TITLE,
  description,
  openGraph: {
    title: `${TITLE} | Render`,
    description,
  },
  alternates: {
    canonical: PATH,
  },
}

export default function LocalSeoChecklistGuide() {
  return (
    <GuideLayout title={TITLE} description={description} path={PATH} datePublished="2026-07-09" dateLabel="July 2026">
      <p className="text-graphite-soft leading-relaxed mb-5">
        This is a checklist, not a sales pitch. Every item below is something you can do
        yourself, today, without hiring anyone. It&apos;s the same groundwork we set up for every
        Render client, laid out here so you can run it on your own site right now.
      </p>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        1. Claim and complete your Google Business Profile
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-4">
        This is the single highest-leverage thing on this list. Most local searches show your
        Google Business Profile before they ever reach your website.
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-5 text-graphite-soft">
        <li>Claim your listing at Google Business Profile if you haven&apos;t already, and verify it.</li>
        <li>Pick the most accurate primary category, and add relevant secondary categories.</li>
        <li>Keep your hours current, including holiday hours.</li>
        <li>Add real photos: your storefront, your team, your actual work.</li>
        <li>Set your service area accurately if you travel to customers instead of a fixed location.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        2. Keep your name, address, and phone number identical everywhere
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-4">
        Search engines cross-check your listings against each other. Mismatched details erode
        trust and rankings even when everything else about your site is right.
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-5 text-graphite-soft">
        <li>Check how your business appears on Google, Yelp, Facebook, Apple Maps, and any industry directories.</li>
        <li>
          Match the exact spelling, abbreviations, and punctuation across every listing
          (&ldquo;St&rdquo; versus &ldquo;Street&rdquo; matters).
        </li>
        <li>Fix or merge duplicate listings whenever you find them.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        3. Ask every happy customer for a Google review, and reply to all of them
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-4">
        Reviews are both a ranking signal and the first thing a prospective customer actually
        reads before they call.
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-5 text-graphite-soft">
        <li>Ask right after a good interaction, while it&apos;s still fresh.</li>
        <li>Send a direct link to your review page so leaving one takes a single tap.</li>
        <li>Reply to every review, good and bad. A calm, specific reply to a bad review often matters more than the review itself.</li>
        <li>Never buy or fake reviews. It is against Google&apos;s policies and it is easy to spot.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        4. One page per service you offer, named plainly
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-4">
        A single page trying to rank for five different services usually ends up ranking for
        none of them.
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-5 text-graphite-soft">
        <li>List every distinct service you offer.</li>
        <li>Give each one its own page with a plain, descriptive name, not a clever one.</li>
        <li>Avoid burying every service on a single vague &ldquo;Services&rdquo; page with a paragraph each.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        5. Put your town and service in page titles
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-4">
        This is one of the fastest wins on this whole list, and it costs nothing but a few
        minutes to fix.
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-5 text-graphite-soft">
        <li>Write each page title as what you do plus where you do it, for example &ldquo;Plumbing Repair in Randolph, NJ.&rdquo;</li>
        <li>Do the same in the meta description.</li>
        <li>Skip keyword stuffing. One clear mention reads better than five awkward ones, to people and to search engines.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        6. Make it fast and mobile-first
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-4">
        Speed is both a ranking factor and a conversion factor. A slow site loses search
        position and impatient visitors at the same time.
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-5 text-graphite-soft">
        <li>Run your site through Google&apos;s free PageSpeed Insights tool and read what it flags.</li>
        <li>Compress images before uploading them. Oversized photo files are the most common slowdown.</li>
        <li>Test the real site on your own phone on a normal connection, not just a desktop browser.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        7. Answer real customer questions on your site
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-4">
        A real FAQ section answers the exact questions that would otherwise cost you a phone
        call, and it gives search engines specific, quotable content tied to your business.
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-5 text-graphite-soft">
        <li>Write down the questions you actually get asked on the phone or in person.</li>
        <li>Turn the most common ones into a real FAQ section, in plain language.</li>
        <li>Match the wording customers use, not internal jargon.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        8. Basic schema and structured data so search engines understand you
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-4">
        Structured data is invisible to visitors but readable to search engines, which makes it
        one of the more overlooked items on this list.
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-5 text-graphite-soft">
        <li>Add LocalBusiness structured data with your name, address, phone number, and hours.</li>
        <li>Add more specific schema where it applies, such as your services or reviews.</li>
        <li>This does not change what visitors see. It helps search engines read your site correctly.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        9. Set up Google Analytics or at least Search Console
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-4">
        You cannot improve what you cannot see, and both of these are free.
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-5 text-graphite-soft">
        <li>At minimum, verify your site in Google Search Console. It is free and shows you what people actually search to find you.</li>
        <li>Add Google Analytics if you want a fuller picture of traffic and behavior.</li>
        <li>Check one of them monthly. Data you never look at does not help you.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        What we do versus what you can DIY
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-5">
        Everything above is genuinely doable yourself, with time. Every Render build ships items
        4 through 9 as standard, already built in, not billed separately. We can also handle
        items 1 through 3 as part of ongoing local SEO work if you&apos;d rather not manage
        listings and reviews yourself every week.
      </p>
      <p className="text-graphite-soft leading-relaxed mb-5">
        Want the full breakdown of what&apos;s included?{' '}
        <Link href="/services/local-seo" className="text-accent font-semibold hover:underline">
          See our local SEO service
        </Link>
        , or get a free estimate for your business below.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row mt-10">
        <Button variant="primary" size="lg" href="/estimate">
          Get a Free Estimate
        </Button>
        <Button variant="secondary" size="lg" href="/contact">
          Book a Free Call
        </Button>
      </div>
    </GuideLayout>
  )
}
