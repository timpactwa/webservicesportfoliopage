interface ProjectCardProps {
  projectName: string
  category: string
  gradientFrom: string
  gradientTo: string
  isComingSoon?: boolean
  href?: string
}

export default function ProjectCard({
  projectName,
  category,
  gradientFrom,
  gradientTo,
  isComingSoon = true,
}: ProjectCardProps) {
  return (
    <div className="group">
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
      <div className="pt-4">
        <p className="text-accent font-bold text-xs uppercase tracking-widest mb-1">{category}</p>
        <h3 className="text-lg font-black text-[#0F0F0F]">{projectName}</h3>
      </div>
    </div>
  )
}
