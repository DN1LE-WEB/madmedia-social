'use client'

import { useForm, ValidationError } from '@formspree/react'
import { AnimateOnScroll } from '@/components/ui'

export function ContactForm() {
  const [state, handleSubmit] = useForm('xykevppo')

  if (state.succeeded) {
    return (
      <div className="py-12 text-center">
        <h3 className="font-display text-2xl">Thank you!</h3>
        <p className="text-text-muted mt-4">
          We'll be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name <span className="text-accent">(required)</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-accent">(required)</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      {/* Phone field (optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone <span className="text-text-muted">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300"
        />
      </div>

      {/* Message field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-accent">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300 resize-none"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      {/* General errors */}
      <ValidationError errors={state.errors} />

      <AnimateOnScroll delay={100}>
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-primary text-background px-8 py-4 font-medium
                     hover:bg-accent transition-all duration-300
                     hover:translate-y-[-2px] hover:shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.submitting ? 'Sending...' : 'Send Message'}
        </button>
      </AnimateOnScroll>
    </form>
  )
}
