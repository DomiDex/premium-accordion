/**
 * Centralized GSAP imports to reduce bundle size
 * Only import what we actually use
 */

import { gsap } from 'gsap'

// Export only the methods we use
export const { 
  timeline,
  set,
  to
} = gsap

// Export gsap for cases where we need the full object
export { gsap }

// Performance configuration
if (typeof window !== 'undefined') {
  // Optimize GSAP for better performance
  gsap.config({
    force3D: true, // Force hardware acceleration
    nullTargetWarn: false, // Disable warnings for null targets in production
  })
}