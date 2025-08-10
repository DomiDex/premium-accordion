import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'

interface UseResizeObserverOptions {
  isOpen: boolean
  onResize?: (entry: ResizeObserverEntry) => void
}

export const useResizeObserver = (
  contentRef: RefObject<HTMLDivElement>,
  options: UseResizeObserverOptions
) => {
  const observerRef = useRef<ResizeObserver | null>(null)
  const previousHeight = useRef<number>(0)
  const { isOpen, onResize } = options

  useEffect(() => {
    if (!contentRef.current) return

    const content = contentRef.current

    // Create ResizeObserver to handle dynamic content changes
    observerRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect
        
        // Only update if open and height changed significantly (> 1px)
        if (isOpen && Math.abs(height - previousHeight.current) > 1) {
          // Smoothly animate to new height
          gsap.to(content, {
            height: 'auto',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          })
          
          previousHeight.current = height
          onResize?.(entry)
        }
      }
    })

    // Observe the inner content for size changes
    const inner = content.querySelector('.accordion-content-inner')
    if (inner) {
      observerRef.current.observe(inner)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [contentRef, isOpen, onResize])

  // Update previous height when open state changes
  useEffect(() => {
    if (!isOpen) {
      previousHeight.current = 0
    }
  }, [isOpen])

  return {
    observer: observerRef.current
  }
}