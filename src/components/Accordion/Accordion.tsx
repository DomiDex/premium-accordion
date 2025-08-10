'use client'

import { forwardRef } from 'react'
import { AccordionProvider } from './AccordionContext'
import { AccordionItem } from './AccordionItem'
import { ACCORDION_STYLES, cn } from './utils/styles'
import type { AccordionProps, AccordionRef } from './types/accordion.types'

// Re-export types for backward compatibility
export type { AccordionItemData as AccordionItem, AccordionProps, AccordionRef } from './types/accordion.types'

export const Accordion = forwardRef<AccordionRef, AccordionProps>(
  (props, ref) => {
    const { items, mode = 'single', className = '', ...restProps } = props
    return (
      <AccordionProvider mode={mode} ref={ref} totalItems={items.length} {...restProps}>
        <div
          className={cn(
            ACCORDION_STYLES.container,
            "before:content-['']",
            'before:absolute',
            'before:inset-0',
            'before:bg-gradient-to-b',
            'before:from-white/[0.05]',
            'before:to-transparent',
            'before:pointer-events-none',
            'before:z-10', // Add z-index to prevent flicker
            "after:content-['']",
            'after:absolute',
            'after:inset-0',
            'after:rounded-2xl',
            'after:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]',
            'after:pointer-events-none',
            'after:z-10', // Add z-index to prevent flicker
            className
          )}
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