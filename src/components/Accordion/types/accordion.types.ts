import { ReactNode, RefObject, MouseEvent, KeyboardEvent } from 'react'

/**
 * Accordion mode types
 */
export const ACCORDION_MODES = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
} as const

export type AccordionMode = typeof ACCORDION_MODES[keyof typeof ACCORDION_MODES]

/**
 * Animation easing types
 */
export const ANIMATION_EASINGS = {
  POWER2_OUT: 'power2.out',
  POWER2_IN: 'power2.in',
  POWER2_IN_OUT: 'power2.inOut',
  ELASTIC_OUT: 'elastic.out',
  BACK_OUT: 'back.out',
  SINE_IN_OUT: 'sine.inOut',
} as const

export type AnimationEasing = typeof ANIMATION_EASINGS[keyof typeof ANIMATION_EASINGS]

/**
 * Accordion item data structure
 */
export interface AccordionItemData {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly content: ReactNode
  readonly icon?: ReactNode
  readonly disabled?: boolean
}

/**
 * Animation configuration
 */
export interface AccordionAnimationConfig {
  duration: number // in milliseconds
  ease: AnimationEasing
  stagger: boolean
  enableMicroInteractions: boolean
}

/**
 * Accordion refs structure
 */
export interface AccordionRefs {
  content: HTMLDivElement | null
  button: HTMLButtonElement | null
  icon: HTMLDivElement | null
}

/**
 * Accordion state
 */
export type AccordionState = 
  | { status: 'idle' }
  | { status: 'opening'; panelIndex: number }
  | { status: 'closing'; panelIndex: number }
  | { status: 'animating'; panelIndex: number }

/**
 * Event handlers
 */
export type AccordionMouseEventHandler = (event: MouseEvent<HTMLButtonElement>) => void
export type AccordionKeyboardEventHandler = (event: KeyboardEvent<HTMLButtonElement>) => void
export type AccordionEventHandler = AccordionMouseEventHandler | AccordionKeyboardEventHandler

/**
 * Accordion context value
 */
export interface AccordionContextValue {
  mode: AccordionMode
  openPanels: ReadonlyArray<number>
  togglePanel: (index: number) => void
  isOpen: (index: number) => boolean
  animationDuration: number
  easingFunction: AnimationEasing
  totalItems: number
}

/**
 * Accordion provider props
 */
export interface AccordionProviderProps {
  children: ReactNode
  mode: AccordionMode
  defaultOpen?: number | number[]
  onToggle?: (index: number, isOpen: boolean) => void
  animationDuration?: number
  easingFunction?: AnimationEasing
  totalItems: number
}

/**
 * Accordion component props
 */
export interface AccordionProps {
  items: AccordionItemData[]
  mode?: AccordionMode
  defaultOpen?: number | number[]
  animationDuration?: number
  easingFunction?: AnimationEasing
  className?: string
  onToggle?: (index: number, isOpen: boolean) => void
}

/**
 * Accordion ref methods
 */
export interface AccordionRef {
  open: (index: number) => void
  close: (index: number) => void
  toggle: (index: number) => void
  openAll: () => void
  closeAll: () => void
  refresh: () => void
}

/**
 * Hook options
 */
export interface UseAccordionAnimationOptions {
  duration?: number
  ease?: AnimationEasing
  stagger?: boolean
  enableMicroInteractions?: boolean
}

export interface UseAccordionInteractionsOptions {
  isOpen?: boolean
  disabled?: boolean
}

export interface UseKeyboardNavigationProps {
  buttonRef: RefObject<HTMLButtonElement | null>
  index: number
  totalItems: number
  togglePanel: (index: number) => void
  isOpen: boolean
  disabled?: boolean
}

/**
 * Type guards
 */
export const isAccordionMode = (value: unknown): value is AccordionMode => {
  return value === ACCORDION_MODES.SINGLE || value === ACCORDION_MODES.MULTIPLE
}

export const isAnimationEasing = (value: unknown): value is AnimationEasing => {
  return Object.values(ANIMATION_EASINGS).includes(value as AnimationEasing)
}

export const isAccordionItemData = (value: unknown): value is AccordionItemData => {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    (item.subtitle === undefined || typeof item.subtitle === 'string') &&
    item.content !== undefined &&
    (item.disabled === undefined || typeof item.disabled === 'boolean')
  )
}

