import * as S from './SegmentTabs.styles'

export type SegmentTabItem<T extends string> = {
  value: T
  label: string
}

type SegmentTabsProps<T extends string> = {
  items: readonly SegmentTabItem<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel?: string
}

export function SegmentTabs<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
}: SegmentTabsProps<T>) {
  return (
    <S.List role="tablist" aria-label={ariaLabel}>
      {items.map((item) => {
        const isActive = item.value === value
        return (
          <S.Tab
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            $active={isActive}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </S.Tab>
        )
      })}
    </S.List>
  )
}
