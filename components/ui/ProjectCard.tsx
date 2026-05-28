interface ProjectCardProps {
  projectName: string
  category: string
  description?: string
  gradientFrom: string
  gradientTo: string
  isComingSoon?: boolean
  demoUrl?: string
  onOpenDemo?: () => void
}

export default function ProjectCard({
  projectName,
  category,
  description,
  gradientFrom,
  gradientTo,
  isComingSoon = true,
  demoUrl,
  onOpenDemo,
}: ProjectCardProps) {
  if (demoUrl && onOpenDemo) {
    return (
      <div className="group cursor-pointer h-full" onClick={onOpenDemo}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1B2E]">
          <iframe
            src={demoUrl}
            className="absolute top-0 left-0 border-0 pointer-events-none select-none"
            style={{
              width: '1280px',
              height: '960px',
              transform: 'scale(0.297)',
              transformOrigin: 'top left',
            }}
            scrolling="no"
            tabIndex={-1}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#1B1B2E] text-sm font-bold px-5 py-2.5 flex items-center gap-2">
              Preview Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <span className="bg-[#E63946] text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest">
              Live Demo
            </span>
          </div>
        </div>
        <div className="px-4 pt-4 pb-5">
          <p className="text-accent font-bold text-xs uppercase tracking-widest mb-1">{category}</p>
          <h3 className="text-lg font-black text-[#0F0F0F] mb-1">{projectName}</h3>
          {description && (
            <p className="text-sm text-neutral-500 leading-snug">{description}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="group h-full">
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${gradientFrom} ${gradientTo} overflow-hidden`}>
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="200" cy="150" r="120" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="150" r="80" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="150" r="40" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="150" r="10" fill="white" opacity="0.5" />
        </svg>
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      <div className="px-4 pt-4 pb-5">
        <p className="text-accent font-bold text-xs uppercase tracking-widest mb-1">{category}</p>
        <h3 className="text-lg font-black text-[#0F0F0F]">{projectName}</h3>
      </div>
    </div>
  )
}
