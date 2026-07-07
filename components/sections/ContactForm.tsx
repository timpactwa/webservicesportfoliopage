import CalendlyEmbed from '@/components/ui/CalendlyEmbed'

const calendlyUrl = 'https://calendly.com/wilkinsluke12/45min?hide_event_type_details=1&hide_gdpr_banner=1'

export default function ContactForm() {
  return (
    <section className="pt-10 pb-20 md:pt-16 md:pb-32 bg-white">
      <div className="container-studio">
        <div className="max-w-3xl mb-12">
          <h1 className="text-display-xl font-black text-charcoal mb-6">Book a Call.</h1>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Choose a time for a free consultation. We&apos;ll use the call to understand what you need and whether we can help.
          </p>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 11h14M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
            </svg>
            <p className="text-neutral-700 font-medium">
              Pick any available time from the calendar. You&apos;ll receive the meeting details after booking.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:renderlocalwebsites@gmail.com" className="text-neutral-700 font-medium hover:text-accent transition-colors">
              renderlocalwebsites@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-neutral-700 font-medium">Morris County, NJ</p>
          </div>
        </div>

        <div className="mt-12 max-w-3xl rounded-xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <h2 className="text-xl font-black text-charcoal mb-3">Not sure what you have ready?</h2>
          <p className="text-neutral-600 leading-relaxed mb-5">
            Bring whatever you&apos;ve got. A folder of photos, a rough sketch, a design you like, or
            just an idea in your head. We work from any starting point and help you through every
            stage, from first concept to launch.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Photos and images', 'Wireframes and sketches', 'Design concepts or examples', 'Just an idea works too'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-neutral-700">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 w-full max-w-[58rem]">
          <CalendlyEmbed url={calendlyUrl} />
          <p className="mt-3 text-center text-sm text-neutral-500">
            Prefer to book directly?{' '}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:text-accent-dark transition-colors"
            >
              Open Calendly ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
