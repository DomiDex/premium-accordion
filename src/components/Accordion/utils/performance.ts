/**
 * Performance optimization utilities
 */

/**
 * Request animation frame throttle - ensures function runs at most once per frame
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rafThrottle<T extends (...args: any[]) => any>(
  fn: T
): T {
  let rafId: number | null = null
  
  return ((...args: Parameters<T>) => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
    
    rafId = requestAnimationFrame(() => {
      fn(...args)
      rafId = null
    })
  }) as T
}