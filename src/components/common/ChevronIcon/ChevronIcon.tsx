type ChevronIconProps = {
  direction: 'left' | 'right'
}

export function ChevronIcon({ direction }: ChevronIconProps) {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
      <path
        d={direction === 'left' ? 'M7 1 1 7l6 6' : 'm1 1 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}
