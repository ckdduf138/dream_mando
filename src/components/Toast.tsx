type ToastProps = {
  open: boolean
  message: string
}

export default function Toast({ open, message }: ToastProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={
        'fixed left-1/2 bottom-5 z-50 -translate-x-1/2 px-4 pointer-events-none w-full max-w-md'
      }
    >
      <div
        className={
          `mx-auto w-fit max-w-full rounded-2xl border border-neutral-800 bg-neutral-900/90 px-4 py-2.5 text-neutral-50 text-xl shadow-sm ` +
          `transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`
        }
      >
        {message}
      </div>
    </div>
  )
}
