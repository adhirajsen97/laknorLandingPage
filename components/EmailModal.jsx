import { useState, useEffect, useRef } from 'react'

const EmailModal = ({ isOpen, onClose, email }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [showMarketResearchOptions, setShowMarketResearchOptions] = useState(false)
  const [hasJoinedMarketResearch, setHasJoinedMarketResearch] = useState(false)
  const [emailNotificationSent, setEmailNotificationSent] = useState(false)
  const [isMobileAnimating, setIsMobileAnimating] = useState(false)
  const emailInputRef = useRef(null)

  useEffect(() => {
    if (email) {
      setCurrentEmail(email)
    }
  }, [email])

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false)
      setIsSubmitting(false)
      setNotification({ show: false, message: '', type: 'success' })
      setIsAlreadySubscribed(false)
      setEmailError('')
      setIsShaking(false)
      setShowMarketResearchOptions(false)
      setHasJoinedMarketResearch(false)
      setEmailNotificationSent(false)
      
      // Mobile slide-up animation
      setIsMobileAnimating(true)
      setTimeout(() => setIsMobileAnimating(false), 100)
    }
  }, [isOpen])

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' })
    }, 4000) // Hide after 4 seconds
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous error
    setEmailError('')
    
    // Check if email is empty
    if (!currentEmail.trim()) {
      setEmailError('Please enter your email address')
      setIsShaking(true)
      emailInputRef.current?.focus()
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    
    // Check if email is valid
    if (!validateEmail(currentEmail)) {
      setEmailError('Please enter a valid email address')
      setIsShaking(true)
      emailInputRef.current?.focus()
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: currentEmail,
          marketingConsent: true,
          subscriptionType: 'notification' // Main waitlist subscription
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Show success message but keep form visible with market research option
        setEmailNotificationSent(true)
        showNotification('🎉 You\'re now on our waitlist! We\'ll keep you updated on CURALOG\'s progress.', 'success')
      } else {
        if (data.error === 'EMAIL_ALREADY_EXISTS') {
          // Show success message even if already subscribed
          setEmailNotificationSent(true)
          setIsAlreadySubscribed(true)
          showNotification('✨ Great news! You\'re already on our waitlist. We\'ll be in touch soon!', 'info')
        } else {
          throw new Error(data.message || 'Subscription failed')
        }
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      showNotification('❌ Failed to subscribe. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMarketResearchClick = async () => {
    if (!currentEmail) {
      showNotification('Please enter your email first', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      // Add to both tables - first the main subscription, then market research
      const emailSubscriptionResponse = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: currentEmail,
          marketingConsent: true,
          subscriptionType: 'notification' // Main waitlist subscription
        }),
      })

      const marketResearchResponse = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: currentEmail,
          marketingConsent: true,
          subscriptionType: 'research' // Market research subscription
        }),
      })

      const emailData = await emailSubscriptionResponse.json()
      const researchData = await marketResearchResponse.json()

      if (marketResearchResponse.ok) {
        // Show success message and reveal only survey option
        setHasJoinedMarketResearch(true)
        setEmailNotificationSent(true)
        showNotification('🎉 Awesome! You\'re now part of our research program. Please take our survey to help shape CURALOG!', 'success')
      } else {
        if (researchData.error === 'EMAIL_ALREADY_EXISTS') {
          // Still show the survey option even if already subscribed
          setHasJoinedMarketResearch(true)
          setEmailNotificationSent(true)
          showNotification('✅ Great! You\'re already on our research list. Please take our survey!', 'info')
        } else {
          throw new Error(researchData.message || 'Failed to register for research program')
        }
      }
    } catch (error) {
      console.error('Error registering for research program:', error)
      showNotification('❌ Oops! Something went wrong. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setSubmitted(false)
    setIsSubmitting(false)
    setEmailError('')
    setNotification({ show: false, message: '', type: 'success' })
    onClose()
  }

  const handleEmailChange = (e) => {
    setCurrentEmail(e.target.value)
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('')
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Mobile Backdrop - Full Screen */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-0 sm:p-4 z-50"
        onClick={handleClose}
      >
        {/* Mobile Modal - Bottom Sheet Style */}
        <div 
          className={`
            bg-white w-full h-auto max-h-[90vh] overflow-y-auto
            sm:rounded-lg sm:shadow-xl sm:max-w-md sm:w-full sm:p-6 sm:relative
            fixed bottom-0 left-0 right-0 rounded-t-2xl
            transform transition-transform duration-300 ease-out
            ${isMobileAnimating ? 'translate-y-full' : 'translate-y-0'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Mobile Handle Bar */}
          <div className="sm:hidden flex justify-center pt-2 pb-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Mobile Padding */}
          <div className="p-6 sm:p-0">
            {/* Notification Toast - Mobile Optimized */}
            {notification.show && (
              <div className={`
                absolute top-4 left-4 right-4 p-4 rounded-lg text-sm font-medium 
                transition-all duration-300 z-10 shadow-lg
                ${notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                  notification.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                  notification.type === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  'bg-gray-100 text-gray-800 border border-gray-200'
                }
              `}>
                <div className="flex items-center justify-between">
                  <span className="flex-1 pr-2">{notification.message}</span>
                  <button
                    onClick={() => setNotification({ show: false, message: '', type: 'success' })}
                    className="ml-2 text-current opacity-70 hover:opacity-100 flex-shrink-0 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Close button - Desktop Only */}
            <button
              onClick={handleClose}
              className="hidden sm:block absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {hasJoinedMarketResearch ? (
              // Show only survey option after joining market research
              <div className={`text-center ${notification.show ? 'mt-20 sm:mt-16' : ''}`}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-4">
                  Ready for the Survey!
                </h3>
                <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  Thank you for joining our research program! Please take our survey to help us build the perfect solution for you.
                </p>
                
                {/* Survey Button - Mobile Optimized */}
                <div className="mb-6 sm:mb-8">
                  <a
                    href="https://forms.gle/1ffJ9yWemWTZFgfh9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-purple-600 text-white py-4 sm:py-3 px-6 rounded-xl hover:bg-purple-700 transition-colors font-medium inline-flex items-center justify-center group text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Take Research Survey (5-7 mins)
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <p className="text-sm text-gray-500 mt-3 sm:mt-4">
                    📋 Anonymous survey about your health record management needs
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full bg-gray-100 text-gray-700 py-3 sm:py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors text-base sm:text-sm"
                >
                  Close
                </button>
              </div>
            ) : submitted ? (
              // Success state (legacy - keeping for compatibility but won't be used)
              <div className={`text-center ${notification.show ? 'mt-20 sm:mt-16' : ''}`}>
                <div className={`w-16 h-16 sm:w-20 sm:h-20 ${isAlreadySubscribed ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                  <svg className={`w-8 h-8 sm:w-10 sm:h-10 ${isAlreadySubscribed ? 'text-blue-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-4">
                  {isAlreadySubscribed ? 'Already Part of CURALOG!' : 'Welcome to CURALOG!'}
                </h3>
                <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  {isAlreadySubscribed 
                    ? '✨ You\'re already on our exclusive waitlist! We appreciate your enthusiasm and will keep you updated on all our progress.'
                    : '🎉 You\'re now on our waitlist! We\'ll keep you updated on CURALOG\'s progress and let you know when we\'re ready to launch.'
                  }
                </p>

                <button
                  onClick={handleClose}
                  className="w-full bg-gray-100 text-gray-700 py-3 sm:py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors text-base sm:text-sm"
                >
                  Close
                </button>
              </div>
            ) : (
              // Form state - Mobile Optimized
              <div className={notification.show ? 'mt-20 sm:mt-16' : ''}>
                <h3 className="text-2xl sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Get Notified About CURALOG</h3>
                <p className="text-gray-600 mb-6 text-base sm:text-base leading-relaxed">
                  Be among the first to know when CURALOG launches and help shape the future of health records.
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        ref={emailInputRef}
                        type="email"
                        id="email"
                        value={currentEmail}
                        onChange={handleEmailChange}
                        className={`
                          w-full px-4 py-4 sm:px-3 sm:py-2 border rounded-xl focus:outline-none 
                          focus:ring-2 focus:ring-teal-500 focus:border-transparent 
                          transition-all duration-200 text-base sm:text-base
                          ${emailError 
                            ? 'border-red-500 focus:ring-red-500 pr-12' 
                            : 'border-gray-300'
                          } ${isShaking ? 'animate-shake' : ''}
                        `}
                        placeholder="your@email.com"
                        required
                      />
                      {emailError && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {emailError && (
                      <p className="mt-2 text-sm text-red-600 animate-fade-in">
                        {emailError}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {!emailNotificationSent ? (
                      <button
                        type="submit"
                        disabled={isSubmitting || !currentEmail}
                        className="w-full bg-teal-600 text-white py-4 sm:py-3 px-4 rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                      >
                        {isSubmitting ? 'Joining...' : 'Get Notified'}
                      </button>
                    ) : (
                      <div className="w-full bg-green-100 text-green-800 py-4 sm:py-3 px-4 rounded-xl text-center border border-green-200 text-base sm:text-base font-medium">
                        ✅ You're on the waitlist!
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className="relative">
                        <div className="text-sm text-gray-500 mb-3">
                          Have opinions about health records?
                        </div>
                        
                        <button
                          type="button"
                          onClick={handleMarketResearchClick}
                          disabled={isSubmitting || !currentEmail}
                          className="w-full bg-purple-100 text-purple-700 py-4 sm:py-3 px-4 rounded-xl hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-purple-200 relative overflow-hidden group text-base sm:text-base font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {isSubmitting ? 'Joining...' : 'Join Market Research'}
                          </span>
                          <div className="absolute inset-0 bg-purple-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
                        </button>
                        
                        <div className="text-xs sm:text-xs text-gray-400 mt-2">
                          Help us build the perfect solution for you
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailModal 