const Principles = () => {
  const principles = [
    {
      id: 'privacy-first',
      title: 'Privacy-First',
      description: 'You own your data: encrypted storage and sharing.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'simplicity',
      title: 'Simplicity',
      description: 'Intuitive interface built for minimal tech skills.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'offline-ready',
      title: 'Offline-Ready',
      description: 'Access records even without internet; sync when online.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'interoperability',
      title: 'Interoperability',
      description: 'Export data in universal formats; integrations planned.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      color: 'bg-accent-100 text-accent-600'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built on Simplicity & Privacy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CURALOG's core principles ensure your health records are managed with the highest standards of security, usability, and accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <div
              key={principle.id}
              className="card group hover:shadow-lg transition-all duration-300 relative"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {principle.badge && (
                <div className="absolute -top-3 -right-3 bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {principle.badge}
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${principle.color} group-hover:scale-110 transition-transform duration-300`}>
                  {principle.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>HIPAA-Compliant • SOC 2 Certified • Zero-Knowledge Architecture</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Principles 