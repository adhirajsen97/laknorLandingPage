import { useEffect, useRef, useState } from 'react'

const ScrollableFeatures = () => {
  const [visibleFeatures, setVisibleFeatures] = useState(new Set())
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const sectionRef = useRef(null)
  const mobileScrollRef = useRef(null)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const touchEndX = useRef(null)
  const touchEndY = useRef(null)
  const touchStartTime = useRef(null)
  const isDragging = useRef(false)
  
  // Simplified feature set - focusing on the most important ones
  const features = [
    {
      icon: "🔒",
      title: "Secure & Protected",
      description: "Advanced encryption ensures your health records remain completely private and protected at all times."
    },
    {
      icon: "📋",
      title: "Smart Organization", 
      description: "AI-powered categorization automatically organizes your medical documents by type, date, and relevance."
    },
    {
      icon: "⚡",
      title: "Instant Access",
      description: "Get your complete medical history in seconds, anywhere, anytime. Perfect for emergencies and appointments."
    },
    {
      icon: "👩‍⚕️",
      title: "Doctor Collaboration",
      description: "Securely share specific records with healthcare providers. Streamline consultations with encrypted sharing."
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "Native mobile apps with offline access. Your health records in your pocket, always available."
    },
    {
      icon: "✅",
      title: "Privacy Focused",
      description: "Built with privacy at its core. Your data stays protected with end-to-end encryption."
    }
  ]

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setVisibleFeatures(prev => new Set([...prev, index]))
          }
        })
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const featureElements = sectionRef.current?.querySelectorAll('.feature-item')
    featureElements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Mobile auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return

    const interval = setInterval(() => {
      setCurrentMobileSlide(prev => (prev + 1) % features.length)
    }, 4000) // Auto advance every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoScrolling, features.length])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
    touchStartTime.current = Date.now()
    isDragging.current = false
    setIsAutoScrolling(false) // Stop auto-scroll when user interacts
  }

  const handleTouchMove = (e) => {
    if (!touchStartX.current || !touchStartY.current) return
    
    touchEndX.current = e.targetTouches[0].clientX
    touchEndY.current = e.targetTouches[0].clientY
    
    const distanceX = Math.abs(touchStartX.current - touchEndX.current)
    const distanceY = Math.abs(touchStartY.current - touchEndY.current)
    
    // If horizontal movement is greater than vertical, prevent default scrolling
    if (distanceX > distanceY && distanceX > 10) {
      e.preventDefault()
      isDragging.current = true
    }
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !touchStartY.current || !touchEndY.current) return
    
    const distanceX = touchStartX.current - touchEndX.current
    const distanceY = touchStartY.current - touchEndY.current
    const absDistanceX = Math.abs(distanceX)
    const absDistanceY = Math.abs(distanceY)
    const touchDuration = Date.now() - touchStartTime.current
    
    // Calculate velocity (pixels per millisecond)
    const velocityX = absDistanceX / touchDuration
    const velocityY = absDistanceY / touchDuration
    
    // Minimum thresholds
    const minSwipeDistance = 30
    const minSwipeVelocity = 0.1
    const maxSwipeTime = 800
    
    // Check if this is primarily a horizontal swipe
    const isHorizontalSwipe = absDistanceX > absDistanceY && absDistanceX > minSwipeDistance
    const isFastEnough = velocityX > minSwipeVelocity || absDistanceX > 80
    const isQuickEnough = touchDuration < maxSwipeTime
    
    // Only process horizontal swipes that meet our criteria
    if (isHorizontalSwipe && isFastEnough && isQuickEnough) {
      const isLeftSwipe = distanceX > 0
      const isRightSwipe = distanceX < 0
      
      if (isLeftSwipe && currentMobileSlide < features.length - 1) {
        setCurrentMobileSlide(prev => prev + 1)
        // Add haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(50)
        }
      }
      if (isRightSwipe && currentMobileSlide > 0) {
        setCurrentMobileSlide(prev => prev - 1)
        // Add haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(50)
        }
      }
    }
    
    // Reset values
    touchStartX.current = null
    touchStartY.current = null
    touchEndX.current = null
    touchEndY.current = null
    touchStartTime.current = null
    isDragging.current = false

    // Resume auto-scroll after 8 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 8000)
  }

  const goToSlide = (index) => {
    setCurrentMobileSlide(index)
    setIsAutoScrolling(false)
    setTimeout(() => setIsAutoScrolling(true), 8000)
  }

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Why Choose CURALOG?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Experience the future of health record management with features designed 
            around security, simplicity, and your peace of mind.
          </p>
        </div>

        {/* Mobile Swipeable Features */}
        <div className="lg:hidden mb-6 sm:mb-8">
          <div 
            className="relative overflow-hidden rounded-2xl select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              touchAction: 'pan-y pinch-zoom',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
          >
            <div 
              className={`flex transition-transform duration-500 ease-out ${
                isDragging.current ? 'transition-none' : ''
              }`}
              style={{ 
                transform: `translateX(-${currentMobileSlide * 100}%)` 
              }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-primary-50 to-white p-6 sm:p-8 rounded-2xl border border-primary-100 shadow-lg h-72 sm:h-80 flex flex-col justify-center text-center">
                    {/* Icon */}
                    <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 transform transition-transform duration-300">
                      {feature.icon}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-primary-700">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg px-2 sm:px-0">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentMobileSlide 
                    ? 'bg-primary-600 w-6 sm:w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 flex items-center justify-center space-x-3 sm:space-x-4">
            {/* Left Arrow */}
            <button
              onClick={() => {
                if (currentMobileSlide > 0) {
                  setCurrentMobileSlide(prev => prev - 1)
                  setIsAutoScrolling(false)
                  setTimeout(() => setIsAutoScrolling(true), 8000)
                  if (navigator.vibrate) {
                    navigator.vibrate(50)
                  }
                }
              }}
              disabled={currentMobileSlide === 0}
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                currentMobileSlide === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50 active:scale-95'
              }`}
              aria-label="Previous feature"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="mx-1 sm:mx-2 text-xs sm:text-sm">Swipe to explore features</span>
            
            {/* Right Arrow */}
            <button
              onClick={() => {
                if (currentMobileSlide < features.length - 1) {
                  setCurrentMobileSlide(prev => prev + 1)
                  setIsAutoScrolling(false)
                  setTimeout(() => setIsAutoScrolling(true), 8000)
                  if (navigator.vibrate) {
                    navigator.vibrate(50)
                  }
                }
              }}
              disabled={currentMobileSlide === features.length - 1}
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                currentMobileSlide === features.length - 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50 active:scale-95'
              }`}
              aria-label="Next feature"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Features Grid */}
        <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`feature-item group transition-all duration-700 transform ${
                visibleFeatures.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:border-primary-300 hover:shadow-xl transition-all duration-300 h-full group-hover:-translate-y-2">
                {/* Icon */}
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Subtle accent line */}
                <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center space-x-2 text-primary-600 font-medium text-sm sm:text-base">
            <span>Building the future of health record management</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Background decoration - positioned behind content */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-100 to-transparent rounded-full opacity-30 -translate-y-32 translate-x-32 pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-100 to-transparent rounded-full opacity-30 translate-y-32 -translate-x-32 pointer-events-none -z-10"></div>
    </section>
  )
}

export default ScrollableFeatures 