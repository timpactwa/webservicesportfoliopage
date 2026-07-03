export default function SectionLabel({
  index,
  label,
  className = 'text-prussian',
}: {
  index: string
  label: string
  className?: string
}) {
  return (
    <div className={`dim-line max-w-md mx-auto ${className}`}>
      <span className="dim-tick" />
      <span className="font-mono text-xs uppercase tracking-[0.25em] whitespace-nowrap">
        {index} · {label}
      </span>
      <span className="dim-tick" />
    </div>
  )
}
