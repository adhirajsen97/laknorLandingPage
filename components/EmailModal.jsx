import { useState, useEffect } from 'react'

const EmailModal = ({ isOpen, onClose, email }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })

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
    }
  }, [isOpen])

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' })
    }, 4000) // Hide after 4 seconds
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      } else {
        if (data.error === 'EMAIL_ALREADY_EXISTS') {
          alert('This email is already subscribed to our waitlist!')
        } else {
          throw new Error(data.message || 'Subscription failed')
        }
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      alert('Failed to subscribe. Please try again.')
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
        showNotification('🎉 Thank you for joining our research program! We\'ll contact you soon with more details.', 'success')
      } else {
        if (data.error === 'EMAIL_ALREADY_EXISTS') {
          showNotification('✅ You\'re already registered for market research! We\'ll be in touch soon.', 'info')
        } else {
          throw new Error(data.message || 'Failed to register for market research')
        }
      }
    } catch (error) {
      console.error('Error registering for market research:', error)
      showNotification('❌ Failed to register for market research. Please try again.', 'error')
    }
  }



  const handleClose = () => {
    setSubmitted(false)
    setIsSubmitting(false)
    onClose()
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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to LAKNOR!</h3>
            <p className="text-gray-600 mb-6">
              🎉 You're now on our waitlist! We'll keep you updated on LAKNOR's progress and let you know when we're ready to launch.
            </p>
            
            {/* Market Research Survey Button */}
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <span className="text-blue-600 mr-2">🔬</span>
                  <h4 className="font-semibold text-blue-900">Help Shape LAKNOR</h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Get priority access to our research program. We'll reach out personally to learn about your needs and get your input on features.
                </p>
                <button
                  onClick={handleMarketResearchClick}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Notified About LAKNOR</h3>
            <p className="text-gray-600 mb-6">
              Be among the first to know when LAKNOR launches and help shape the future of health records.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
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
                  <div className="text-xs text-gray-500 mb-2">Want to help shape LAKNOR?</div>
                  <button
                    type="button"
                    onClick={handleMarketResearchClick}
                    className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors border border-purple-200"
                  >
                    Join Market Research
                  </button>
                  <div className="text-xs text-gray-400 mt-1">We'll contact you for feedback & interviews</div>
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