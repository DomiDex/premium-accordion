import { set } from './gsap'

/**
 * DOM manipulation utilities
 */

/**
 * Generate consistent element IDs
 */
export const getElementId = (type: 'header' | 'panel' | 'subtitle', id: string): string => 
  `${type}-${id}`

/**
 * Set will-change property for performance optimization
 */
export const setWillChange = (
  element: HTMLElement | null, 
  properties: string
): void => {
  if (!element) return
  set(element, { willChange: properties })
}

/**
 * Clear will-change property after animation
 */
export const clearWillChange = (element: HTMLElement | null): void => {
  if (!element) return
  set(element, { clearProps: 'will-change' })
}

/**
 * Set multiple will-change properties
 */
export const setMultipleWillChange = (
  elements: Record<string, HTMLElement | null>,
  properties: Record<string, string>
): void => {
  Object.entries(elements).forEach(([key, element]) => {
    if (element && properties[key]) {
      setWillChange(element, properties[key])
    }
  })
}

/**
 * Clear will-change from multiple elements
 */
export const clearMultipleWillChange = (
  elements: (HTMLElement | null)[]
): void => {
  elements.forEach(element => clearWillChange(element))
}