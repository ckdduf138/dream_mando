type Props = {
  count: number
  selectedIndex: number
  onSelect: (index: number) => void
}

const FourCutSlotPicker = ({ count, selectedIndex, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: count }).map((_, idx) => {
        const active = idx === selectedIndex
        return (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={
              'rounded-xl border px-2 py-2 text-lg font-bold active:scale-95 ' +
              (active
                ? 'border-primary-400 bg-primary-50 text-primary-900'
                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50')
            }
          >
            {idx + 1}
          </button>
        )
      })}
    </div>
  )
}

export default FourCutSlotPicker
