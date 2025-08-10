/**
 * Animation configuration constants and utilities
 */

export const ANIMATION_CONFIG = {
  DEFAULT_DURATION: 0.5,
  DEFAULT_EASE: 'power2.out',
  STAGGER_DELAY: 0.05,
  ICON_DURATION: 0.3,
  ICON_EASE: 'power2.inOut',
  CONTENT_FADE_RATIO: 0.6,
  OVERLAP_TIMING: 0.4,
} as const

/**
 * Get normalized animation options from milliseconds to seconds
 */
export const getAnimationOptions = (
  durationMs?: number,
  ease?: string
) => ({
  duration: durationMs ? durationMs / 1000 : ANIMATION_CONFIG.DEFAULT_DURATION,
  ease: ease || ANIMATION_CONFIG.DEFAULT_EASE,
})

/**
 * Calculate stagger delay for multiple elements
 */
export const getStaggerDelay = (index: number): number => 
  index * ANIMATION_CONFIG.STAGGER_DELAY