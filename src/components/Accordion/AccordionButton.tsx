'use client'

import { forwardRef, RefObject } from 'react'
import { ACCORDION_STYLES, getButtonClasses, getIconClasses, cn } from './utils/styles'
import { getElementId } from './utils/dom'
import type { AccordionItem } from './Accordion'

interface AccordionButtonProps {
  item: AccordionItem
  index: number
  isOpen: boolean
  onClick: () => void
  iconRef: RefObject<HTMLDivElement | null>
}

export const AccordionButton = forwardRef<HTMLButtonElement, AccordionButtonProps>(
  ({ item, index, isOpen, onClick, iconRef }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={item.disabled}
        type="button"
        role="button"
        aria-expanded={isOpen}
        aria-controls={getElementId('panel', item.id)}
        aria-describedby={item.subtitle ? getElementId('subtitle', item.id) : undefined}
        id={getElementId('header', item.id)}
        data-accordion-trigger={index}
        tabIndex={0}
        className={getButtonClasses(isOpen, item.disabled)}
      >
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className={ACCORDION_STYLES.text.title}>
              {item.title}
            </h3>
            {item.subtitle && (
              <p 
                id={getElementId('subtitle', item.id)}
                className={ACCORDION_STYLES.text.subtitle}
              >
                {item.subtitle}
              </p>
            )}
          </div>
          <div
            ref={iconRef}
            className={getIconClasses(isOpen)}
            aria-hidden="true"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="transition-colors duration-300"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">
              {isOpen ? 'Collapse' : 'Expand'} {item.title}
            </span>
          </div>
        </div>
      </button>
    )
  }
)

AccordionButton.displayName = 'AccordionButton'