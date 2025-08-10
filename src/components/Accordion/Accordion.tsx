'use client'

import { forwardRef } from 'react'
import { AccordionProvider } from './AccordionContext'
import { AccordionItem } from './AccordionItem'

export interface AccordionItem {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  mode?: 'single' | 'multiple'
  defaultOpen?: number | number[]
  animationDuration?: number
  easingFunction?: string
  scrollBehavior?: boolean
  scrollOffset?: number
  className?: string
  onToggle?: (index: number, isOpen: boolean) => void
}

export interface AccordionRef {
  open: (index: number) => void
  close: (index: number) => void
  toggle: (index: number) => void
  openAll: () => void
  closeAll: () => void
  refresh: () => void
}

export const Accordion = forwardRef<AccordionRef, AccordionProps>(
  ({ items, mode = 'single', className = '', ...props }, ref) => {
    return (
      <AccordionProvider mode={mode} ref={ref} {...props}>
        <div
          className={`
            bg-accordion-bg/50 
            backdrop-blur-glass 
            border border-accordion-border 
            rounded-2xl 
            overflow-hidden
            shadow-2xl shadow-black/50
            ${className}
          `}
        >
          {items.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === items.length - 1}
            />
          ))}
        </div>
      </AccordionProvider>
    )
  }
)

Accordion.displayName = 'Accordion'