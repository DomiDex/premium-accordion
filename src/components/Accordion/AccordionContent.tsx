'use client'

import { forwardRef } from 'react'
import { ACCORDION_STYLES, getContentClasses } from './utils/styles'
import { getElementId } from './utils/dom'
import type { AccordionItem } from './Accordion'

interface AccordionContentProps {
  item: AccordionItem
  isOpen: boolean
}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ item, isOpen }, ref) => {
    return (
      <div
        ref={ref}
        id={getElementId('panel', item.id)}
        role="region"
        aria-labelledby={getElementId('header', item.id)}
        aria-hidden={!isOpen}
        className={getContentClasses()}
        style={{
          height: 0,
        }}
      >
        <div className={ACCORDION_STYLES.content.inner}>
          {item.content}
        </div>
      </div>
    )
  }
)

AccordionContent.displayName = 'AccordionContent'