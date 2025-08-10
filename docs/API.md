# Accordion API Documentation

## Component API

### `<Accordion />`

The main accordion component that manages the state and behavior of all accordion items.

#### Props

```typescript
interface AccordionProps {
  items: AccordionItemData[]
  mode?: 'single' | 'multiple'
  defaultOpen?: string[]
  animationDuration?: number
  easingFunction?: string
  onToggle?: (id: string, isOpen: boolean) => void
  className?: string
  enableMicroInteractions?: boolean
  stagger?: boolean
}
```

#### Prop Details

##### `items` (required)
- **Type**: `AccordionItemData[]`
- **Description**: Array of accordion items to display

##### `mode`
- **Type**: `'single' | 'multiple'`
- **Default**: `'single'`
- **Description**: 
  - `single`: Only one item can be open at a time
  - `multiple`: Multiple items can be open simultaneously

##### `defaultOpen`
- **Type**: `string[]`
- **Default**: `[]`
- **Description**: Array of item IDs that should be open by default

##### `animationDuration`
- **Type**: `number`
- **Default**: `0.6`
- **Description**: Duration of open/close animations in seconds

##### `easingFunction`
- **Type**: `string`
- **Default**: `'power2.inOut'`
- **Description**: GSAP easing function name
- **Examples**: `'power2.out'`, `'elastic.out(1, 0.3)'`, `'bounce.out'`

##### `onToggle`
- **Type**: `(id: string, isOpen: boolean) => void`
- **Description**: Callback fired when an item is toggled

##### `className`
- **Type**: `string`
- **Default**: `''`
- **Description**: Additional CSS classes for the container

##### `enableMicroInteractions`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable hover effects and breathing animations

##### `stagger`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable staggered content animations

---

### `AccordionItemData`

Interface for accordion item data.

```typescript
interface AccordionItemData {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}
```

#### Property Details

##### `id` (required)
- **Type**: `string`
- **Description**: Unique identifier for the item

##### `title` (required)
- **Type**: `string`
- **Description**: Main title displayed in the button

##### `subtitle`
- **Type**: `string`
- **Description**: Optional subtitle displayed below the title

##### `content` (required)
- **Type**: `React.ReactNode`
- **Description**: Content revealed when item is expanded

##### `icon`
- **Type**: `React.ReactNode`
- **Description**: Custom icon to replace default chevron

##### `disabled`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Disable interaction with this item

---

### `AccordionRef`

Reference object for programmatic control.

```typescript
interface AccordionRef {
  openAll: () => void
  closeAll: () => void
  toggle: (id: string) => void
  openItem: (id: string) => void
  closeItem: (id: string) => void
  isOpen: (id: string) => boolean
  getOpenItems: () => string[]
}
```

#### Method Details

##### `openAll()`
- **Returns**: `void`
- **Description**: Opens all accordion items (only works in multiple mode)

##### `closeAll()`
- **Returns**: `void`
- **Description**: Closes all accordion items

##### `toggle(id: string)`
- **Parameters**: `id` - Item ID to toggle
- **Returns**: `void`
- **Description**: Toggles the specified item

##### `openItem(id: string)`
- **Parameters**: `id` - Item ID to open
- **Returns**: `void`
- **Description**: Opens the specified item

##### `closeItem(id: string)`
- **Parameters**: `id` - Item ID to close
- **Returns**: `void`
- **Description**: Closes the specified item

##### `isOpen(id: string)`
- **Parameters**: `id` - Item ID to check
- **Returns**: `boolean`
- **Description**: Returns whether the item is open

##### `getOpenItems()`
- **Returns**: `string[]`
- **Description**: Returns array of open item IDs

---

## Usage Examples

### Basic Example

```tsx
import { Accordion } from '@/components/Accordion'

const items = [
  {
    id: 'item-1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.'
  },
  {
    id: 'item-2',
    title: 'How does it work?',
    content: 'React uses a virtual DOM to efficiently update the UI.'
  }
]

function App() {
  return <Accordion items={items} />
}
```

### With Ref Control

```tsx
import { useRef } from 'react'
import { Accordion, AccordionRef } from '@/components/Accordion'

function App() {
  const accordionRef = useRef<AccordionRef>(null)

  const handleOpenAll = () => {
    accordionRef.current?.openAll()
  }

  const handleCloseAll = () => {
    accordionRef.current?.closeAll()
  }

  const handleToggleFirst = () => {
    accordionRef.current?.toggle('item-1')
  }

  return (
    <>
      <div>
        <button onClick={handleOpenAll}>Open All</button>
        <button onClick={handleCloseAll}>Close All</button>
        <button onClick={handleToggleFirst}>Toggle First</button>
      </div>
      <Accordion 
        ref={accordionRef}
        items={items}
        mode="multiple"
      />
    </>
  )
}
```

### With Custom Animations

```tsx
<Accordion
  items={items}
  animationDuration={1.2}
  easingFunction="elastic.out(1, 0.5)"
  enableMicroInteractions={true}
  stagger={true}
/>
```

### With Event Handler

```tsx
function App() {
  const handleToggle = (id: string, isOpen: boolean) => {
    console.log(`Item ${id} is now ${isOpen ? 'open' : 'closed'}`)
    
    // Track analytics
    if (isOpen) {
      analytics.track('accordion_opened', { itemId: id })
    }
  }

  return (
    <Accordion
      items={items}
      onToggle={handleToggle}
    />
  )
}
```

### With Rich Content

```tsx
const items = [
  {
    id: 'rich-1',
    title: 'Complex Content',
    subtitle: 'With multimedia',
    content: (
      <div>
        <img src="/image.jpg" alt="Example" />
        <p>Text content with <strong>formatting</strong></p>
        <button>Interactive button</button>
      </div>
    )
  }
]
```

### Disabled Items

```tsx
const items = [
  {
    id: 'disabled-item',
    title: 'Coming Soon',
    subtitle: 'This feature is not yet available',
    content: 'Content here',
    disabled: true
  }
]
```

---

## TypeScript Support

The component is fully typed with TypeScript. Import types as needed:

```tsx
import type { 
  AccordionProps, 
  AccordionRef, 
  AccordionItemData 
} from '@/components/Accordion'
```

---

## Performance Considerations

1. **Memoization**: Items are memoized to prevent unnecessary re-renders
2. **Lazy Loading**: Content is only rendered when visible
3. **Animation Optimization**: Uses GPU acceleration and RAF throttling
4. **Bundle Size**: Tree-shakeable exports minimize bundle impact

---

## Styling

The component uses Tailwind CSS classes. Override styles by:

1. Passing custom `className` to the component
2. Modifying the styles in `utils/styles.ts`
3. Using CSS modules or styled-components

```tsx
<Accordion
  items={items}
  className="custom-accordion-wrapper"
/>
```