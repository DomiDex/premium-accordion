/**
 * Centralized constants for the Accordion component
 */

// Animation defaults
export const ANIMATION_DEFAULTS = {
  DURATION_MS: 500,
  EASE: 'power2.out',
  STAGGER: true,
  ENABLE_MICRO_INTERACTIONS: true,
} as const

// Accordion modes
export const ACCORDION_MODES = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
} as const

// Type definitions
export type AccordionMode = typeof ACCORDION_MODES[keyof typeof ACCORDION_MODES]