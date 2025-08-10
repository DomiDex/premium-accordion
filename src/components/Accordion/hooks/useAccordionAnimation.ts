import { useRef, RefObject, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { setMultipleWillChange, clearMultipleWillChange } from '../utils/dom'
import { ANIMATION_CONFIG } from '../utils/animation'

interface UseAccordionAnimationOptions {
  duration?: number
  ease?: string
  stagger?: boolean
  enableMicroInteractions?: boolean
}

export const useAccordionAnimation = (
  contentRef: RefObject<HTMLDivElement | null>,
  iconRef: RefObject<HTMLDivElement | null>,
  buttonRef: RefObject<HTMLButtonElement | null>,
  isOpen: boolean,
  options: UseAccordionAnimationOptions = {}
) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const previousOpenState = useRef<boolean | null>(null)
  const isFirstRender = useRef(true)
  const breathingAnimation = useRef<gsap.core.Tween | null>(null)

  const {
    duration = ANIMATION_CONFIG.DEFAULT_DURATION,
    ease = ANIMATION_CONFIG.DEFAULT_EASE,
    stagger = true,
    enableMicroInteractions = true
  } = options

  useLayoutEffect(() => {
    if (!contentRef.current || !iconRef.current) return

    // Handle first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      previousOpenState.current = isOpen
      
      if (isOpen) {
        const content = contentRef.current
        const inner = content.querySelector('.accordion-content-inner') as HTMLElement
        const icon = iconRef.current
        
        gsap.set(content, { height: 'auto', overflow: 'visible' })
        gsap.set(inner, { opacity: 1, y: 0 })
        gsap.set(icon, { rotation: 180 })
        
        // Set initial state for staggered elements
        if (stagger) {
          const elements = inner?.querySelectorAll('p, li, ul, h1, h2, h3, h4, h5, h6')
          if (elements) {
            gsap.set(elements, { opacity: 1, y: 0 })
          }
        }
        return
      }
    }

    // Only animate if state changed
    if (previousOpenState.current === isOpen) return
    previousOpenState.current = isOpen

    // Kill existing animations
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    if (breathingAnimation.current) {
      breathingAnimation.current.kill()
      breathingAnimation.current = null
    }

    const content = contentRef.current
    const inner = content.querySelector('.accordion-content-inner') as HTMLElement
    const icon = iconRef.current
    const button = buttonRef.current

    if (isOpen) {
      // Opening animation timeline
      const tl = gsap.timeline({
        defaults: { ease },
        onStart: () => {
          gsap.set(content, { overflow: 'hidden' })
          setMultipleWillChange(
            { content, inner },
            { content: 'height', inner: 'opacity, transform' }
          )
        },
        onComplete: () => {
          gsap.set(content, { 
            height: 'auto', 
            overflow: 'visible',
            clearProps: 'transform'
          })
          clearMultipleWillChange([content, inner])

          // Start breathing animation when open
          if (enableMicroInteractions && button) {
            breathingAnimation.current = gsap.to(button, {
              scale: 1.002,
              duration: 2,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true
            })
          }
        }
      })

      // Calculate auto height
      gsap.set(content, { height: 'auto' })
      const autoHeight = content.offsetHeight
      gsap.set(content, { height: 0 })

      // Add subtle bounce effect on button
      if (enableMicroInteractions && button) {
        tl.to(button, {
          scale: 0.98,
          duration: 0.08,
          ease: 'power2.in'
        })
        .to(button, {
          scale: 1.002,
          duration: 0.15,
          ease: 'elastic.out(1, 0.5)'
        })
      }

      // Main height animation
      tl.to(content, {
        height: autoHeight,
        duration,
        ease: 'power2.inOut'
      }, button ? '-=0.15' : 0)

      // Icon rotation with spring effect
      tl.to(icon, {
        rotation: 180,
        duration: duration * ANIMATION_CONFIG.CONTENT_FADE_RATIO,
        ease: 'back.out(1.7)'
      }, `-=${ANIMATION_CONFIG.OVERLAP_TIMING}`)

      // Content fade in with upward movement
      if (inner) {
        gsap.set(inner, { opacity: 0, y: 15 })
        tl.to(inner, {
          opacity: 1,
          y: 0,
          duration: duration * ANIMATION_CONFIG.CONTENT_FADE_RATIO,
          ease: 'power2.out'
        }, '-=0.35')

        // Stagger content elements
        if (stagger) {
          const elements = inner.querySelectorAll('p, li, ul, h1, h2, h3, h4, h5, h6')
          if (elements.length > 0) {
            gsap.set(elements, { opacity: 0, y: 10 })
            tl.to(elements, {
              opacity: 1,
              y: 0,
              duration: ANIMATION_CONFIG.ICON_DURATION,
              stagger: ANIMATION_CONFIG.STAGGER_DELAY,
              ease: 'power2.out'
            }, '-=0.2')
          }
        }
      }

      // Add subtle glow pulse on open
      if (enableMicroInteractions && button) {
        tl.to(button, {
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        }, '-=0.3')
        .to(button, {
          boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
          duration: 0.4,
          ease: 'power2.out'
        })
      }

      timelineRef.current = tl
    } else {
      // Closing animation timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power2.in' },
        onStart: () => {
          gsap.set(content, { overflow: 'hidden' })
          setMultipleWillChange(
            { content, inner },
            { content: 'height', inner: 'opacity, transform' }
          )
          
          // Stop breathing animation
          if (breathingAnimation.current) {
            breathingAnimation.current.kill()
            breathingAnimation.current = null
            if (button) {
              gsap.set(button, { scale: 1 })
            }
          }
        },
        onComplete: () => {
          clearMultipleWillChange([content, inner])
        }
      })

      // Stagger out content elements first
      if (stagger && inner) {
        const elements = inner.querySelectorAll('p, li, ul, h1, h2, h3, h4, h5, h6')
        if (elements.length > 0) {
          tl.to(elements, {
            opacity: 0,
            y: -5,
            duration: 0.2,
            stagger: ANIMATION_CONFIG.STAGGER_DELAY * 0.4,
            ease: 'power2.in'
          })
        }
      }

      // Fade out content
      if (inner) {
        tl.to(inner, {
          opacity: 0,
          y: -10,
          duration: duration * 0.4,
          ease: 'power2.in'
        }, stagger ? '-=0.1' : 0)
      }

      // Icon rotation back
      tl.to(icon, {
        rotation: 0,
        duration: duration * 0.5,
        ease: 'power2.inOut'
      }, '-=0.3')

      // Collapse height
      tl.to(content, {
        height: 0,
        duration: duration * 0.8,
        ease: 'power2.inOut'
      }, '-=0.4')

      // Subtle scale on close
      if (enableMicroInteractions && button) {
        tl.to(button, {
          scale: 0.995,
          duration: 0.1,
          ease: 'power2.out'
        }, '-=0.4')
        .to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        })
      }

      timelineRef.current = tl
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (breathingAnimation.current) {
        breathingAnimation.current.kill()
      }
    }
  }, [isOpen, duration, ease, stagger, enableMicroInteractions, contentRef, iconRef, buttonRef])

  // Hover animations for micro-interactions
  useLayoutEffect(() => {
    if (!enableMicroInteractions || !buttonRef.current) return

    const button = buttonRef.current
    
    const handleMouseEnter = () => {
      if (!breathingAnimation.current) {
        gsap.to(button, {
          scale: 1.005,
          duration: 0.2,
          ease: ANIMATION_CONFIG.DEFAULT_EASE
        })
      }
    }

    const handleMouseLeave = () => {
      if (!breathingAnimation.current) {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: ANIMATION_CONFIG.DEFAULT_EASE
        })
      }
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enableMicroInteractions, buttonRef])

  return {
    timeline: timelineRef.current,
    isAnimating: timelineRef.current?.isActive() || false
  }
}