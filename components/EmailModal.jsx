import { useState, useEffect, useRef } from 'react'

const EmailModal = ({ isOpen, onClose, email }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
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
        setSubmitted(true)
        setIsAlreadySubscribed(false)
      } else {
        if (data.error === 'EMAIL_ALREADY_EXISTS') {
          // Show success state but with different messaging
          setSubmitted(true)
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

    try {
      const response = await fetch('/api/subscribe', {
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

      const data = await response.json()

      if (response.ok) {
        // Show success message for email collection
        showNotification('🎉 Awesome! We\'ll reach out within 48 hours to schedule a quick chat about your health record needs.', 'success')
      } else {
        if (data.error === 'EMAIL_ALREADY_EXISTS') {
          showNotification('✅ Great! You\'re already on our feedback list. We\'ll be reaching out soon!', 'info')
        } else {
          throw new Error(data.message || 'Failed to register for feedback program')
        }
      }
    } catch (error) {
      console.error('Error registering for feedback program:', error)
      showNotification('❌ Oops! Something went wrong. Please try again.', 'error')
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Notification Toast */}
        {notification.show && (
          <div className={`absolute top-4 left-4 right-4 p-3 rounded-lg text-sm font-medium transition-all duration-300 z-10 ${
            notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
            notification.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
            notification.type === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
            'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <span>{notification.message}</span>
              <button
                onClick={() => setNotification({ show: false, message: '', type: 'success' })}
                className="ml-2 text-current opacity-70 hover:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          // Success state
          <div className={`text-center ${notification.show ? 'mt-16' : ''}`}>
            <div className={`w-16 h-16 ${isAlreadySubscribed ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <svg className={`w-8 h-8 ${isAlreadySubscribed ? 'text-blue-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {isAlreadySubscribed ? 'Already Part of CURALOG!' : 'Welcome to CURALOG!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isAlreadySubscribed 
                ? '✨ You\'re already on our exclusive waitlist! We appreciate your enthusiasm and will keep you updated on all our progress.'
                : '🎉 You\'re now on our waitlist! We\'ll keep you updated on CURALOG\'s progress and let you know when we\'re ready to launch.'
              }
            </p>
            
            {/* Market Research Survey Button */}
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center mb-2">
                  <span className="text-purple-600 mr-2">💬</span>
                  <h4 className="font-semibold text-purple-900">Want to Influence Our Features?</h4>
                </div>
                <p className="text-sm text-purple-700 mb-3">
                  We're actively seeking feedback from future users like you! Share your health record challenges and help us build exactly what you need. Quick 15-minute conversation, huge impact on our product.
                </p>
                <button
                  onClick={handleMarketResearchClick}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  Join Market Research
                </button>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          // Form state with NEW market research button
          <div className={notification.show ? 'mt-16' : ''}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Notified About CURALOG</h3>
            <p className="text-gray-600 mb-6">
              Be among the first to know when CURALOG launches and help shape the future of health records.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                      emailError 
                        ? 'border-red-500 focus:ring-red-500 pr-10' 
                        : 'border-gray-300'
                    } ${isShaking ? 'animate-shake' : ''}`}
                    placeholder="your@email.com"
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
                  <p className="mt-1 text-sm text-red-600 animate-fade-in">
                    {emailError}
                  </p>
                )}
              </div>
              
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !currentEmail}
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Joining...' : 'Get Notified'}
                </button>
                
                <div className="text-center">
                  <div className="relative">
                    <div className="text-xs text-gray-500 mb-2">
                      Have opinions about health records?
                    </div>
                    <button
                      type="button"
                      onClick={handleMarketResearchClick}
                      className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors border border-purple-200 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Join Market Research
                      </span>
                      <div className="absolute inset-0 bg-purple-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
                    </button>
                    <div className="text-xs text-gray-400 mt-1">
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
  )
}

export default EmailModal 