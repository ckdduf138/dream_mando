type Props = {
  lines: Array<number>
  className?: string
  lineClassName?: string
}

export const TextSkeleton = ({ lines, className, lineClassName }: Props) => {
  const baseLineClass = lineClassName ?? 'h-6 rounded-lg bg-primary-100/70'

  return (
    <div className={className ?? ''}>
      <div className="space-y-2 animate-pulse">
        {lines.map((widthPct, idx) => (
          <div
            key={idx}
            className={baseLineClass}
            style={{ width: `${widthPct}%` }}
          />
        ))}
      </div>
    </div>
  )
}
