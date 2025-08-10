# Accordion Hooks Documentation

## Overview

The accordion component uses a collection of custom React hooks to manage state, animations, interactions, and accessibility. These hooks are composable and can be used independently.

---

## Core Hooks

### `useAccordion()`

Access the accordion context and state.

```typescript
function useAccordion(): AccordionContextValue
```

#### Returns

```typescript
interface AccordionContextValue {
  openItems: string[]
  toggleItem: (id: string) => void
  openItem: (id: string) => void
  closeItem: (id: string) => void
  mode: 'single' | 'multiple'
  animationDuration: number
  easingFunction: string
  enableMicroInteractions: boolean
  stagger: boolean
  openAll: () => void
  closeAll: () => void
  isOpen: (id: string) => boolean
  getOpenItems: () => string[]
}
```

#### Usage

```tsx
import { useAccordion } from './AccordionContext'

function CustomAccordionItem() {
  const { toggleItem, isOpen } = useAccordion()
  
  const handleClick = () => {
    toggleItem('item-1')
  }
  
  return (
    <button onClick={handleClick}>
      {isOpen('item-1') ? 'Close' : 'Open'}
    </button>
  )
}
```

---

### `useAccordionAnimation()`

Manages GSAP animations for accordion items.

```typescript
function useAccordionAnimation(options: UseAccordionAnimationOptions): void
```

#### Parameters

```typescript
interface UseAccordionAnimationOptions {
  isOpen: boolean
  duration: number
  ease: string
  stagger: boolean
  enableMicroInteractions: boolean
  contentRef: RefObject<HTMLDivElement>
  iconRef: RefObject<SVGSVGElement | HTMLElement>
  buttonRef: RefObject<HTMLButtonElement>
}
```

#### Features

- Opening/closing animations with GSAP
- Breathing animation when open
- Hover effects
- Staggered content animations
- GPU acceleration
- Automatic cleanup

#### Usage

```tsx
import { useAccordionAnimation } from './hooks/useAccordionAnimation'

function AnimatedItem({ isOpen }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  useAccordionAnimation({
    isOpen,
    duration: 0.6,
    ease: 'power2.inOut',
    stagger: true,
    enableMicroInteractions: true,
    contentRef,
    iconRef,
    buttonRef
  })
  
  return (
    <div>
      <button ref={buttonRef}>
        <svg ref={iconRef}>...</svg>
      </button>
      <div ref={contentRef}>Content</div>
    </div>
  )
}
```

---

### `useAccordionInteractions()`

Handles mouse and touch interactions with performance optimization.

```typescript
function useAccordionInteractions(
  buttonRef: RefObject<HTMLButtonElement>,
  enableMicroInteractions: boolean
): void
```

#### Features

- 3D tilt effect on mouse move
- RAF throttling for 60fps
- Touch support
- GPU acceleration
- Auto-cleanup

#### Usage

```tsx
import { useAccordionInteractions } from './hooks/useAccordionInteractions'

function InteractiveButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  useAccordionInteractions(buttonRef, true)
  
  return <button ref={buttonRef}>Hover me</button>
}
```

---

### `useKeyboardNavigation()`

Implements keyboard navigation for accessibility.

```typescript
function useKeyboardNavigation(
  buttonRef: RefObject<HTMLButtonElement>,
  index: number,
  toggleItem: () => void
): void
```

#### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `ArrowUp` | Focus previous item |
| `ArrowDown` | Focus next item |
| `Home` | Focus first item |
| `End` | Focus last item |
| `Enter` | Toggle current item |
| `Space` | Toggle current item |

#### Usage

```tsx
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'

function AccessibleItem({ index, onToggle }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  useKeyboardNavigation(buttonRef, index, onToggle)
  
  return <button ref={buttonRef}>Item {index}</button>
}
```

---

### `useAriaLive()`

Provides screen reader announcements for state changes.

```typescript
function useAriaLive(): {
  announce: (message: string) => void
}
```

#### Features

- Creates hidden ARIA live region
- Announces state changes to screen readers
- Automatic cleanup
- Polite announcements

#### Usage

```tsx
import { useAriaLive } from './hooks/useAriaLive'

function AccessibleAccordion() {
  const { announce } = useAriaLive()
  
  const handleOpen = () => {
    announce('Section expanded')
  }
  
  const handleClose = () => {
    announce('Section collapsed')
  }
  
  return <div>...</div>
}
```

---

## Advanced Usage

### Combining Hooks

```tsx
function CompleteAccordionItem({ item, index }) {
  const { toggleItem, isOpen } = useAccordion()
  const { announce } = useAriaLive()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)
  
  const open = isOpen(item.id)
  
  // Animation
  useAccordionAnimation({
    isOpen: open,
    duration: 0.6,
    ease: 'power2.inOut',
    stagger: true,
    enableMicroInteractions: true,
    contentRef,
    iconRef,
    buttonRef
  })
  
  // Interactions
  useAccordionInteractions(buttonRef, true)
  
  // Keyboard navigation
  const handleToggle = useCallback(() => {
    toggleItem(item.id)
    announce(open ? `${item.title} collapsed` : `${item.title} expanded`)
  }, [item.id, item.title, open, toggleItem, announce])
  
  useKeyboardNavigation(buttonRef, index, handleToggle)
  
  return (
    <div>
      <button ref={buttonRef} onClick={handleToggle}>
        {item.title}
        <svg ref={iconRef}>...</svg>
      </button>
      <div ref={contentRef}>
        {item.content}
      </div>
    </div>
  )
}
```

### Custom Animation Hook

```tsx
import { useAccordionAnimation } from './hooks/useAccordionAnimation'

function CustomAnimatedAccordion({ isOpen }) {
  const contentRef = useRef(null)
  const iconRef = useRef(null)
  const buttonRef = useRef(null)
  
  // Custom animation settings
  useAccordionAnimation({
    isOpen,
    duration: 1.2,  // Slower animation
    ease: 'elastic.out(1, 0.3)',  // Bouncy effect
    stagger: true,
    enableMicroInteractions: true,
    contentRef,
    iconRef,
    buttonRef
  })
  
  return <div>...</div>
}
```

### Performance Monitoring

```tsx
function PerformanceMonitoredAccordion() {
  const { toggleItem } = useAccordion()
  
  const handleToggle = useCallback((id: string) => {
    const startTime = performance.now()
    
    toggleItem(id)
    
    requestAnimationFrame(() => {
      const endTime = performance.now()
      console.log(`Toggle animation took ${endTime - startTime}ms`)
    })
  }, [toggleItem])
  
  return <div>...</div>
}
```

---

## Hook Dependencies

### External Dependencies

- **GSAP**: For animations (`useAccordionAnimation`)
- **React**: Core hooks (useState, useEffect, useRef, etc.)

### Internal Dependencies

- **AccordionContext**: Provides state management
- **Utils**: Animation configs, DOM helpers, performance utilities

---

## Best Practices

1. **Always clean up**: Hooks automatically handle cleanup, but ensure refs are properly attached
2. **Memoize callbacks**: Use `useCallback` for event handlers passed to hooks
3. **Performance**: Use RAF throttling for high-frequency events
4. **Accessibility**: Always include keyboard navigation and ARIA announcements
5. **Testing**: Mock GSAP and DOM methods when unit testing hooks

---

## TypeScript Types

```typescript
// Import all hook types
import type {
  UseAccordionAnimationOptions,
  AccordionContextValue
} from '@/components/Accordion/types/accordion.types'

// Use with strict typing
const animationOptions: UseAccordionAnimationOptions = {
  isOpen: true,
  duration: 0.6,
  ease: 'power2.inOut',
  stagger: true,
  enableMicroInteractions: true,
  contentRef,
  iconRef,
  buttonRef
}
```

---

## Troubleshooting

### Common Issues

1. **Animations not working**
   - Ensure GSAP is installed: `npm install gsap`
   - Check that refs are properly attached to DOM elements

2. **Keyboard navigation not working**
   - Verify `tabIndex={0}` is set on buttons
   - Check that event listeners are properly attached

3. **Memory leaks**
   - Hooks include cleanup, but ensure components unmount properly
   - Check for infinite loops in dependencies

4. **Performance issues**
   - Enable RAF throttling for mouse events
   - Use `will-change` CSS property for animated elements
   - Limit the number of animated elements