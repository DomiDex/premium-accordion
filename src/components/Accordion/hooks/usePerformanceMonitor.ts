import { useEffect, useRef } from 'react'

export const usePerformanceMonitor = (componentName: string) => {
  const renderCount = useRef(0)
  const lastRenderTime = useRef(performance.now())

  useEffect(() => {
    renderCount.current++
    const currentTime = performance.now()
    const timeSinceLastRender = currentTime - lastRenderTime.current
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      // Log if component renders too frequently (< 16ms apart)
      if (timeSinceLastRender < 16 && renderCount.current > 1) {
        console.warn(
          `[Performance] ${componentName} rendered too quickly: ${timeSinceLastRender.toFixed(2)}ms since last render`
        )
      }
    }
    
    lastRenderTime.current = currentTime
  })

  // Monitor FPS during animations
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      // Calculate FPS every second
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        // Warn if FPS drops below 55
        if (fps < 55) {
          console.warn(`[Performance] Low FPS detected in ${componentName}: ${fps}fps`)
        }
        
        frameCount = 0
        lastTime = currentTime
      }
      
      rafId = requestAnimationFrame(measureFPS)
    }

    rafId = requestAnimationFrame(measureFPS)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [componentName])

  return {
    renderCount: renderCount.current
  }
}