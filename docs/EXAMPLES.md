# Accordion Usage Examples

## Table of Contents

1. [Basic Examples](#basic-examples)
2. [Advanced Examples](#advanced-examples)
3. [Real-World Use Cases](#real-world-use-cases)
4. [Integration Examples](#integration-examples)
5. [Styling Examples](#styling-examples)

---

## Basic Examples

### Simple FAQ Accordion

```tsx
import { Accordion } from '@/components/Accordion'

function FAQSection() {
  const faqs = [
    {
      id: 'faq-1',
      title: 'What payment methods do you accept?',
      content: 'We accept all major credit cards, PayPal, and bank transfers.'
    },
    {
      id: 'faq-2',
      title: 'How long does shipping take?',
      content: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 days.'
    },
    {
      id: 'faq-3',
      title: 'What is your return policy?',
      content: 'We offer a 30-day money-back guarantee on all products.'
    }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion items={faqs} />
    </div>
  )
}
```

### Product Features Accordion

```tsx
function ProductFeatures() {
  const features = [
    {
      id: 'feature-1',
      title: 'Advanced Analytics',
      subtitle: 'Real-time insights',
      content: (
        <div className="space-y-4">
          <p>Track your performance with detailed analytics:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Real-time data visualization</li>
            <li>Custom reports and dashboards</li>
            <li>Export to CSV/PDF</li>
          </ul>
        </div>
      )
    },
    {
      id: 'feature-2',
      title: 'Team Collaboration',
      subtitle: 'Work together seamlessly',
      content: (
        <div className="space-y-4">
          <p>Collaborate with your team effectively:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Shared workspaces</li>
            <li>Real-time updates</li>
            <li>Comments and mentions</li>
          </ul>
        </div>
      )
    }
  ]

  return (
    <Accordion 
      items={features}
      mode="multiple"
      defaultOpen={['feature-1']}
      className="shadow-lg rounded-lg"
    />
  )
}
```

---

## Advanced Examples

### Controlled Accordion with External State

```tsx
import { useState, useRef } from 'react'
import { Accordion, AccordionRef } from '@/components/Accordion'

function ControlledAccordion() {
  const [openItems, setOpenItems] = useState<string[]>(['item-1'])
  const accordionRef = useRef<AccordionRef>(null)

  const items = [
    {
      id: 'item-1',
      title: 'Section 1',
      content: 'Content for section 1'
    },
    {
      id: 'item-2',
      title: 'Section 2',
      content: 'Content for section 2'
    },
    {
      id: 'item-3',
      title: 'Section 3',
      content: 'Content for section 3'
    }
  ]

  const handleToggle = (id: string, isOpen: boolean) => {
    setOpenItems(prev => 
      isOpen 
        ? [...prev, id]
        : prev.filter(item => item !== id)
    )
  }

  const handleOpenAll = () => {
    accordionRef.current?.openAll()
    setOpenItems(items.map(item => item.id))
  }

  const handleCloseAll = () => {
    accordionRef.current?.closeAll()
    setOpenItems([])
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          onClick={handleOpenAll}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open All
        </button>
        <button 
          onClick={handleCloseAll}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Close All
        </button>
        <span className="px-4 py-2">
          Open: {openItems.join(', ') || 'None'}
        </span>
      </div>
      
      <Accordion
        ref={accordionRef}
        items={items}
        mode="multiple"
        defaultOpen={openItems}
        onToggle={handleToggle}
      />
    </div>
  )
}
```

### Accordion with Dynamic Content Loading

```tsx
import { useState, useEffect } from 'react'
import { Accordion } from '@/components/Accordion'

function DynamicAccordion() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    fetchAccordionData().then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  const handleToggle = async (id: string, isOpen: boolean) => {
    if (isOpen) {
      // Load additional content when opened
      const item = items.find(i => i.id === id)
      if (item && !item.fullContent) {
        const fullContent = await fetchFullContent(id)
        setItems(prev => prev.map(i => 
          i.id === id 
            ? { ...i, content: fullContent }
            : i
        ))
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Accordion
      items={items}
      onToggle={handleToggle}
      animationDuration={0.4}
    />
  )
}
```

### Nested Accordions

```tsx
function NestedAccordions() {
  const mainItems = [
    {
      id: 'main-1',
      title: 'Main Category 1',
      content: (
        <Accordion
          items={[
            {
              id: 'sub-1-1',
              title: 'Subcategory 1.1',
              content: 'Nested content 1.1'
            },
            {
              id: 'sub-1-2',
              title: 'Subcategory 1.2',
              content: 'Nested content 1.2'
            }
          ]}
          animationDuration={0.3}
        />
      )
    },
    {
      id: 'main-2',
      title: 'Main Category 2',
      content: (
        <Accordion
          items={[
            {
              id: 'sub-2-1',
              title: 'Subcategory 2.1',
              content: 'Nested content 2.1'
            }
          ]}
          animationDuration={0.3}
        />
      )
    }
  ]

  return (
    <Accordion 
      items={mainItems}
      mode="multiple"
      animationDuration={0.5}
    />
  )
}
```

---

## Real-World Use Cases

### Documentation Sidebar

```tsx
function DocsSidebar() {
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookIcon />,
      content: (
        <nav className="space-y-2">
          <a href="#installation" className="block px-4 py-2 hover:bg-gray-100">
            Installation
          </a>
          <a href="#quick-start" className="block px-4 py-2 hover:bg-gray-100">
            Quick Start
          </a>
          <a href="#configuration" className="block px-4 py-2 hover:bg-gray-100">
            Configuration
          </a>
        </nav>
      )
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: <CodeIcon />,
      content: (
        <nav className="space-y-2">
          <a href="#components" className="block px-4 py-2 hover:bg-gray-100">
            Components
          </a>
          <a href="#hooks" className="block px-4 py-2 hover:bg-gray-100">
            Hooks
          </a>
          <a href="#utilities" className="block px-4 py-2 hover:bg-gray-100">
            Utilities
          </a>
        </nav>
      )
    }
  ]

  return (
    <aside className="w-64 border-r">
      <Accordion
        items={sections}
        mode="multiple"
        defaultOpen={['getting-started']}
        className="border-none"
        animationDuration={0.3}
      />
    </aside>
  )
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true
  })

  const settingsSections = [
    {
      id: 'general',
      title: 'General Settings',
      subtitle: 'Basic configuration',
      content: (
        <div className="space-y-4 p-4">
          <label className="flex items-center justify-between">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => setSettings({...settings, darkMode: e.target.checked})}
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Auto Save</span>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
            />
          </label>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Alert preferences',
      content: (
        <div className="space-y-4 p-4">
          <label className="flex items-center justify-between">
            <span>Enable Notifications</span>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
            />
          </label>
        </div>
      )
    }
  ]

  return (
    <Accordion
      items={settingsSections}
      mode="multiple"
      enableMicroInteractions={true}
    />
  )
}
```

### Multi-Step Form

```tsx
function MultiStepForm() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const accordionRef = useRef<AccordionRef>(null)

  const handleStepComplete = (stepId: string, nextStepId?: string) => {
    setCompletedSteps([...completedSteps, stepId])
    
    if (nextStepId) {
      accordionRef.current?.openItem(nextStepId)
      accordionRef.current?.closeItem(stepId)
    }
  }

  const formSteps = [
    {
      id: 'personal',
      title: 'Personal Information',
      subtitle: completedSteps.includes('personal') ? '✓ Completed' : 'Step 1',
      content: (
        <form className="space-y-4 p-4">
          <input 
            type="text" 
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input 
            type="email" 
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => handleStepComplete('personal', 'address')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next Step
          </button>
        </form>
      )
    },
    {
      id: 'address',
      title: 'Address',
      subtitle: completedSteps.includes('address') ? '✓ Completed' : 'Step 2',
      disabled: !completedSteps.includes('personal'),
      content: (
        <form className="space-y-4 p-4">
          <input 
            type="text" 
            placeholder="Street Address"
            className="w-full p-2 border rounded"
          />
          <input 
            type="text" 
            placeholder="City"
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => handleStepComplete('address', 'payment')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next Step
          </button>
        </form>
      )
    },
    {
      id: 'payment',
      title: 'Payment',
      subtitle: completedSteps.includes('payment') ? '✓ Completed' : 'Step 3',
      disabled: !completedSteps.includes('address'),
      content: (
        <form className="space-y-4 p-4">
          <input 
            type="text" 
            placeholder="Card Number"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Complete Order
          </button>
        </form>
      )
    }
  ]

  return (
    <Accordion
      ref={accordionRef}
      items={formSteps}
      mode="single"
      defaultOpen={['personal']}
    />
  )
}
```

---

## Integration Examples

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form'
import { Accordion } from '@/components/Accordion'

function FormAccordion() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  const formSections = [
    {
      id: 'account',
      title: 'Account Details',
      content: (
        <div className="space-y-4">
          <input
            {...register('username', { required: true })}
            placeholder="Username"
            className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : ''}`}
          />
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
          />
        </div>
      )
    },
    {
      id: 'preferences',
      title: 'Preferences',
      content: (
        <div className="space-y-4">
          <select {...register('theme')} className="w-full p-2 border rounded">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      )
    }
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Accordion items={formSections} mode="multiple" />
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  )
}
```

### With Redux State

```tsx
import { useSelector, useDispatch } from 'react-redux'
import { Accordion } from '@/components/Accordion'
import { toggleSection } from './accordionSlice'

function ReduxAccordion() {
  const dispatch = useDispatch()
  const { items, openSections } = useSelector(state => state.accordion)

  const handleToggle = (id: string, isOpen: boolean) => {
    dispatch(toggleSection({ id, isOpen }))
  }

  return (
    <Accordion
      items={items}
      defaultOpen={openSections}
      onToggle={handleToggle}
      mode="multiple"
    />
  )
}
```

---

## Styling Examples

### Custom Themed Accordion

```tsx
function ThemedAccordion() {
  const items = [
    {
      id: 'dark-1',
      title: 'Dark Theme Section',
      content: 'This accordion has a custom dark theme'
    }
  ]

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <Accordion
        items={items}
        className="
          [&_.accordion-button]:bg-gray-800 
          [&_.accordion-button]:text-white
          [&_.accordion-button:hover]:bg-gray-700
          [&_.accordion-content]:bg-gray-850
          [&_.accordion-content]:text-gray-300
        "
      />
    </div>
  )
}
```

### Gradient Accordion

```tsx
function GradientAccordion() {
  const items = [
    {
      id: 'gradient-1',
      title: 'Gradient Section',
      content: 'Beautiful gradient styling'
    }
  ]

  return (
    <Accordion
      items={items}
      className="
        [&_.accordion-button]:bg-gradient-to-r
        [&_.accordion-button]:from-purple-500
        [&_.accordion-button]:to-pink-500
        [&_.accordion-button]:text-white
      "
    />
  )
}
```