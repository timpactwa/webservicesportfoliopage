interface TeamMemberProps {
  name: string
  role: string
  school: string
  focus: string
  bio: string
  initials: string
  accentShape: 'circle' | 'square'
}

export default function TeamMember({ name, role, school, focus, bio, initials, accentShape }: TeamMemberProps) {
  return (
    <div>
      <div
        className={`w-24 h-24 md:w-32 md:h-32 bg-accent flex items-center justify-center mb-6 ${
          accentShape === 'circle' ? 'rounded-full' : ''
        }`}
      >
        <span className="text-white font-black text-4xl md:text-5xl">{initials}</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-charcoal mb-1">{name}</h3>
      <p className="text-accent font-bold text-sm uppercase tracking-widest mb-1">{role}</p>
      <p className="text-neutral-500 text-sm mb-4">
        {school} — {focus}
      </p>
      <p className="text-neutral-600 leading-relaxed">{bio}</p>
    </div>
  )
}
