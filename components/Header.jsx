import { useState, useEffect, useRef } from 'react'

const Header = () => {
  const [activeItem, setActiveItem] = useState('home')
  const squircleRef = useRef(null)
  const navItemsRef = useRef({})

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
      action: () => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'features',
      label: 'Features',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
      action: () => {
        const featuresSection = document.querySelector('[data-section="features"]') || 
                               document.getElementById('features') ||
                               document.querySelector('section:nth-of-type(3)')
        featuresSection?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'about',
      label: 'About',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
      action: () => {
        const aboutSection = document.querySelector('[data-section="how-it-works"]') || 
                            document.getElementById('how-it-works') ||
                            document.querySelector('section:nth-of-type(4)')
        aboutSection?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  ]

  const moveSquircleToIcon = (targetId, rotation) => {
    const targetElement = navItemsRef.current[targetId]
    const squircle = squircleRef.current
    
    if (!targetElement || !squircle) return

    // Force a reflow to ensure DOM is updated
    targetElement.offsetHeight

    // Get the container (nav-wrapper) bounds
    const container = targetElement.closest('.nav-wrapper')
    if (!container) return

    // Use relative positioning to the container
    const containerRect = container.getBoundingClientRect()
    const iconRect = targetElement.getBoundingClientRect()

    // Calculate responsive squircle size (same as CSS)
    const isSmallScreen = window.innerWidth < 640
    const squircleSize = isSmallScreen ? 40 : 48 // w-10 h-10 = 40px, sm:w-12 sm:h-12 = 48px

    // Calculate precise center position
    const iconCenterX = iconRect.left - containerRect.left + iconRect.width / 2
    const iconCenterY = iconRect.top - containerRect.top + iconRect.height / 2

    const leftPosition = iconCenterX - (squircleSize / 2)
    const topPosition = iconCenterY - (squircleSize / 2)

    // Apply positioning with immediate transform update
    squircle.style.left = `${leftPosition}px`
    squircle.style.top = `${topPosition}px`
    squircle.style.transform = `rotate(${rotation}deg)`
    
    // Force immediate repaint for fast switching
    squircle.offsetHeight
  }

  const handleItemClick = (item) => {
    setActiveItem(item.id)
    
    const rotations = { home: 180, features: 360, about: 540 }
    
    // Use requestAnimationFrame to ensure DOM is updated before positioning
    requestAnimationFrame(() => {
      moveSquircleToIcon(item.id, rotations[item.id])
    })
    
    item.action()
  }

  // Scroll detection to update active item automatically
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home', element: document.getElementById('hero') },
        { id: 'features', element: document.getElementById('features') },
        { id: 'about', element: document.getElementById('how-it-works') }
      ]

      // Get current scroll position
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Check if we're near the bottom of the page (within 200px)
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 200

      // If near bottom, always highlight the last section
      if (isNearBottom) {
        if (activeItem !== 'about') {
          setActiveItem('about')
          const rotations = { home: 180, features: 360, about: 540 }
          requestAnimationFrame(() => {
            moveSquircleToIcon('about', rotations.about)
          })
        }
        return
      }

      // Normal scroll detection with adjusted thresholds
      const scrollCenter = scrollPosition + windowHeight / 3 // Changed from /2 to /3 for earlier detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const offsetTop = section.element.offsetTop
          const offsetBottom = offsetTop + section.element.offsetHeight
          
          // Special handling for the last section (how-it-works)
          if (section.id === 'about') {
            // Activate "about" when we're 70% into the previous section or any part of how-it-works is visible
            const featuresSection = sections.find(s => s.id === 'features')?.element
            if (featuresSection) {
              const featuresBottom = featuresSection.offsetTop + featuresSection.offsetHeight
              const aboutThreshold = featuresSection.offsetTop + (featuresSection.offsetHeight * 0.7)
              
              if (scrollCenter >= aboutThreshold || scrollPosition + windowHeight > offsetTop + 100) {
                if (activeItem !== section.id) {
                  setActiveItem(section.id)
                  const rotations = { home: 180, features: 360, about: 540 }
                  requestAnimationFrame(() => {
                    moveSquircleToIcon(section.id, rotations[section.id])
                  })
                }
                break
              }
            }
          } else {
            // Normal detection for other sections
            if (scrollCenter >= offsetTop && scrollCenter < offsetBottom) {
              if (activeItem !== section.id) {
                setActiveItem(section.id)
                const rotations = { home: 180, features: 360, about: 540 }
                requestAnimationFrame(() => {
                  moveSquircleToIcon(section.id, rotations[section.id])
                })
              }
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeItem])

  useEffect(() => {
    // Initial positioning on mount
    const timer = setTimeout(() => {
      moveSquircleToIcon('home', 180)
    }, 100)

    const handleResize = () => {
      const rotations = { home: 180, features: 360, about: 540 }
      moveSquircleToIcon(activeItem, rotations[activeItem])
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Separate effect to handle activeItem changes for resize events only
  useEffect(() => {
    const handleResize = () => {
      const rotations = { home: 180, features: 360, about: 540 }
      requestAnimationFrame(() => {
        moveSquircleToIcon(activeItem, rotations[activeItem])
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeItem])

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  <circle cx="12" cy="8" r="2" fill="currentColor" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">LAKNOR</span>
          </div>

          <div className="relative">
            <div className="nav-wrapper relative flex space-x-4 sm:space-x-8">
              {navItems.map((item) => (
                <div key={item.id} className="nav-item">
                  <button
                    ref={(el) => navItemsRef.current[item.id] = el}
                    onClick={() => handleItemClick(item)}
                    className={`icon-wrapper p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                      activeItem === item.id 
                        ? 'text-white scale-110' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </button>
                </div>
              ))}
            </div>
            
            <div
              ref={squircleRef}
              id="squircle"
              className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-xl transition-all duration-500 ease-in-out"
              style={{
                transform: 'rotate(180deg)',
                left: '0px',
                top: '0px',
                zIndex: -1,
                willChange: 'transform'
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 