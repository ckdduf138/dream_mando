import { useState } from 'react'
import ManduQuizModal from '@components/ManduQuizModal'
import Header from '@components/Header'
import Footer from '@components/Footer'
import HeroSection from '@pages/home/HeroSection'
import StorySection from '@pages/home/StorySection'
import CTASection from '@pages/home/CTASection'

export default function HomePage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-white">
      {false && <Header />}

      <main className="flex-grow text-xl">
        <HeroSection />
        <StorySection />
        <CTASection onStartQuiz={() => setIsQuizOpen(true)} />
      </main>

      {false && <Footer />}
      <ManduQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  )
}
