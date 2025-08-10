import { useEffect, RefObject, useCallback, useMemo } from 'react'
import { rafThrottle } from '../utils/performance'
import type { UseAccordionInteractionsOptions } from '../types/accordion.types'

export const useAccordionInteractions = (
  buttonRef: RefObject<HTMLButtonElement | null>,
  options: UseAccordionInteractionsOptions = {}
): {
  handlers: {
    onMouseMove: (e: MouseEvent) => void
    onMouseLeave: () => void
    onFocus: () => void
    onBlur: () => void
    onTouchStart: () => void
    onTouchEnd: () => void
  }
  isOpen: boolean
  disabled: boolean
} => {
  const { isOpen = false, disabled = false } = options

  // Mouse gradient effect - throttled with RAF for performance
  const handleMouseMoveRaw = useCallback((e: MouseEvent) => {
    if (disabled) return
    
    const element = buttonRef.current
    if (!element) return
    
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    element.style.setProperty('--mouse-x', `${x}px`)
    element.style.setProperty('--mouse-y', `${y}px`)
  }, [disabled, buttonRef])
  
  // Throttle mouse move with RAF for 60fps
  const handleMouseMove = useMemo(
    () => rafThrottle(handleMouseMoveRaw),
    [handleMouseMoveRaw]
  )

  const handleMouseLeave = useCallback(() => {
    const element = buttonRef.current
    if (!element) return
    
    element.style.setProperty('--mouse-x', '50%')
    element.style.setProperty('--mouse-y', '50%')
  }, [buttonRef])

  // Keyboard focus visual feedback
  const handleFocus = useCallback(() => {
    const element = buttonRef.current
    if (!element || disabled) return
    
    element.setAttribute('data-focus', 'true')
  }, [disabled, buttonRef])

  const handleBlur = useCallback(() => {
    const element = buttonRef.current
    if (!element) return
    
    element.setAttribute('data-focus', 'false')
  }, [buttonRef])

  // Touch feedback for mobile
  const handleTouchStart = useCallback(() => {
    const element = buttonRef.current
    if (!element || disabled) return
    
    element.setAttribute('data-touch', 'true')
  }, [disabled, buttonRef])

  const handleTouchEnd = useCallback(() => {
    const element = buttonRef.current
    if (!element) return
    
    element.setAttribute('data-touch', 'false')
  }, [buttonRef])

  // Setup all event listeners
  useEffect(() => {
    const element = buttonRef.current
    if (!element) return

    // Mouse events
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    // Focus events
    element.addEventListener('focus', handleFocus)
    element.addEventListener('blur', handleBlur)
    
    // Touch events
    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchend', handleTouchEnd)

    // Initialize CSS variables
    element.style.setProperty('--mouse-x', '50%')
    element.style.setProperty('--mouse-y', '50%')

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('focus', handleFocus)
      element.removeEventListener('blur', handleBlur)
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [buttonRef, handleMouseMove, handleMouseLeave, handleFocus, handleBlur, handleTouchStart, handleTouchEnd])

  return {
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd
    },
    isOpen,
    disabled
  }
}