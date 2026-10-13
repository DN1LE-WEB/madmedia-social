'use client'

import { useState, type FormEvent } from 'react'
import { AnimateOnScroll } from '@/components/ui'

const FALLBACK_ERROR =
  'Something went wrong sending your message. Please try again, or email us directly at madmedia56256@gmail.com.'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'succeeded'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
      })
      if (response.ok) {
        setStatus('succeeded')
        return
      }
      const body = await response.json().catch(() => null)
      setError(typeof body?.error === 'string' ? body.error : FALLBACK_ERROR)
    } catch {
      setError(FALLBACK_ERROR)
    }
    setStatus('idle')
  }

  if (status === 'succeeded') {
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
          maxLength={200}
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300"
        />
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
          maxLength={320}
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300"
        />
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
          maxLength={50}
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
          maxLength={5000}
          className="w-full px-4 py-3 border border-primary/20 rounded-none
                     focus:border-accent focus:ring-1 focus:ring-accent
                     transition-colors duration-300 resize-none"
        />
      </div>

      {/* Honeypot - hidden from visitors, bots fill it in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {/* General errors */}
      {error && (
        <p role="alert" className="text-accent">
          {error}
        </p>
      )}

      <AnimateOnScroll delay={100}>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-primary text-background px-8 py-4 font-medium
                     hover:bg-accent transition-all duration-300
                     hover:translate-y-[-2px] hover:shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </AnimateOnScroll>
    </form>
  )
}
