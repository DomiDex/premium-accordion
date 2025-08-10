import { useEffect, RefObject } from 'react'
import gsap from 'gsap'

export const useStaggerAnimation = (
  contentRef: RefObject<HTMLDivElement>,
  isOpen: boolean,
  delay: number = 0
) => {
  useEffect(() => {
    if (!contentRef.current) return

    const elements = contentRef.current.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6')
    
    if (elements.length === 0) return

    if (isOpen) {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          delay,
        }
      )
    } else {
      gsap.to(elements, {
        opacity: 0,
        y: -5,
        duration: 0.2,
        stagger: 0.02,
        ease: 'power2.in',
      })
    }

    return () => {
      gsap.killTweensOf(elements)
    }
  }, [isOpen, contentRef, delay])
}