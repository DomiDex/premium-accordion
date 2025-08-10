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

// Keyboard codes for navigation
export const KEYBOARD_CODES = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  ENTER: 'Enter',
  SPACE: ' ',
} as const

// Component display names
export const DISPLAY_NAMES = {
  ACCORDION: 'Accordion',
  ACCORDION_ITEM: 'AccordionItem',
  ACCORDION_BUTTON: 'AccordionButton',
  ACCORDION_CONTENT: 'AccordionContent',
} as const

// Accessibility
export const ARIA_LABELS = {
  EXPAND: 'Expand',
  COLLAPSE: 'Collapse',
} as const

// CSS transition durations (in ms)
export const TRANSITION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const

// Type definitions
export type AccordionMode = typeof ACCORDION_MODES[keyof typeof ACCORDION_MODES]
export type KeyboardCode = typeof KEYBOARD_CODES[keyof typeof KEYBOARD_CODES]