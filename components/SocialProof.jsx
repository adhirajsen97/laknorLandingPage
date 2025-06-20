import { useState, useEffect, useRef } from 'react'

const SocialProof = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  
  const reasons = [
    {
      value: '73%',
      label: 'of adults struggle to manage medical records',
      icon: '📊',
      source: 'Healthcare IT Survey 2023'
    },
    {
      value: '2.5hrs',
      label: 'average time spent searching for records yearly',
      icon: '⏱️',
      source: 'Patient Experience Study'
    },
    {
      value: '1 in 5',
      label: 'patients report medical errors due to incomplete records',
      icon: '⚠️',
      source: 'Patient Safety Research 2023'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 bg-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-primary-700 uppercase tracking-wide">
            Why This Matters Now
          </h3>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto">
            The healthcare documentation crisis affects millions. It's time for a solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{reason.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-1">
                  {reason.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {reason.label}
                </div>
                <div className="text-xs text-gray-400 italic">
                  {reason.source}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 font-medium">
            Join us in solving this critical healthcare challenge
          </p>
        </div>
      </div>
    </section>
  )
}

export default SocialProof 