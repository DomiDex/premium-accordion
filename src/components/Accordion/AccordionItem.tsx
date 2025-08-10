'use client'

import { useRef, useEffect, memo, useCallback } from 'react'
import { useAccordion } from './AccordionContext'
import { useAccordionAnimation } from './hooks/useAccordionAnimation'
import { useAccordionInteractions } from './hooks/useAccordionInteractions'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { useAriaLive } from './hooks/useAriaLive'
import { AccordionButton } from './AccordionButton'
import { AccordionContent } from './AccordionContent'
import { getItemWrapperClasses } from './utils/styles'
import type { AccordionItemData } from './types/accordion.types'

interface AccordionItemProps {
  item: AccordionItemData
  index: number
  isLast: boolean
}

const AccordionItemComponent = ({ item, index, isLast }: AccordionItemProps) => {
  const { togglePanel, isOpen, animationDuration, easingFunction, totalItems } = useAccordion()
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

  // Create individual refs for hooks that need them
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  
  // Use consolidated animation hook
  useAccordionAnimation(
    contentRef,
    iconRef,
    buttonRef,
    open,
    {
      duration: animationDuration ? animationDuration / 1000 : undefined,
      ease: easingFunction,
      stagger: true,
      enableMicroInteractions: true
    }
  )

  // Use consolidated interactions hook
  useAccordionInteractions(buttonRef, {
    isOpen: open,
    disabled: item.disabled
  })
  
  // Add keyboard navigation
  useKeyboardNavigation({
    buttonRef,
    index,
    totalItems,
    togglePanel,
    isOpen: open,
    disabled: item.disabled
  })

  const handleClick = useCallback(() => {
    if (!item.disabled) {
      togglePanel(index)
    }
  }, [item.disabled, togglePanel, index])

  return (
    <div
      className={getItemWrapperClasses(isLast)}
      data-state={open ? 'open' : 'closed'}
    >
      <AccordionButton
        ref={buttonRef}
        item={item}
        index={index}
        isOpen={open}
        onClick={handleClick}
        iconRef={iconRef}
      />
      <AccordionContent
        ref={contentRef}
        item={item}
        isOpen={open}
      />
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const AccordionItem = memo(AccordionItemComponent, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.title === nextProps.item.title &&
    prevProps.item.subtitle === nextProps.item.subtitle &&
    prevProps.item.disabled === nextProps.item.disabled &&
    prevProps.item.content === nextProps.item.content &&
    prevProps.index === nextProps.index &&
    prevProps.isLast === nextProps.isLast
  )
})