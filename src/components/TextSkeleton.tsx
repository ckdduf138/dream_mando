type Props = {
  lines: Array<number>
  className?: string
  lineClassName?: string
}

export const TextSkeleton = ({ lines, className, lineClassName }: Props) => {
  const baseLineClass = lineClassName ?? 'h-6 rounded-lg bg-primary-100/70'

  return (
    // Use inline elements so this component can be placed inside headings / paragraphs
    <span className={className ?? ''} aria-hidden>
      <span className="inline-block space-y-2 animate-pulse">
        {lines.map((widthPct, idx) => (
          <span
            key={idx}
            className={`${baseLineClass} block`}
            style={{ width: `${widthPct}%` }}
          />
        ))}
      </span>
    </span>
  )
}
