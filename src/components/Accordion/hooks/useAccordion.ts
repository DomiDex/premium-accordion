/**
 * Simplified public API for accordion hooks
 */

import { useAccordion as useAccordionContext } from '../AccordionContext'

/**
 * Simplified accordion state and methods
 */
export interface AccordionAPI {
  // State
  openPanels: ReadonlyArray<number>
  mode: 'single' | 'multiple'
  
  // Methods
  toggle: (index: number) => void
  open: (index: number) => void
  close: (index: number) => void
  isOpen: (index: number) => boolean
  
  // Config
  config: {
    animation: {
      duration: number
      easing: string
    }
  }
}

/**
 * Public hook for consuming accordion state
 * Provides a simplified, stable API
 */
export function useAccordion(): AccordionAPI {
  const context = useAccordionContext()
  
  return {
    // State
    openPanels: context.openPanels,
    mode: context.mode,
    
    // Methods
    toggle: context.togglePanel,
    open: (index: number) => {
      if (!context.isOpen(index)) {
        context.togglePanel(index)
      }
    },
    close: (index: number) => {
      if (context.isOpen(index)) {
        context.togglePanel(index)
      }
    },
    isOpen: context.isOpen,
    
    // Config
    config: {
      animation: {
        duration: context.animationDuration,
        easing: context.easingFunction
      }
    }
  }
}

/**
 * Hook for accordion item state
 */
export function useAccordionItem(index: number) {
  const accordion = useAccordion()
  
  return {
    isOpen: accordion.isOpen(index),
    toggle: () => accordion.toggle(index),
    open: () => accordion.open(index),
    close: () => accordion.close(index)
  }
}

/**
 * Hook for accordion animations
 */
export function useAccordionAnimationState() {
  const { config } = useAccordion()
  
  return {
    duration: config.animation.duration,
    easing: config.animation.easing,
    isAnimating: false // Could be tracked if needed
  }
}