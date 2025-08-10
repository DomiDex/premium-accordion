import { RefObject, useEffect, useCallback } from 'react'

interface UseKeyboardNavigationProps {
  buttonRef: RefObject<HTMLButtonElement | null>
  index: number
  totalItems: number
  togglePanel: (index: number) => void
  isOpen: boolean
  disabled?: boolean
}

export const useKeyboardNavigation = ({
  buttonRef,
  index,
  totalItems,
  togglePanel,
  isOpen,
  disabled = false
}: UseKeyboardNavigationProps) => {
  
  const focusButton = useCallback((targetIndex: number) => {
    const targetButton = document.querySelector(
      `[data-accordion-trigger="${targetIndex}"]`
    ) as HTMLButtonElement
    
    if (targetButton) {
      targetButton.focus()
    }
  }, [])

  const focusNext = useCallback(() => {
    const nextIndex = (index + 1) % totalItems
    focusButton(nextIndex)
  }, [index, totalItems, focusButton])

  const focusPrevious = useCallback(() => {
    const prevIndex = index === 0 ? totalItems - 1 : index - 1
    focusButton(prevIndex)
  }, [index, totalItems, focusButton])

  const focusFirst = useCallback(() => {
    focusButton(0)
  }, [focusButton])

  const focusLast = useCallback(() => {
    focusButton(totalItems - 1)
  }, [totalItems, focusButton])

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if disabled
      if (disabled) return

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          togglePanel(index)
          break
          
        case 'ArrowDown':
          e.preventDefault()
          focusNext()
          break
          
        case 'ArrowUp':
          e.preventDefault()
          focusPrevious()
          break
          
        case 'ArrowRight':
          if (!isOpen) {
            e.preventDefault()
            togglePanel(index)
          }
          break
          
        case 'ArrowLeft':
          if (isOpen) {
            e.preventDefault()
            togglePanel(index)
          }
          break
          
        case 'Home':
          e.preventDefault()
          focusFirst()
          break
          
        case 'End':
          e.preventDefault()
          focusLast()
          break
          
        case 'Escape':
          if (isOpen) {
            e.preventDefault()
            togglePanel(index)
          }
          break
      }
    }

    button.addEventListener('keydown', handleKeyDown)

    return () => {
      button.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    buttonRef,
    index,
    totalItems,
    togglePanel,
    isOpen,
    disabled,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast
  ])

  return {
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast
  }
}