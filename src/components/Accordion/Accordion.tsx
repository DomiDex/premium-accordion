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
      <AccordionProvider mode={mode} ref={ref} totalItems={items.length} {...props}>
        <div
          className={`
            relative
            bg-[#111111]/50
            backdrop-blur-[10px]
            border border-white/[0.08]
            rounded-2xl
            overflow-hidden
            shadow-2xl shadow-black/50
            
            before:content-['']
            before:absolute
            before:inset-0
            before:bg-gradient-to-b
            before:from-white/[0.05]
            before:to-transparent
            before:pointer-events-none
            
            after:content-['']
            after:absolute
            after:inset-0
            after:rounded-2xl
            after:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
            after:pointer-events-none
            
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