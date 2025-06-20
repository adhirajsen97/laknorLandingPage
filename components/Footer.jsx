import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Vector utility for cursor position calculations
const vec2 = (x = 0, y = 0) => ({
  x,
  y,
  clone: function() { return vec2(this.x, this.y) },
  sub: function(v) { this.x -= v.x; this.y -= v.y; return this },
  copy: function(v) { this.x = v.x; this.y = v.y; return this },
  lerp: function(target, amount) {
    this.x += (target.x - this.x) * amount
    this.y += (target.y - this.y) * amount
    return this
  }
})

// Custom Cursor class with GSAP animations
class Cursor {
  constructor(targetEl) {
    this.el = targetEl
    
    this.position = {
      previous: vec2(-100, -100),
      current: vec2(-100, -100),
      target: vec2(-100, -100),
      lerpAmount: 0.1
    }
    this.scale = {
      previous: 1,
      current: 1,
      target: 1,
      lerpAmount: 0.1
    }

    this.isHovered = false
    this.hoverEl = null

    this.addListeners()
  }

  update() {
    this.position.current.lerp(this.position.target, this.position.lerpAmount)
    this.scale.current = gsap.utils.interpolate(
      this.scale.current,
      this.scale.target,
      this.scale.lerpAmount
    )

    const delta = this.position.current.clone().sub(this.position.previous)

    this.position.previous.copy(this.position.current)
    this.scale.previous = this.scale.current

    gsap.set(this.el, {
      x: this.position.current.x,
      y: this.position.current.y
    })

    if (!this.isHovered) {
      const angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI)
      const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.04

      gsap.set(this.el, {
        rotate: angle,
        scaleX: this.scale.current + Math.min(distance, 1),
        scaleY: this.scale.current - Math.min(distance, 0.3)
      })
    }
  }

  updateTargetPosition(x, y) {
    if (this.isHovered) {
      const bounds = this.hoverEl.getBoundingClientRect()

      const cx = bounds.x + bounds.width / 2
      const cy = bounds.y + bounds.height / 2

      const dx = x - cx
      const dy = y - cy

      this.position.target.x = cx + dx * 0.15
      this.position.target.y = cy + dy * 0.15
      this.scale.target = 2

      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
      const distance = Math.sqrt(dx * dx + dy * dy) * 0.01

      gsap.set(this.el, { rotate: angle })
      gsap.to(this.el, {
        scaleX: this.scale.target + Math.pow(Math.min(distance, 0.6), 3) * 3,
        scaleY: this.scale.target - Math.pow(Math.min(distance, 0.3), 3) * 3,
        duration: 0.5,
        ease: "power4.out",
        overwrite: true
      })
    } else {
      this.position.target.x = x
      this.position.target.y = y
      this.scale.target = 1
    }
  }

  addListeners() {
    gsap.utils.toArray("[data-hover]").forEach((hoverEl) => {
      // set hover states
      const hoverBoundsEl = hoverEl.querySelector("[data-hover-bounds]")
      if (hoverBoundsEl) {
        hoverBoundsEl.addEventListener("pointerover", () => {
          this.isHovered = true
          this.hoverEl = hoverBoundsEl
        })
        hoverBoundsEl.addEventListener("pointerout", () => {
          this.isHovered = false
          this.hoverEl = null
        })
      }

      // magnetic effect
      const xTo = gsap.quickTo(hoverEl, "x", {
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      })
      const yTo = gsap.quickTo(hoverEl, "y", {
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      })

      hoverEl.addEventListener("pointermove", (event) => {
        const { clientX: cx, clientY: cy } = event
        const { height, width, left, top } = hoverEl.getBoundingClientRect()
        const x = cx - (left + width / 2)
        const y = cy - (top + height / 2)
        xTo(x * 0.2)
        yTo(y * 0.2)
      })

      hoverEl.addEventListener("pointerout", () => {
        xTo(0)
        yTo(0)
      })
    })
  }
}

const Footer = () => {
  const cursorRef = useRef(null)
  const cursorInstanceRef = useRef(null)
  
  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/laknor_health',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/laknor',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'https://github.com/laknor',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ]

  useEffect(() => {
    // Check if device is mobile/touch
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || 
                     (window.innerWidth <= 768)

    // Add CSS styles for the exact cursor behavior
    const style = document.createElement('style')
    style.textContent = `
      .btn {
        --size: 40px;
        width: var(--size);
        height: var(--size);
        position: relative;
        display: grid;
        place-content: center;
      }

      .btn svg {
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      ${!isMobile ? `
      [data-hover] {
        position: relative;
      }

      [data-hover] [data-hover-bounds] {
        position: absolute;
        left: 0;
        top: 0;
        inset: 0;
      }

      [data-hover]:hover [data-hover-bounds] {
        transform: scale(4);
      }

      .footer-cursor {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        position: fixed;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, rgba(8, 145, 178, 0.05) 50%, transparent 100%);
        pointer-events: none;
        box-shadow: 
          0 0 20px rgba(20, 184, 166, 0.15),
          0 0 40px rgba(20, 184, 166, 0.1),
          0 0 60px rgba(8, 145, 178, 0.05);
        z-index: 5;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      .footer-cursor.visible {
        opacity: 1;
      }
      ` : ''}

      .social-hover-btn {
        --size: 40px;
        width: var(--size);
        height: var(--size);
        position: relative;
        display: grid;
        place-content: center;
        transition: transform 0.2s ease;
      }

      .social-hover-btn:hover {
        transform: scale(1.1);
      }

      .social-icon {
        position: relative;
        z-index: 10;
        pointer-events: none;
      }
    `
    document.head.appendChild(style)

    // Only initialize GSAP animations on desktop
    if (!isMobile) {
      // Create cursor element
      const cursorEl = document.createElement('div')
      cursorEl.className = 'footer-cursor'
      document.body.appendChild(cursorEl)
      cursorRef.current = cursorEl

      // Initialize cursor with GSAP
      const cursor = new Cursor(cursorEl)
      cursorInstanceRef.current = cursor

      // Update function for GSAP ticker
      const update = () => {
        cursor.update()
      }

      // Mouse move handler
      const onMouseMove = (event) => {
        const x = event.clientX
        const y = event.clientY
        cursor.updateTargetPosition(x, y)
      }

      // Footer hover detection
      const footerEl = document.querySelector('footer')
      let isInFooter = false

      const handleFooterEnter = () => {
        isInFooter = true
        cursorEl.classList.add('visible')
      }

      const handleFooterLeave = () => {
        isInFooter = false
        cursorEl.classList.remove('visible')
      }

      if (footerEl) {
        footerEl.addEventListener('mouseenter', handleFooterEnter)
        footerEl.addEventListener('mouseleave', handleFooterLeave)
      }

      // Start GSAP ticker and add event listeners
      gsap.ticker.add(update)
      window.addEventListener("pointermove", onMouseMove)

      return () => {
        // Cleanup
        gsap.ticker.remove(update)
        window.removeEventListener("pointermove", onMouseMove)
        if (footerEl) {
          footerEl.removeEventListener('mouseenter', handleFooterEnter)
          footerEl.removeEventListener('mouseleave', handleFooterLeave)
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style)
        }
        if (document.body.contains(cursorEl)) {
          document.body.removeChild(cursorEl)
        }
      }
    } else {
      // Mobile cleanup
      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style)
        }
      }
    }
  }, [])

  return (
    <>
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-12">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="btn social-hover-btn text-gray-400 hover:text-primary-600 transition-colors duration-200"
                data-hover
                aria-label={`Follow us on ${social.name}`}
              >
                <div className="social-icon">
                  {social.icon}
                </div>
                <div data-hover-bounds></div>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer 