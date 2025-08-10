'use client'

import { createContext, useContext, useState, useCallback, forwardRef, useImperativeHandle, ReactNode } from 'react'
import type { AccordionRef } from './Accordion'

interface AccordionContextValue {
  openPanels: number[]
  mode: 'single' | 'multiple'
  togglePanel: (index: number) => void
  isOpen: (index: number) => boolean
  animationDuration?: number
  easingFunction?: string
  scrollBehavior?: boolean
  scrollOffset?: number
  onToggle?: (index: number, isOpen: boolean) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

export const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within AccordionProvider')
  }
  return context
}

interface AccordionProviderProps {
  children: ReactNode
  mode: 'single' | 'multiple'
  defaultOpen?: number | number[]
  animationDuration?: number
  easingFunction?: string
  scrollBehavior?: boolean
  scrollOffset?: number
  onToggle?: (index: number, isOpen: boolean) => void
}

export const AccordionProvider = forwardRef<AccordionRef, AccordionProviderProps>(
  (
    {
      children,
      mode,
      defaultOpen = [],
      animationDuration = 500,
      easingFunction = 'power2.out',
      scrollBehavior = true,
      scrollOffset = 100,
      onToggle,
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

          onToggle?.(index, !isCurrentlyOpen)
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
        setOpenPanels(Array.from({ length: 100 }, (_, i) => i))
      }
    }, [mode])

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
          openPanels,
          mode,
          togglePanel,
          isOpen,
          animationDuration,
          easingFunction,
          scrollBehavior,
          scrollOffset,
          onToggle,
        }}
      >
        {children}
      </AccordionContext.Provider>
    )
  }
)

AccordionProvider.displayName = 'AccordionProvider'