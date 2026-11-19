const HEART_PATH =
  'M0.6 3.518C0.6 2.929 0.769 2.354 1.084 1.869C1.399 1.384 1.846 1.012 2.366 0.801C2.885 0.591 3.453 0.552 3.994 0.689C4.535 0.827 5.024 1.135 5.396 1.573C5.422 1.603 5.453 1.627 5.489 1.643C5.524 1.659 5.562 1.667 5.6 1.667C5.638 1.667 5.676 1.659 5.712 1.643C5.747 1.627 5.778 1.603 5.805 1.573C6.175 1.133 6.664 0.822 7.206 0.682C7.748 0.543 8.317 0.581 8.838 0.792C9.358 1.003 9.806 1.377 10.121 1.864C10.436 2.351 10.603 2.928 10.6 3.518C10.6 4.729 9.85 5.633 9.1 6.427L6.354 9.237C6.261 9.35 6.146 9.441 6.017 9.504C5.888 9.566 5.748 9.599 5.606 9.6C5.464 9.601 5.324 9.57 5.194 9.509C5.065 9.448 4.949 9.359 4.854 9.247L2.1 6.427C1.35 5.633 0.6 4.734 0.6 3.518Z'

type HeartIconProps = {
  filled: boolean
  size: number
}

export function HeartIcon({ filled, size }: HeartIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 11.2 10.2" aria-hidden>
      <path
        d={HEART_PATH}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
