/**
 * Accordion component exports
 */

// Main component export
export { Accordion } from './Accordion'

// Legacy type exports (for backward compatibility)
export type { 
  AccordionItem,
  AccordionProps,
  AccordionRef 
} from './Accordion'

// New simplified API exports
export type {
  AccordionPropsSimplified,
  AccordionItemSimple,
  AccordionItemExtended,
  AccordionConfig,
  AnimationConfig,
  ScrollConfig,
  KeyboardConfig
} from './types/accordion.config'

// Preset configurations
export { 
  AccordionPresets,
  DEFAULT_CONFIG,
  mergeConfig,
  normalizeAccordionItem
} from './types/accordion.config'

// Hooks
export { 
  useAccordion,
  useAccordionItem,
  useAccordionAnimationState
} from './hooks/useAccordion'

// Type exports
export type {
  AccordionMode,
  AnimationEasing,
  AccordionItemData
} from './types/accordion.types'
export type { AccordionAPI } from './hooks/useAccordion'

// Utility exports for external use
export { cn } from './utils/styles'
export { ANIMATION_DEFAULTS } from './utils/constants'