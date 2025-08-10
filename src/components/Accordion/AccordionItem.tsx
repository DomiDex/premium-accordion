'use client'

import { useRef, useEffect, memo, useCallback } from 'react'
import { useAccordion } from './AccordionContext'
import { useTimelineAnimation } from './hooks/useTimelineAnimation'
import { useMouseGradient } from './hooks/useMouseGradient'
import { useMicroInteractions } from './hooks/useMicroInteractions'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { useAriaLive } from './hooks/useAriaLive'
import { useResizeObserver } from './hooks/useResizeObserver'
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
  useTimelineAnimation(
    contentRef, 
    iconRef, 
    buttonRef,
    open, 
    {
      duration: animationDuration ? animationDuration / 1000 : 0.5,
      ease: easingFunction || 'power2.out',
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
        border-b border-white/[0.06]
        ${isLast ? 'border-b-0' : ''}
        transition-all duration-300
        group
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
        aria-controls={`panel-${item.id}`}
        aria-describedby={item.subtitle ? `subtitle-${item.id}` : undefined}
        id={`header-${item.id}`}
        data-accordion-trigger={index}
        tabIndex={0}
        className={`
          relative
          w-full
          px-8 py-6
          text-left
          bg-transparent
          transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
          overflow-hidden
          
          before:content-['']
          before:absolute
          before:inset-0
          before:bg-gradient-to-r
          before:from-transparent
          before:via-blue-500/10
          before:to-transparent
          before:opacity-0
          before:transition-opacity
          before:duration-300
          
          after:content-['']
          after:absolute
          after:inset-0
          after:bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(59,130,246,0.15),transparent_40%)]
          after:opacity-0
          after:transition-opacity
          after:duration-300
          
          hover:bg-[#1A1A1A]/60
          hover:before:opacity-100
          hover:after:opacity-100
          
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2
          focus-visible:ring-offset-black
          
          ${open ? 'bg-[#222222]/50 before:opacity-50' : ''}
          ${item.disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}
        `}
      >
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white transition-colors duration-300 group-hover:text-blue-100">
              {item.title}
            </h3>
            {item.subtitle && (
              <p 
                id={`subtitle-${item.id}`}
                className="mt-1 text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
              >
                {item.subtitle}
              </p>
            )}
          </div>
          <div
            ref={iconRef}
            className={`
              transition-all duration-300 ease-out
              ${open ? 'text-blue-400' : 'text-gray-400'}
              group-hover:text-blue-300
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
        id={`panel-${item.id}`}
        role="region"
        aria-labelledby={`header-${item.id}`}
        aria-hidden={!open}
        className="
          overflow-hidden
          relative
          before:content-['']
          before:absolute
          before:inset-x-8
          before:top-0
          before:h-px
          before:bg-gradient-to-r
          before:from-transparent
          before:via-blue-500/20
          before:to-transparent
        "
        style={{
          height: 0,
        }}
      >
        <div className="
          accordion-content-inner 
          px-8 pb-6 pt-4 
          text-gray-300
          relative
        ">
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