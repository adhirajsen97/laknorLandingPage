import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      
      // Calculate how much of the page has been scrolled
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100
      
      // Show button when user has scrolled 80% of the page
      const shouldShow = scrollPercentage >= 80
      
      setIsVisible(shouldShow)
    }

    const handleScroll = () => {
      toggleVisibility()
    }

    window.addEventListener('scroll', handleScroll)
    toggleVisibility() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    setIsAnimating(true)
    
    // Haptic feedback for mobile
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(30)
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    // Reset animation state after scroll completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-4 right-4 z-40 
        w-10 h-10 sm:w-11 sm:h-11
        bg-primary-600/40 hover:bg-primary-600/60 
        backdrop-blur-sm
        text-white rounded-full shadow-sm hover:shadow-md
        transition-all duration-300 ease-out
        transform hover:scale-105 active:scale-95
        flex items-center justify-center
        border border-white/10
        ${isAnimating ? 'animate-pulse' : ''}
        ${isVisible ? 'translate-y-0 opacity-80' : 'translate-y-8 opacity-0'}
      `}
      aria-label="Scroll to top"
    >
      <svg 
        className={`
          w-4 h-4 sm:w-5 sm:h-5 
          transition-transform duration-300
          ${isAnimating ? 'scale-110' : ''}
        `} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d="M5 15l7-7 7 7" 
        />
      </svg>
    </button>
  )
}

export default ScrollToTop 