import type { Metadata } from 'next'
import Link from 'next/link'
import GuideLayout from '@/components/ui/GuideLayout'
import Button from '@/components/ui/Button'
import { NOT_A_FIT } from '@/lib/data'

const PATH = '/guides/choosing-a-web-designer-morris-county'
const TITLE = 'How to Choose a Web Designer in Morris County'

const description =
  'Seven questions that separate a good web designer from a bad one, whoever you end up hiring, plus an honest section on when Render is not the right fit.'

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

export default function ChoosingAWebDesignerGuide() {
  return (
    <GuideLayout title={TITLE} description={description} path={PATH} datePublished="2026-07-09" dateLabel="July 2026">
      <p className="text-graphite-soft leading-relaxed mb-5">
        Hiring a web designer is confusing on purpose. Pricing hides behind &ldquo;contact us for
        a quote.&rdquo; Every portfolio looks the same after the third one. Everyone claims to be
        fast, affordable, and easy to work with, and none of that actually tells you anything.
      </p>
      <p className="text-graphite-soft leading-relaxed mb-5">
        This guide is not a pitch for Render, even though we&apos;re the ones writing it.
        It&apos;s the list of questions we think you should ask any web designer or agency before
        you sign anything, us included. Ask them in order. The answers will tell you more about
        who you&apos;re hiring than any portfolio ever will.
      </p>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        1. Do they publish their pricing, or does every answer require a sales call?
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-5">
        Hidden pricing usually means pricing that flexes based on what they think you&apos;ll
        pay, not what the work actually costs. A designer willing to publish real numbers, even a
        range, is telling you they&apos;ve done the math and aren&apos;t sizing you up first.
      </p>
      <p className="text-graphite-soft leading-relaxed mb-5">
        If every question gets &ldquo;let&apos;s hop on a call to talk about it,&rdquo; that&apos;s
        a sales process, not a pricing process. A short call to scope something genuinely custom
        is normal. Radio silence on price until you&apos;re already on the phone is not.
      </p>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        2. Who actually builds your site, the person selling it or someone you never meet?
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-5">
        At a lot of agencies, the friendly salesperson who takes you to lunch is not the person
        who touches your code. Your project gets handed off to a subcontractor or an offshore
        team you never speak with, and the person you trust becomes a relay between you and the
        actual work.
      </p>
      <p className="text-graphite-soft leading-relaxed mb-5">
        Ask directly: &ldquo;Who is building this, and will I talk to them?&rdquo; A good answer
        names a person. A bad answer describes a &ldquo;team&rdquo; or a &ldquo;process&rdquo; and
        changes the subject.
      </p>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        3. Do you own the site when it&apos;s done?
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-5">
        Domain registration, hosting accounts, and source code can all get parked on the
        agency&apos;s own accounts instead of yours, which quietly locks you in. Ask upfront who
        owns the domain, who holds the hosting login, and whether you get the actual files when
        the project wraps.
      </p>
      <p className="text-graphite-soft leading-relaxed mb-5">
        If a designer hedges, or says something like &ldquo;you don&apos;t need to worry about
        that,&rdquo; worry about that. Ownership should be a one-sentence answer, not a
        conversation.
      </p>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        4. What happens if you don&apos;t like the first design?
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-5">
        Ask this before you pay anything. Some shops require a deposit before you see a single
        mockup, which means you&apos;re gambling on taste before you&apos;ve seen any actual work.
      </p>
      <p className="text-graphite-soft leading-relaxed mb-5">
        A trustworthy process shows you a first design direction before real money changes hands,
        and lets you walk away if it&apos;s wrong. Watch for vague reassurances like &ldquo;we&apos;ll
        work with you&rdquo; that never actually say what happens to your deposit if the design
        misses.
      </p>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        5. Is the timeline accountable?
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-5">
        &ldquo;Six to eight weeks&rdquo; means nothing without a start condition. Ask what
        actually starts the clock (a signed contract, delivered content) and who is expected to
        hand over what, and when.
      </p>
      <p className="text-graphite-soft leading-relaxed mb-5">
        A good designer can tell you exactly what they&apos;re waiting on from you at any point
        in the project. A bad one blames &ldquo;the queue&rdquo; or goes quiet for weeks at a
        stretch, and you only find out the project stalled when you ask.
      </p>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        6. Can you click their work, or only see screenshots?
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-5">
        Screenshots hide a lot: broken links, pages that never actually load fast, a site that
        technically launched but nobody visits anymore. Ask for live, working links you can open
        on your own phone right now.
      </p>
      <p className="text-graphite-soft leading-relaxed mb-5">
        If a portfolio is all static images or a permanent &ldquo;coming soon&rdquo; demo,
        that&apos;s a portfolio of promises, not proof. Real work holds up under a real click.
      </p>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        7. What does the monthly fee actually cover, and can you leave?
      </h2>
      <p className="text-graphite-soft leading-relaxed mb-5">
        Plenty of agencies bundle hosting, vague &ldquo;maintenance,&rdquo; and a long contract
        into one number designed to be hard to unwind. Ask exactly what the monthly fee includes,
        whether it&apos;s month to month, and what happens to your site if you cancel.
      </p>
      <p className="text-graphite-soft leading-relaxed mb-5">
        If leaving means losing your own website, that&apos;s not a maintenance plan. That&apos;s
        a website held hostage with a service fee attached.
      </p>

      {/* Copy lives in lib/data.ts because the homepage pricing section says the same
          thing. One wording, two places, so they can never drift apart. */}
      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">{NOT_A_FIT.headline}</h2>
      <p className="text-graphite-soft leading-relaxed mb-5">{NOT_A_FIT.intro}</p>
      {NOT_A_FIT.cases.map((item) => (
        <p key={item.title} className="text-graphite-soft leading-relaxed mb-5">
          <strong className="font-semibold text-graphite">{item.title}.</strong> {item.body}
        </p>
      ))}
      <p className="text-graphite-soft leading-relaxed mb-5">{NOT_A_FIT.closing}</p>

      <h2 className="text-2xl font-semibold text-graphite mt-10 mb-4">
        How Render answers these seven questions
      </h2>
      <ul className="space-y-3 mb-5">
        <li className="text-graphite-soft leading-relaxed">
          <span className="font-semibold text-graphite">Pricing:</span> published on the site,
          right now, before you ever talk to us.
        </li>
        <li className="text-graphite-soft leading-relaxed">
          <span className="font-semibold text-graphite">Who builds it:</span> Tim, every time.
          Computer Science, Virginia Tech, and it&apos;s his name on the work.
        </li>
        <li className="text-graphite-soft leading-relaxed">
          <span className="font-semibold text-graphite">Ownership:</span> yours. Domain, content,
          and code, once the project is paid.
        </li>
        <li className="text-graphite-soft leading-relaxed">
          <span className="font-semibold text-graphite">First design:</span> on us. If it isn&apos;t
          right, you walk away and no deposit is taken.
        </li>
        <li className="text-graphite-soft leading-relaxed">
          <span className="font-semibold text-graphite">Timeline:</span> 2 to 4 weeks once we
          have your content and direction, and we tell you exactly what we&apos;re waiting on.
        </li>
        <li className="text-graphite-soft leading-relaxed">
          <span className="font-semibold text-graphite">Portfolio:</span> live demos you can
          click, not screenshots. See{' '}
          <Link href="/work" className="text-accent font-semibold hover:underline">
            the work
          </Link>
          .
        </li>
        <li className="text-graphite-soft leading-relaxed">
          <span className="font-semibold text-graphite">Monthly fee:</span> optional, month to
          month, covering hosting support, small updates, and fixes. Cancel anytime.
        </li>
      </ul>
      <p className="text-graphite-soft leading-relaxed mb-5">
        Ask us these questions. Ask the next designer you talk to the same ones. If you want a
        straight answer on what your project would actually cost, see{' '}
        <Link href="/services/web-design" className="text-accent font-semibold hover:underline">
          our web design pricing
        </Link>{' '}
        or get a free estimate below.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row mt-10">
        <Button variant="primary" size="lg" href="/estimate">
          Get a Free Estimate
        </Button>
        <Button variant="secondary" size="lg" href="/contact">
          Request a Call
        </Button>
      </div>
    </GuideLayout>
  )
}
