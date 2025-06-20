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
        <title>LAKNOR – Secure, Simple Digital Health Records</title>
        <meta 
          name="description" 
          content="LAKNOR helps you scan, store, and share your health documents securely. Join the waitlist to shape the future of health record management." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://laknor.com/" />
        <meta property="og:title" content="LAKNOR – Secure, Simple Digital Health Records" />
        <meta 
          property="og:description" 
          content="LAKNOR helps you scan, store, and share your health documents securely. Join the waitlist to shape the future of health record management." 
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://laknor.com/" />
        <meta property="twitter:title" content="LAKNOR – Secure, Simple Digital Health Records" />
        <meta 
          property="twitter:description" 
          content="LAKNOR helps you scan, store, and share your health documents securely. Join the waitlist to shape the future of health record management." 
        />
        <meta property="twitter:image" content="/og-image.png" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#14b8a6" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://laknor.com/" />
        
        {/* Additional SEO and performance tags */}
        <meta name="keywords" content="digital health records, medical documents, health data management, secure health storage, HIPAA compliant, medical record digitization" />
        <meta name="author" content="LAKNOR" />
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
              "name": "LAKNOR",
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
                "name": "LAKNOR",
                "url": "https://laknor.com"
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
            page_title: 'LAKNOR Landing Page',
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