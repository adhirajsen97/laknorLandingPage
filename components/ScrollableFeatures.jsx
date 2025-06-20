import { useEffect, useRef, useState } from 'react'

const ScrollableFeatures = () => {
  const [visibleFeatures, setVisibleFeatures] = useState(new Set())
  const sectionRef = useRef(null)
  
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

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Why Choose CURALOG?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Experience the future of health record management with features designed 
            around security, simplicity, and your peace of mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
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
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-primary-600 font-medium">
            <span>Building the future of health record management</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-100 to-transparent rounded-full opacity-30 -translate-y-32 translate-x-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-100 to-transparent rounded-full opacity-30 translate-y-32 -translate-x-32 pointer-events-none"></div>
    </section>
  )
}

export default ScrollableFeatures 