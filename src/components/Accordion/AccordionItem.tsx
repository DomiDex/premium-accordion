'use client'

import { useRef, useEffect, memo, useCallback } from 'react'
import { useAccordion } from './AccordionContext'
import { useTimelineAnimation } from './hooks/useTimelineAnimation'
import { useMouseGradient } from './hooks/useMouseGradient'
import { useMicroInteractions } from './hooks/useMicroInteractions'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { useAriaLive } from './hooks/useAriaLive'
import { useResizeObserver } from './hooks/useResizeObserver'
import { getAnimationOptions } from './utils/animation'
import { getElementId } from './utils/dom'
import { ACCORDION_STYLES, GRADIENT_STYLES } from './utils/styles'
import type { AccordionItem as AccordionItemType } from './Accordion'

interface AccordionItemProps {
  item: AccordionItemType
  index: number
  isLast: boolean
}

const AccordionItemComponent = ({ item, index, isLast }: AccordionItemProps) => {
  const { togglePanel, isOpen, animationDuration, easingFunction, totalItems } = useAccordion()
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const open = isOpen(index)
  const { announce } = useAriaLive()

  // Announce state changes for screen readers
  useEffect(() => {
    if (open) {
      announce(`${item.title} expanded`)
    } else {
      announce(`${item.title} collapsed`)
    }
  }, [open, item.title, announce])

  // Add mouse gradient effect
  useMouseGradient(buttonRef)
  
  // Add micro-interactions
  useMicroInteractions(buttonRef, open)
  
  // Add keyboard navigation
  useKeyboardNavigation({
    buttonRef,
    index,
    totalItems,
    togglePanel,
    isOpen: open,
    disabled: item.disabled
  })

  // Use coordinated timeline animation
  const animationConfig = getAnimationOptions(animationDuration, easingFunction)
  useTimelineAnimation(
    contentRef, 
    iconRef, 
    buttonRef,
    open, 
    {
      ...animationConfig,
      stagger: true
    }
  )
  
  // Handle dynamic content resizing
  useResizeObserver(contentRef, {
    isOpen: open,
    onResize: () => {
      // Content resized, animation will be handled by the hook
    }
  })

  const handleClick = useCallback(() => {
    if (!item.disabled) {
      togglePanel(index)
    }
  }, [item.disabled, togglePanel, index])

  return (
    <div
      className={`
        ${ACCORDION_STYLES.itemWrapper}
        ${isLast ? 'border-b-0' : ''}
        data-[state=open]:bg-gradient-to-r
        data-[state=open]:from-transparent
        data-[state=open]:to-blue-500/5
      `}
      data-state={open ? 'open' : 'closed'}
    >
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={item.disabled}
        type="button"
        role="button"
        aria-expanded={open}
        aria-controls={getElementId('panel', item.id)}
        aria-describedby={item.subtitle ? getElementId('subtitle', item.id) : undefined}
        id={getElementId('header', item.id)}
        data-accordion-trigger={index}
        tabIndex={0}
        className={`
          ${ACCORDION_STYLES.button.base}
          ${GRADIENT_STYLES.beforeGradient}
          ${GRADIENT_STYLES.afterMouseGradient}
          ${ACCORDION_STYLES.button.hover}
          hover:before:opacity-100
          hover:after:opacity-100
          ${ACCORDION_STYLES.button.focus}
          ${open ? `${ACCORDION_STYLES.button.active} before:opacity-50` : ''}
          ${item.disabled ? ACCORDION_STYLES.button.disabled : 'cursor-pointer'}
        `}
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
            className={`
              ${ACCORDION_STYLES.icon.wrapper}
              ${open ? ACCORDION_STYLES.icon.open : ACCORDION_STYLES.icon.closed}
              ${ACCORDION_STYLES.icon.hover}
            `}
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
              {open ? 'Collapse' : 'Expand'} {item.title}
            </span>
          </div>
        </div>
      </button>

      <div
        ref={contentRef}
        id={getElementId('panel', item.id)}
        role="region"
        aria-labelledby={getElementId('header', item.id)}
        aria-hidden={!open}
        className={`
          ${ACCORDION_STYLES.content.wrapper}
          before:content-['']
          before:absolute
          before:inset-x-8
          before:top-0
          before:h-px
          before:bg-gradient-to-r
          before:from-transparent
          before:via-blue-500/20
          before:to-transparent
        `}
        style={{
          height: 0,
        }}
      >
        <div className={ACCORDION_STYLES.content.inner}>
          {item.content}
        </div>
      </div>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const AccordionItem = memo(AccordionItemComponent, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.disabled === nextProps.item.disabled &&
    prevProps.index === nextProps.index &&
    prevProps.isLast === nextProps.isLast
  )
})