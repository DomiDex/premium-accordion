import { useEffect, useRef, RefObject } from 'react'

export const useMouseGradient = (ref: RefObject<HTMLButtonElement>) => {
  const rafRef = useRef<number>()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!element) return
        
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        element.style.setProperty('--mouse-x', `${x}px`)
        element.style.setProperty('--mouse-y', `${y}px`)
      })
    }

    const handleMouseLeave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      element.style.setProperty('--mouse-x', '50%')
      element.style.setProperty('--mouse-y', '50%')
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])
}