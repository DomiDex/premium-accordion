'use client'

import { useRef, useEffect, useState } from 'react'
import { useAccordion } from './AccordionContext'
import type { AccordionItem as AccordionItemType } from './Accordion'

interface AccordionItemProps {
  item: AccordionItemType
  index: number
  isLast: boolean
}

export const AccordionItem = ({ item, index, isLast }: AccordionItemProps) => {
  const { togglePanel, isOpen } = useAccordion()
  const contentRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const open = isOpen(index)

  const handleClick = () => {
    if (!isAnimating && !item.disabled) {
      togglePanel(index)
    }
  }

  return (
    <div
      className={`
        border-b border-white/[0.06]
        ${isLast ? 'border-b-0' : ''}
        transition-all duration-300
        group
      `}
    >
      <button
        onClick={handleClick}
        disabled={item.disabled}
        aria-expanded={open}
        aria-controls={`panel-${item.id}`}
        id={`header-${item.id}`}
        className={`
          w-full
          px-8 py-6
          text-left
          bg-accordion-bg/30
          transition-all duration-300 ease-out
          hover:bg-accordion-bg-hover/60
          hover:border-l-2 hover:border-l-blue-500
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2
          focus-visible:ring-offset-black
          ${open ? 'bg-accordion-bg-active/50 border-l-4 border-l-blue-500' : ''}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="mt-1 text-sm text-gray-400">
                {item.subtitle}
              </p>
            )}
          </div>
          <div
            className={`
              transition-transform duration-300 ease-out
              ${open ? 'rotate-180' : ''}
            `}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gray-400"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </button>

      <div
        ref={contentRef}
        id={`panel-${item.id}`}
        role="region"
        aria-labelledby={`header-${item.id}`}
        aria-hidden={!open}
        className={`
          overflow-hidden
          transition-all duration-500 ease-out
          ${open ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: open ? 'auto' : '0',
        }}
      >
        <div className="px-8 pb-6 pt-2 text-gray-300">
          {item.content}
        </div>
      </div>
    </div>
  )
}