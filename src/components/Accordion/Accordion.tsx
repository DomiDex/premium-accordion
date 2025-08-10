'use client'

import { forwardRef } from 'react'
import { AccordionProvider } from './AccordionContext'
import { AccordionItem } from './AccordionItem'
import { ACCORDION_STYLES, cn } from './utils/styles'
import type { AccordionProps, AccordionRef, AccordionItemData } from './types/accordion.types'
import type { AccordionPropsSimplified, AccordionItemExtended } from './types/accordion.config'
import { normalizeAccordionItem, mergeConfig, DEFAULT_CONFIG } from './types/accordion.config'

// Re-export types for backward compatibility
export type { AccordionItemData as AccordionItem, AccordionProps, AccordionRef } from './types/accordion.types'

// Support both old and new API
type CombinedAccordionProps = AccordionProps | AccordionPropsSimplified

function isSimplifiedProps(props: CombinedAccordionProps): props is AccordionPropsSimplified {
  return 'config' in props || !('animationDuration' in props || 'easingFunction' in props)
}

function normalizeProps(props: CombinedAccordionProps): AccordionProps {
  if (isSimplifiedProps(props)) {
    const config = mergeConfig(DEFAULT_CONFIG, props.config)
    return {
      items: props.items.map(item => {
        const normalized = normalizeAccordionItem(item as AccordionItemExtended)
        return {
          id: normalized.id,
          title: normalized.title,
          content: normalized.content,
          subtitle: normalized.metadata?.subtitle,
          icon: normalized.metadata?.icon,
          disabled: normalized.metadata?.disabled
        } as AccordionItemData
      }),
      mode: props.mode,
      defaultOpen: props.defaultOpen,
      animationDuration: config.animation.duration,
      easingFunction: config.animation.easing,
      onToggle: props.onToggle,
      className: props.className
    }
  }
  return props as AccordionProps
}

export const Accordion = forwardRef<AccordionRef, CombinedAccordionProps>(
  (props, ref) => {
    const normalizedProps = normalizeProps(props)
    const { items, mode = 'single', className = '', ...restProps } = normalizedProps
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