import { RefObject, useEffect } from 'react'
import gsap from 'gsap'

export const useMicroInteractions = (
  buttonRef: RefObject<HTMLButtonElement>,
  isOpen: boolean
) => {
  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    
    // Hover interactions
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.005,
        duration: 0.2,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      })
    }

    // Add gentle breathing effect when open
    let breathingAnimation: gsap.core.Tween | null = null
    
    if (isOpen) {
      breathingAnimation = gsap.to(button, {
        scale: 1.002,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      
      if (breathingAnimation) {
        breathingAnimation.kill()
      }
      
      // Reset scale
      gsap.set(button, { scale: 1 })
    }
  }, [buttonRef, isOpen])
}