'use client'

import { Accordion } from '@/components/Accordion'

const accordionItems = [
  {
    id: '1',
    title: 'What is GSAP?',
    subtitle: 'Understanding the animation library',
    content: (
      <div className="space-y-3">
        <p>
          GSAP (GreenSock Animation Platform) is a professional-grade JavaScript animation library that provides
          incredible performance and precision for creating animations on the web.
        </p>
        <p>
          It works with any JavaScript framework and provides smooth, performant animations that work consistently
          across all major browsers.
        </p>
      </div>
    ),
  },
  {
    id: '2',
    title: 'Premium Accordion Features',
    subtitle: 'What makes this component special',
    content: (
      <div className="space-y-3">
        <p>This accordion component features:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Smooth GSAP-powered animations at 60fps</li>
          <li>Dark theme with glassmorphism effects</li>
          <li>Full keyboard navigation support</li>
          <li>Responsive design for all devices</li>
          <li>TypeScript support with strict typing</li>
        </ul>
      </div>
    ),
  },
  {
    id: '3',
    title: 'Performance Optimization',
    subtitle: 'Built for speed and efficiency',
    content: (
      <div className="space-y-3">
        <p>
          The component is optimized for performance with GPU acceleration, minimal re-renders, and efficient
          animation scheduling through GSAP&apos;s timeline system.
        </p>
        <p>
          Bundle size is kept minimal through tree-shaking and lazy loading, ensuring fast load times even on
          slower connections.
        </p>
      </div>
    ),
  },
  {
    id: '4',
    title: 'Accessibility First',
    subtitle: 'WCAG 2.1 AA compliant',
    content: (
      <div className="space-y-3">
        <p>
          Full accessibility support including ARIA attributes, keyboard navigation, screen reader compatibility,
          and respect for prefers-reduced-motion settings.
        </p>
        <p>
          Every interaction is designed to be inclusive, ensuring all users can access your content regardless of
          their abilities or assistive technologies.
        </p>
      </div>
    ),
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">
          Premium GSAP Accordion
        </h1>
        <p className="text-gray-400 mb-8">
          A beautiful, animated accordion component with dark theme aesthetics
        </p>
        
        <Accordion
          items={accordionItems}
          mode="single"
          defaultOpen={0}
          animationDuration={500}
          easingFunction="power2.inOut"
        />
      </div>
    </main>
  )
}