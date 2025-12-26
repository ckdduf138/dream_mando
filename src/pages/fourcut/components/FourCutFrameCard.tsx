import { FourCutFrameConfig } from '@utils/fourcutFrames'

type Props = {
  frame: FourCutFrameConfig
  onSelect: (frameId: string) => void
}

const FourCutFrameCard = ({ frame, onSelect }: Props) => {
  return (
    <button
      onClick={() => onSelect(frame.id)}
      className="block text-left p-0 bg-transparent border-0 transition-transform active:scale-[0.99] [@media(hover:hover)]:hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2"
      aria-label={`${frame.name} 프레임 선택`}
    >
      <div className="mx-auto w-28 sm:w-full" style={{ aspectRatio: String(frame.aspectRatio) }}>
        <img src={frame.frameSrc} alt={frame.name + ' 프레임 미리보기'} className="block w-full h-full object-cover" />
      </div>
    </button>
  )
}

export default FourCutFrameCard
