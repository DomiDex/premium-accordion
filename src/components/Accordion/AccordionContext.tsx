'use client'

import React, { createContext, useContext, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { ANIMATION_DEFAULTS } from './utils/constants'
import type { 
  AccordionContextValue, 
  AccordionProviderProps, 
  AccordionRef
} from './types/accordion.types'

const AccordionContext = createContext<AccordionContextValue | null>(null)

export const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within AccordionProvider')
  }
  return context
}

// Using imported type from accordion.types.ts

export const AccordionProvider = forwardRef<AccordionRef, AccordionProviderProps>(
  (
    {
      children,
      mode,
      defaultOpen = [],
      onToggle,
      animationDuration = ANIMATION_DEFAULTS.DURATION_MS,
      easingFunction = ANIMATION_DEFAULTS.EASE,
      totalItems,
    },
    ref
  ) => {
    const [openPanels, setOpenPanels] = useState<number[]>(() => {
      if (typeof defaultOpen === 'number') return [defaultOpen]
      if (Array.isArray(defaultOpen)) return defaultOpen
      return []
    })

    const isOpen = useCallback((index: number) => openPanels.includes(index), [openPanels])

    const togglePanel = useCallback(
    (index: number) => {
      setOpenPanels((prev) => {
        let newPanels: number[]
        const isCurrentlyOpen = prev.includes(index)

        if (mode === 'single') {
          newPanels = isCurrentlyOpen ? [] : [index]
        } else {
          newPanels = isCurrentlyOpen
            ? prev.filter((i) => i !== index)
            : [...prev, index]
        }

        // Use requestAnimationFrame for smooth state updates
        requestAnimationFrame(() => {
          onToggle?.(index, !isCurrentlyOpen)
        })
        
        return newPanels
      })
    },
    [mode, onToggle]
  )

    const open = useCallback((index: number) => {
      setOpenPanels((prev) => {
        if (mode === 'single') return [index]
        if (!prev.includes(index)) return [...prev, index]
        return prev
      })
    }, [mode])

    const close = useCallback((index: number) => {
      setOpenPanels((prev) => prev.filter((i) => i !== index))
    }, [])

    const openAll = useCallback(() => {
      if (mode === 'multiple') {
        setOpenPanels(Array.from({ length: totalItems }, (_, i) => i))
      }
    }, [mode, totalItems])

    const closeAll = useCallback(() => {
      setOpenPanels([])
    }, [])

    const refresh = useCallback(() => {
      // Trigger re-render for height recalculation
      setOpenPanels((prev) => [...prev])
    }, [])

    useImperativeHandle(ref, () => ({
      open,
      close,
      toggle: togglePanel,
      openAll,
      closeAll,
      refresh,
    }))

    return (
      <AccordionContext.Provider
        value={{
          mode,
          openPanels,
          togglePanel,
          isOpen,
          animationDuration,
          easingFunction,
          totalItems,
        }}
      >
        {children}
      </AccordionContext.Provider>
    )
  }
)

AccordionProvider.displayName = 'AccordionProvider'