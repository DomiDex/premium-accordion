/**
 * Style constants and class name utilities
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ACCORDION_STYLES = {
  // Container styles
  container: cn(
    'relative',
    'bg-[#111111]/50',
    'backdrop-blur-[10px]',
    'border border-white/[0.08]',
    'rounded-2xl',
    'overflow-hidden',
    'shadow-2xl shadow-black/50',
    'isolate' // Prevents rendering issues with pseudo-elements
  ),

  // Item wrapper
  itemWrapper: cn(
    'border-b border-white/[0.06]',
    'transition-all duration-300',
    'group',
    'relative',
    'z-0' // Ensure proper stacking context
  ),

  // Button base styles
  button: {
    base: cn(
      'relative',
      'w-full',
      'px-8 py-6',
      'text-left',
      'bg-transparent',
      'transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)',
      'overflow-hidden',
      'transform-gpu', // Force GPU acceleration
      'backface-hidden', // Prevent flickering
      'isolate' // Create new stacking context
    ),
    hover: 'hover:bg-[#1A1A1A]/60',
    active: 'bg-[#222222]/50',
    disabled: 'opacity-50 cursor-not-allowed hover:bg-transparent',
    focus: cn(
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-blue-500',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-black'
    ),
  },

  // Content styles
  content: {
    wrapper: 'overflow-hidden relative',
    inner: 'accordion-content-inner px-8 pb-6 pt-4 text-gray-300 relative',
  },

  // Icon styles
  icon: {
    wrapper: 'transition-all duration-300 ease-out',
    open: 'text-blue-400',
    closed: 'text-gray-400',
    hover: 'group-hover:text-blue-300',
  },

  // Text styles
  text: {
    title: 'text-lg font-medium text-white transition-colors duration-300 group-hover:text-blue-100',
    subtitle: 'mt-1 text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300',
  },
} as const

// Pseudo-element styles for gradients
export const GRADIENT_STYLES = {
  beforeGradient: cn(
    "before:content-['']",
    'before:absolute',
    'before:inset-0',
    'before:bg-gradient-to-r',
    'before:from-transparent',
    'before:via-blue-500/10',
    'before:to-transparent',
    'before:opacity-0',
    'before:transition-opacity',
    'before:duration-300',
    'before:will-change-[opacity]', // Optimize for opacity changes
    'before:z-0' // Ensure proper stacking
  ),
  afterMouseGradient: cn(
    "after:content-['']",
    'after:absolute',
    'after:inset-0',
    'after:bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(59,130,246,0.15),transparent_40%)]',
    'after:opacity-0',
    'after:transition-opacity',
    'after:duration-300',
    'after:will-change-[opacity]', // Optimize for opacity changes
    'after:z-0' // Ensure proper stacking
  ),
} as const

/**
 * Helper functions for dynamic class composition
 */
export const getButtonClasses = (isOpen: boolean, disabled?: boolean) => {
  return cn(
    ACCORDION_STYLES.button.base,
    GRADIENT_STYLES.beforeGradient,
    GRADIENT_STYLES.afterMouseGradient,
    ACCORDION_STYLES.button.hover,
    'hover:before:opacity-100',
    'hover:after:opacity-100',
    ACCORDION_STYLES.button.focus,
    isOpen && cn(ACCORDION_STYLES.button.active, 'before:opacity-50'),
    disabled && ACCORDION_STYLES.button.disabled
  )
}

export const getIconClasses = (isOpen: boolean) => {
  return cn(
    ACCORDION_STYLES.icon.wrapper,
    isOpen ? ACCORDION_STYLES.icon.open : ACCORDION_STYLES.icon.closed,
    ACCORDION_STYLES.icon.hover
  )
}

export const getItemWrapperClasses = (isLast: boolean) => {
  return cn(
    ACCORDION_STYLES.itemWrapper,
    isLast && 'border-b-0',
    'data-[state=open]:bg-gradient-to-r',
    'data-[state=open]:from-transparent',
    'data-[state=open]:to-blue-500/5'
  )
}

export const getContentClasses = () => {
  return cn(
    ACCORDION_STYLES.content.wrapper,
    "before:content-['']",
    'before:absolute',
    'before:inset-x-8',
    'before:top-0',
    'before:h-px',
    'before:bg-gradient-to-r',
    'before:from-transparent',
    'before:via-blue-500/20',
    'before:to-transparent'
  )
}