import { useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'

// Components
import Header from '../components/Header'
import Hero from '../components/Hero'
import ScrollableFeatures from '../components/ScrollableFeatures'
import Principles from '../components/Principles'
import HowItWorks from '../components/HowItWorks'
import EmailModal from '../components/EmailModal'
import Footer from '../components/Footer'
import SocialProof from '../components/SocialProof'

export default function Home() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const openEmailModal = (email) => {
    setUserEmail(email)
    setIsEmailModalOpen(true)
  }

  const closeEmailModal = () => {
    setIsEmailModalOpen(false)
    setUserEmail('')
  }

  return (
    <>
      <Head>
        <title>CURALOG – Secure, Simple Digital Health Records</title>
        <meta 
          name="description" 
          content="CURALOG helps you scan, store, and share your health documents securely. Join the waitlist to shape the future of health record management." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curalog.app/" />
        <meta property="og:title" content="CURALOG – Secure, Simple Digital Health Records" />
        <meta 
          property="og:description" 
          content="CURALOG helps you scan, store, and share your health documents securely. Join the waitlist to shape the future of health record management." 
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://curalog.app/" />
        <meta property="twitter:title" content="CURALOG – Secure, Simple Digital Health Records" />
        <meta 
          property="twitter:description" 
          content="CURALOG helps you scan, store, and share your health documents securely. Join the waitlist to shape the future of health record management." 
        />
        <meta property="twitter:image" content="/og-image.png" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#14b8a6" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://curalog.app/" />
        
        {/* Additional SEO and performance tags */}
        <meta name="keywords" content="digital health records, medical documents, health data management, secure health storage, HIPAA compliant, medical record digitization" />
        <meta name="author" content="CURALOG" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Performance and loading optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        

        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "CURALOG",
              "description": "Secure, simple digital health record management platform",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web, iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "CURALOG",
                "url": "https://curalog.app"
              }
            })
          }}
        />
      </Head>

      {/* Google Analytics Scripts */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}', {
            page_title: 'CURALOG Landing Page',
            custom_map: { 'custom_parameter': 'value' }
          });
        `}
      </Script>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section id="hero">
            <Hero onOpenEmailModal={openEmailModal} />
          </section>

          {/* NEW: Vision Section - What We're Building */}
          <section id="vision" className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full filter blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center mb-4">
                  <span className="bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full">
                    Our Vision
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                  What We're Building
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  CURALOG is a comprehensive digital health record platform designed to solve the fragmented healthcare documentation problem millions face today.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
                {/* Problem Card */}
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg border border-red-100 h-full relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <pattern id="problem-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                          <circle cx="1" cy="1" r="1" fill="currentColor" className="text-red-500" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#problem-pattern)" />
                      </svg>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 ml-4">The Problem</h3>
                      </div>
                      
                      <ul className="space-y-4">
                        <li className="flex items-start transform transition-transform duration-300 hover:translate-x-2">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 5-8-5" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed">Medical records scattered across providers</span>
                        </li>
                        <li className="flex items-start transform transition-transform duration-300 hover:translate-x-2">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed">Paper documents lost or damaged</span>
                        </li>
                        <li className="flex items-start transform transition-transform duration-300 hover:translate-x-2">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed">No unified health history view</span>
                        </li>
                        <li className="flex items-start transform transition-transform duration-300 hover:translate-x-2">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed">Difficult to share with new doctors</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Arrow/Connector for desktop */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                
                {/* Solution Card */}
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl shadow-lg border border-green-100 h-full relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <pattern id="solution-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                          <circle cx="1" cy="1" r="1" fill="currentColor" className="text-green-500" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#solution-pattern)" />
                      </svg>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 ml-4">Our Solution</h3>
                      </div>
                      
                      <ul className="space-y-4">
                        <li className="flex items-start transform transition-transform duration-300 hover:translate-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed">Mobile app to scan & digitize all records</span>
                        </li>
                        <li className="flex items-start transform transition-transform duration-300 hover:translate-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed">AI-powered organization by date & type</span>
                        </li>
                        <li className="flex items-start transform transition-transform duration-300 hover:translate-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed">Secure cloud storage with offline access</span>
                        </li>
                        <li className="flex items-start transform transition-transform duration-300 hover:translate-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed">One-click sharing with healthcare providers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="text-center mt-16">
                <div className="inline-flex flex-col items-center">
                  <p className="text-lg text-gray-700 mb-6 font-medium">
                    Join our early access list to shape the future of health records
                  </p>
                  <button
                    onClick={() => openEmailModal('')}
                    className="btn-primary group flex items-center space-x-2 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                  >
                    <span>Get Early Access</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof Section */}
          <SocialProof />

          {/* Scrollable Features Section */}
          <section id="features" data-section="features">
            <ScrollableFeatures />
          </section>

          {/* Core Principles Section */}
          <Principles />

          {/* How It Works Section */}
          <section id="how-it-works" data-section="how-it-works">
            <HowItWorks />
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Email Modal */}
        <EmailModal 
          isOpen={isEmailModalOpen} 
          onClose={closeEmailModal}
          email={userEmail}
        />
      </div>
    </>
  )
}

// TODO: Implement A/B testing logic for headlines/subheadlines
// TODO: Add Google Analytics or other analytics tracking
// TODO: Consider adding a cookie consent banner
// TODO: Implement proper error boundaries for production
// TODO: Add loading states for better UX
// TODO: Consider adding a service worker for offline functionality 