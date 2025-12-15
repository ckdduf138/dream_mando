export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm font-medium text-neutral-900">
            꿈꿀만두
          </span>
          
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a 
              href="https://instagram.com/dreaming_mandu" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors"
            >
              Instagram
            </a>
            <a href="#" className="hover:text-neutral-900 transition-colors">
              이용약관
            </a>
            <a href="#" className="hover:text-neutral-900 transition-colors">
              개인정보
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
