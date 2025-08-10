# Premium Accordion Component

A high-performance, accessible, and beautifully animated accordion component built with React, TypeScript, and GSAP.

## Features

- 🎯 **Accessible**: Full ARIA support and keyboard navigation
- ⚡ **High Performance**: GPU-accelerated animations with GSAP
- 🎨 **Beautiful Animations**: Smooth transitions with customizable easing
- 📱 **Responsive**: Mobile-optimized with touch support
- ⌨️ **Keyboard Navigation**: Arrow keys, Home/End, and Tab support
- 🔧 **Flexible API**: Single or multiple mode operation
- 🎭 **Micro-interactions**: Hover effects and breathing animations
- 🚀 **Production Ready**: TypeScript, tree-shakeable, and optimized

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the accordion in action.

## Basic Usage

```tsx
import { Accordion } from '@/components/Accordion'

const items = [
  {
    id: '1',
    title: 'Section 1',
    subtitle: 'Optional subtitle',
    content: <div>Your content here</div>
  },
  {
    id: '2',
    title: 'Section 2',
    content: 'Simple text content'
  }
]

function App() {
  return (
    <Accordion 
      items={items}
      mode="single"
      defaultOpen={['1']}
    />
  )
}
```

## API Reference

### Accordion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | Required | Array of accordion items |
| `mode` | `'single' \| 'multiple'` | `'single'` | Allow single or multiple panels open |
| `defaultOpen` | `string[]` | `[]` | IDs of initially open items |
| `animationDuration` | `number` | `0.6` | Animation duration in seconds |
| `easingFunction` | `string` | `'power2.inOut'` | GSAP easing function |
| `onToggle` | `(id: string, isOpen: boolean) => void` | - | Callback when item toggles |
| `className` | `string` | `''` | Additional CSS classes |

### AccordionItem Interface

```typescript
interface AccordionItem {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}
```

### Ref Methods

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

## Advanced Usage

### With Ref Control

```tsx
import { useRef } from 'react'
import { Accordion, AccordionRef } from '@/components/Accordion'

function App() {
  const accordionRef = useRef<AccordionRef>(null)

  return (
    <>
      <button onClick={() => accordionRef.current?.openAll()}>
        Open All
      </button>
      <Accordion ref={accordionRef} items={items} />
    </>
  )
}
```

### Custom Animation

```tsx
<Accordion
  items={items}
  animationDuration={0.8}
  easingFunction="elastic.out(1, 0.3)"
/>
```

### Multiple Mode

```tsx
<Accordion
  items={items}
  mode="multiple"
  defaultOpen={['1', '2']}
/>
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `ArrowUp` | Focus previous item |
| `ArrowDown` | Focus next item |
| `Home` | Focus first item |
| `End` | Focus last item |
| `Enter` / `Space` | Toggle focused item |
| `Tab` | Navigate through items |

## Accessibility

The component follows WAI-ARIA authoring practices:

- Proper ARIA attributes (`aria-expanded`, `aria-controls`, `aria-describedby`)
- Screen reader announcements for state changes
- Keyboard navigation support
- Focus management
- High contrast mode support

## Performance

- GPU-accelerated animations with `transform3d`
- RAF throttling for smooth 60fps animations
- Efficient re-render prevention with `React.memo`
- Will-change optimization for animations
- Tree-shakeable and optimized bundle size

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Architecture

```
src/components/Accordion/
├── Accordion.tsx           # Main component
├── AccordionItem.tsx       # Item component
├── AccordionButton.tsx     # Button component
├── AccordionContent.tsx    # Content component
├── AccordionContext.tsx    # Context provider
├── hooks/                  # Custom hooks
│   ├── useAccordion.ts
│   ├── useAccordionAnimation.ts
│   ├── useAccordionInteractions.ts
│   ├── useKeyboardNavigation.ts
│   └── useAriaLive.ts
├── types/                  # TypeScript types
│   └── accordion.types.ts
└── utils/                  # Utilities
    ├── animation.ts
    ├── constants.ts
    ├── dom.ts
    ├── gsap.ts
    ├── performance.ts
    └── styles.ts
```

## License

MIT

## Author

Made with ❤️ by DomiDex