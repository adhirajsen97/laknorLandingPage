import { useState, useEffect } from 'react'

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [showArrow, setShowArrow] = useState(false)
  const [arrowTarget, setArrowTarget] = useState(0)

  const steps = [
    {
      title: 'Scan or Upload',
      description: 'Use your phone or computer to photograph or upload existing medical documents.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Organize & Secure',
      description: 'LAKNOR extracts, tags, and encrypts your data for easy access.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm0 0a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2H3V7z" />
        </svg>
      )
    },
    {
      title: 'Share & Access Anywhere',
      description: 'Share with providers or family via secure link; view offline.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      )
    }
  ]

  useEffect(() => {
    const sequence = async () => {
      // Start with step 1 active
      setActiveStep(0)
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show arrow moving to step 2
      setShowArrow(true)
      setArrowTarget(1)
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Activate step 2
      setActiveStep(1)
      setShowArrow(false)
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show arrow moving to step 3
      setShowArrow(true)
      setArrowTarget(2)
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Activate step 3
      setActiveStep(2)
      setShowArrow(false)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reset and restart sequence
      setActiveStep(-1)
      await new Promise(resolve => setTimeout(resolve, 500))
      sequence()
    }

    sequence()
  }, [])

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            How LAKNOR Works in 3 Steps
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Getting started with LAKNOR is simple. Follow these three easy steps to take control of your health records.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className={`group relative transition-all duration-700 ease-out ${
              activeStep === index ? 'transform scale-105' : ''
            }`} style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>

              {/* Content section */}
              <div className="text-center">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-lg border transition-all duration-700 ease-out ${
                    activeStep === index
                      ? 'bg-primary-600 text-white border-primary-700 shadow-xl transform scale-110'
                      : 'bg-white text-primary-600 border-primary-100 group-hover:scale-105'
                  }`} style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                    {step.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className={`text-xl font-bold mb-4 transition-colors duration-500 ease-out ${
                  activeStep === index ? 'text-primary-700' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed transition-opacity duration-500 ease-out" style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                  {step.description}
                </p>
              </div>

              {/* Animated arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full transform -translate-y-1/2">
                  <div className={`transition-all duration-800 ${
                    showArrow && arrowTarget === index + 1
                      ? 'translate-x-6 opacity-100'
                      : 'translate-x-2 opacity-30'
                  }`}>
                    <svg 
                      width="40" 
                      height="24" 
                      viewBox="0 0 40 24" 
                      fill="none" 
                      className="text-primary-400"
                    >
                      <path 
                        d="M2 12L38 12M38 12L28 2M38 12L28 22" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className={`transition-all duration-500 ${
                          showArrow && arrowTarget === index + 1
                            ? 'stroke-primary-600 stroke-[3]'
                            : ''
                        }`}
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks 