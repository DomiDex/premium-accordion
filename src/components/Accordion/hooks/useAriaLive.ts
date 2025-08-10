import { useEffect, useRef } from 'react'

export const useAriaLive = () => {
  const liveRegionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Create a visually hidden live region for announcements
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('role', 'status')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.style.position = 'absolute'
    liveRegion.style.width = '1px'
    liveRegion.style.height = '1px'
    liveRegion.style.padding = '0'
    liveRegion.style.margin = '-1px'
    liveRegion.style.overflow = 'hidden'
    liveRegion.style.clip = 'rect(0, 0, 0, 0)'
    liveRegion.style.whiteSpace = 'nowrap'
    liveRegion.style.borderWidth = '0'
    
    document.body.appendChild(liveRegion)
    liveRegionRef.current = liveRegion

    return () => {
      if (liveRegionRef.current && document.body.contains(liveRegionRef.current)) {
        document.body.removeChild(liveRegionRef.current)
      }
    }
  }, [])

  const announce = (message: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message
      // Clear after announcement
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = ''
        }
      }, 1000)
    }
  }

  return { announce }
}