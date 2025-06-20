import { useState } from 'react'
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
        LAKNOR helps you <span className="relative font-semibold text-gray-800"><span className="absolute inset-0 bg-gray-200/40 rounded-md -z-10"></span>scan, store, and share</span> your health documents securely—<span className="relative text-teal-700 font-medium"><span className="absolute inset-0 bg-teal-100/40 rounded-md -z-10"></span>accessible anytime, anywhere</span>.
      </React.Fragment>
    ),
    () => (
      <React.Fragment>
        From prescriptions to vaccination logs, manage your medical past with <span className="relative font-semibold text-purple-700"><span className="absolute inset-0 bg-purple-100/40 rounded-md -z-10"></span>ease and privacy</span>.
      </React.Fragment>
    ),
    () => (
      <React.Fragment>
        Easily scan, store, and share your health records with <span className="relative font-semibold text-blue-700"><span className="absolute inset-0 bg-blue-100/40 rounded-md -z-10"></span>end-to-end encryption</span> and <span className="relative font-semibold text-green-700"><span className="absolute inset-0 bg-green-100/40 rounded-md -z-10"></span>offline access</span>.
      </React.Fragment>
    )
  ]
}

const Hero = ({ onOpenEmailModal }) => {
  const [email, setEmail] = useState('')

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
    if (!validateEmail(email)) {
      alert('Please enter a valid email address')
      return
    }
    onOpenEmailModal(email)
  }

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-width px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.1] text-balance tracking-tight">
                {currentHeadline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
                {currentSubheadline}
              </p>
            </div>

            {/* Email Input */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="input-field"
                    required
                  />
                </div>

                <button
                  onClick={handleGetNotified}
                  className="btn-primary w-full"
                >
                  Get Notified
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                🔒 <span className="font-medium">Secure</span> • 🌟 <span className="font-medium">Simple</span> • 📱 <span className="font-medium">Offline-ready</span>
              </p>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="relative">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* TODO: Replace with actual hero image or animation */}
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Digital Medical Records</p>
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