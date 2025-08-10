/**
 * Simplified Accordion Configuration Types and Presets
 */

import type { AnimationEasing } from './accordion.types'

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration?: number      // in milliseconds, default: 500
  easing?: AnimationEasing  // default: 'power2.out'
  stagger?: boolean      // default: true
}

/**
 * Scroll behavior configuration
 */
export interface ScrollConfig {
  enabled?: boolean      // default: false
  offset?: number        // default: 100
  smooth?: boolean       // default: true
}

/**
 * Keyboard navigation configuration
 */
export interface KeyboardConfig {
  enabled?: boolean          // default: true
  closeOnEscape?: boolean    // default: false
  wrap?: boolean             // wrap around when reaching ends, default: true
}

/**
 * Accordion configuration object
 */
export interface AccordionConfig {
  animation?: AnimationConfig
  scroll?: ScrollConfig
  keyboard?: KeyboardConfig
  microInteractions?: boolean  // default: true
}

/**
 * Simplified Accordion Item
 */
export interface AccordionItemSimple {
  id: string
  title: string
  content: React.ReactNode
}

/**
 * Extended Accordion Item with metadata
 */
export interface AccordionItemExtended extends AccordionItemSimple {
  metadata?: {
    subtitle?: string
    icon?: React.ReactNode
    disabled?: boolean
    className?: string
  }
}

/**
 * Simplified Accordion Props
 */
export interface AccordionPropsSimplified {
  items: (AccordionItemSimple | AccordionItemExtended)[]
  mode?: 'single' | 'multiple'           // default: 'single'
  defaultOpen?: number | number[]        // default: []
  config?: AccordionConfig               // optional advanced configuration
  onToggle?: (index: number, isOpen: boolean) => void
  className?: string
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: Required<AccordionConfig> = {
  animation: {
    duration: 500,
    easing: 'power2.out',
    stagger: true
  },
  scroll: {
    enabled: false,
    offset: 100,
    smooth: true
  },
  keyboard: {
    enabled: true,
    closeOnEscape: false,
    wrap: true
  },
  microInteractions: true
}

/**
 * Preset configurations for common use cases
 */
export const AccordionPresets = {
  /**
   * Default configuration - balanced performance and aesthetics
   */
  default: DEFAULT_CONFIG,

  /**
   * Fast animations for snappy interactions
   */
  fast: {
    animation: {
      duration: 200,
      easing: 'power2.in' as AnimationEasing,
      stagger: false
    },
    scroll: {
      enabled: false,
      offset: 50,
      smooth: true
    },
    keyboard: {
      enabled: true,
      closeOnEscape: true,
      wrap: true
    },
    microInteractions: false
  },

  /**
   * Smooth, elegant animations
   */
  smooth: {
    animation: {
      duration: 800,
      easing: 'elastic.out' as AnimationEasing,
      stagger: true
    },
    scroll: {
      enabled: true,
      offset: 150,
      smooth: true
    },
    keyboard: {
      enabled: true,
      closeOnEscape: false,
      wrap: false
    },
    microInteractions: true
  },

  /**
   * No animations - for accessibility or performance
   */
  noAnimation: {
    animation: {
      duration: 0,
      easing: 'power2.out' as AnimationEasing,
      stagger: false
    },
    scroll: {
      enabled: false,
      offset: 0,
      smooth: false
    },
    keyboard: {
      enabled: true,
      closeOnEscape: true,
      wrap: true
    },
    microInteractions: false
  },

  /**
   * Minimal configuration - bare essentials
   */
  minimal: {
    animation: {
      duration: 300,
      easing: 'power2.out' as AnimationEasing,
      stagger: false
    },
    scroll: {
      enabled: false,
      offset: 0,
      smooth: false
    },
    keyboard: {
      enabled: false,
      closeOnEscape: false,
      wrap: false
    },
    microInteractions: false
  }
} as const

/**
 * Helper to merge configurations
 */
export function mergeConfig(
  base: AccordionConfig,
  override?: Partial<AccordionConfig>
): Required<AccordionConfig> {
  return {
    animation: {
      ...DEFAULT_CONFIG.animation,
      ...base.animation,
      ...override?.animation
    },
    scroll: {
      ...DEFAULT_CONFIG.scroll,
      ...base.scroll,
      ...override?.scroll
    },
    keyboard: {
      ...DEFAULT_CONFIG.keyboard,
      ...base.keyboard,
      ...override?.keyboard
    },
    microInteractions: override?.microInteractions ?? base.microInteractions ?? DEFAULT_CONFIG.microInteractions
  }
}

/**
 * Convert simplified item to standard format
 */
export function normalizeAccordionItem(
  item: AccordionItemSimple | AccordionItemExtended
): AccordionItemExtended {
  if ('metadata' in item) {
    return item
  }
  
  return {
    ...item,
    metadata: {}
  }
}