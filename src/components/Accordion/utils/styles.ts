/**
 * Style constants and class name utilities
 */

export const ACCORDION_STYLES = {
  // Container styles
  container: `
    relative
    bg-[#111111]/50
    backdrop-blur-[10px]
    border border-white/[0.08]
    rounded-2xl
    overflow-hidden
    shadow-2xl shadow-black/50
  `.trim(),

  // Item wrapper
  itemWrapper: `
    border-b border-white/[0.06]
    transition-all duration-300
    group
  `.trim(),

  // Button base styles
  button: {
    base: `
      relative
      w-full
      px-8 py-6
      text-left
      bg-transparent
      transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
      overflow-hidden
    `.trim(),
    
    hover: 'hover:bg-[#1A1A1A]/60',
    active: 'bg-[#222222]/50',
    disabled: 'opacity-50 cursor-not-allowed hover:bg-transparent',
    focus: `
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-blue-500
      focus-visible:ring-offset-2
      focus-visible:ring-offset-black
    `.trim(),
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

// Common transition classes
export const TRANSITIONS = {
  fast: 'transition-all duration-200',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
  smooth: 'transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// Pseudo-element styles for gradients
export const GRADIENT_STYLES = {
  beforeGradient: `
    before:content-['']
    before:absolute
    before:inset-0
    before:bg-gradient-to-r
    before:from-transparent
    before:via-blue-500/10
    before:to-transparent
    before:opacity-0
    before:transition-opacity
    before:duration-300
  `.trim(),
  
  afterMouseGradient: `
    after:content-['']
    after:absolute
    after:inset-0
    after:bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(59,130,246,0.15),transparent_40%)]
    after:opacity-0
    after:transition-opacity
    after:duration-300
  `.trim(),
} as const