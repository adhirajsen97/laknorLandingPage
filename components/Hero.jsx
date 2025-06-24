import { useState, useRef } from 'react'
import React from 'react'

// A/B Testing Configuration
const VARIANTS = {
  headlines: [
    () => (
      <React.Fragment>
        Never <span className="relative text-teal-700 font-bold"><span className="absolute inset-0 bg-teal-100/60 rounded-lg -z-10 transform -skew-y-1"></span>Lose</span> a Medical Record <span className="relative text-purple-700 font-bold"><span className="absolute inset-0 bg-purple-100/60 rounded-lg -z-10 transform skew-y-1"></span>Again</span>
      </React.Fragment>
    ),
    () => (
      <React.Fragment>
        Your Health History, <span className="relative text-blue-700 font-bold"><span className="absolute inset-0 bg-blue-100/60 rounded-lg -z-10 transform -skew-y-1"></span>Safely</span> in One Place
      </React.Fragment>
    ), 
    () => (
      <React.Fragment>
        Take <span className="relative text-green-700 font-bold"><span className="absolute inset-0 bg-green-100/60 rounded-lg -z-10 transform skew-y-1"></span>Control</span> of Your Medical Past and Present
      </React.Fragment>
    )
  ],
  subheadlines: [
    () => (
      <React.Fragment>
        We're building a platform to help you <span className="relative font-semibold text-gray-800"><span className="absolute inset-0 bg-gray-200/40 rounded-md -z-10"></span>scan, store, and share</span> your health documents securely. <span className="relative text-teal-700 font-medium"><span className="absolute inset-0 bg-teal-100/40 rounded-md -z-10"></span>Join our waitlist</span> to get early access.
      </React.Fragment>
    ),
    () => (
      <React.Fragment>
        Currently in development: A secure platform for managing your medical records with <span className="relative font-semibold text-purple-700"><span className="absolute inset-0 bg-purple-100/40 rounded-md -z-10"></span>ease and privacy</span>. Be among the first to experience it.
      </React.Fragment>
    ),
    () => (
      <React.Fragment>
        We're creating the future of health record management with <span className="relative font-semibold text-blue-700"><span className="absolute inset-0 bg-blue-100/40 rounded-md -z-10"></span>end-to-end encryption</span> and <span className="relative font-semibold text-green-700"><span className="absolute inset-0 bg-green-100/40 rounded-md -z-10"></span>offline access</span>. Reserve your spot today.
      </React.Fragment>
    )
  ]
}

const Hero = ({ onOpenEmailModal }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailInputRef = useRef(null)

  // A/B Testing: Choose variant based on environment or URL param
  // TODO: Implement actual A/B testing logic (URL param, user ID hash, etc.)
  const variantIndex = 0 // Default to first variant
  const currentHeadline = VARIANTS.headlines[variantIndex]()
  const currentSubheadline = VARIANTS.subheadlines[variantIndex]()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleGetNotified = () => {
    // Clear previous error
    setEmailError('')
    
    // Check if email is empty
    if (!email.trim()) {
      setEmailError('Please enter your email address')
      setIsShaking(true)
      emailInputRef.current?.focus()
      
      // Remove shake animation after duration
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    
    // Check if email is valid
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      setIsShaking(true)
      emailInputRef.current?.focus()
      
      // Remove shake animation after duration
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    
    // If valid, proceed
    setIsSubmitting(true)
    onOpenEmailModal(email)
    // Reset submitting state after modal opens
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGetNotified()
    }
  }

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
      {/* Mobile-first background pattern - subtle and decorative */}
      <div className="absolute top-0 left-0 right-0 h-screen lg:hidden">
        <div className="h-32 w-full opacity-3" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(20 184 166) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container-width px-4 sm:px-6 lg:px-8 py-16 sm:py-12 lg:py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content (now full width on mobile) */}
          <div className="space-y-8 sm:space-y-6 lg:space-y-8 lg:order-1">
            <div className="space-y-6 sm:space-y-4 lg:space-y-6">
              <h1 className="
                text-[2.75rem] leading-[3rem] tracking-[-0.02em]
                sm:text-4xl sm:leading-[1.1] sm:tracking-tight
                md:text-5xl lg:text-6xl xl:text-7xl 
                font-extrabold text-gray-900 text-balance
              ">
                {currentHeadline}
              </h1>
              <p className="
                text-lg leading-[1.6] 
                sm:text-xl sm:leading-relaxed 
                md:text-2xl 
                text-gray-600 font-medium max-w-2xl
              ">
                {currentSubheadline}
              </p>
            </div>

            {/* Email Input - Mobile Optimized */}
            <div className="bg-white rounded-2xl sm:rounded-xl shadow-sm border border-gray-200 p-6 sm:p-4 lg:p-6">
              <div className="space-y-4 sm:space-y-3 lg:space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      ref={emailInputRef}
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-4 sm:px-4 sm:py-3 border border-gray-300 rounded-xl sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base sm:text-base placeholder-gray-500"
                      placeholder="Enter your email address"
                      required
                    />
                    {emailError && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {emailError && (
                    <p className="text-red-600 text-sm animate-fade-in">
                      {emailError}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleGetNotified}
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white py-4 sm:py-3 px-6 rounded-xl sm:rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-base sm:text-base shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  Get Notified
                </button>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 text-center">
                🔒 <span className="font-medium">Secure</span> • 🌟 <span className="font-medium">Simple</span> • 📱 <span className="font-medium">Offline-ready</span>
              </p>
            </div>
          </div>

          {/* Right Column - Desktop Illustration Only */}
          <div className="hidden lg:block relative lg:order-2">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center overflow-hidden relative">
                {/* Animated medical records visualization */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Background grid pattern - desktop only */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(20 184 166) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  
                  {/* Central phone/device mockup */}
                  <div className="relative z-10 w-48 h-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    {/* Phone screen */}
                    <div className="h-full p-4 flex flex-col">
                      {/* App header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">C</span>
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">CURALOG</span>
                        </div>
                        <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                      </div>
                      
                      {/* Animated document cards */}
                      <div className="flex-1 space-y-2">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg transform hover:scale-105 transition-transform animate-slide-in-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="h-2 bg-blue-300 rounded w-3/4 mb-1"></div>
                              <div className="h-1.5 bg-blue-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg transform hover:scale-105 transition-transform animate-slide-in-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="h-2 bg-green-300 rounded w-2/3 mb-1"></div>
                              <div className="h-1.5 bg-green-200 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg transform hover:scale-105 transition-transform animate-slide-in-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="h-2 bg-purple-300 rounded w-4/5 mb-1"></div>
                              <div className="h-1.5 bg-purple-200 rounded w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating document elements */}
                  <div className="absolute top-10 left-10 w-16 h-20 bg-white rounded-lg shadow-lg transform rotate-12 animate-float-1 opacity-80">
                    <div className="p-2">
                      <div className="h-1 bg-gray-300 rounded mb-1"></div>
                      <div className="h-1 bg-gray-200 rounded mb-1"></div>
                      <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-10 right-10 w-16 h-20 bg-white rounded-lg shadow-lg transform -rotate-12 animate-float-2 opacity-80">
                    <div className="p-2">
                      <div className="h-1 bg-gray-300 rounded mb-1"></div>
                      <div className="h-1 bg-gray-200 rounded mb-1"></div>
                      <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  
                  {/* Security badge */}
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-primary-600 text-white px-3 py-2 rounded-full shadow-lg animate-pulse">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 