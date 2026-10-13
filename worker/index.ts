// Cloudflare Worker entry. Static pages are served from ./out by the assets
// binding; this only runs for requests that don't match a static file, which
// is how POST /api/contact gets here.

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
  RESEND_API_KEY?: string
  CONTACT_TO: string
  CONTACT_FROM: string
}

const MAX_LENGTH = { name: 200, email: 320, phone: 50, message: 5000 }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function field(data: Record<string, unknown>, key: string): string {
  const value = data[key]
  return typeof value === 'string' ? value.trim() : ''
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  // Browsers always send Origin on a cross-site POST; reject other sites.
  const origin = request.headers.get('Origin')
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ error: 'Forbidden' }, 403)
  }

  let data: Record<string, unknown>
  try {
    const parsed: unknown = await request.json()
    if (!parsed || typeof parsed !== 'object') throw new Error('not an object')
    data = parsed as Record<string, unknown>
  } catch {
    return json({ error: 'Invalid request' }, 400)
  }

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (field(data, 'company')) {
    return json({ ok: true })
  }

  const name = field(data, 'name')
  const email = field(data, 'email')
  const phone = field(data, 'phone')
  const message = field(data, 'message')

  if (!name || !email || !message) {
    return json({ error: 'Please fill in your name, email, and message.' }, 422)
  }
  if (!EMAIL_PATTERN.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 422)
  }
  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    phone.length > MAX_LENGTH.phone ||
    message.length > MAX_LENGTH.message
  ) {
    return json({ error: 'One of the fields is too long.' }, 422)
  }

  if (!env.RESEND_API_KEY) {
    console.error('contact: RESEND_API_KEY is not set')
    return json({ error: 'The contact form is not configured yet.' }, 500)
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO.split(',').map((address) => address.trim()).filter(Boolean),
      reply_to: email,
      subject: `New website inquiry from ${name.replace(/[\r\n]+/g, ' ')}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '(not provided)'}`,
        '',
        message,
      ].join('\n'),
    }),
  })

  if (!resendResponse.ok) {
    console.error('contact: Resend rejected the email', resendResponse.status, await resendResponse.text())
    return json({ error: 'We could not send your message. Please try again.' }, 502)
  }

  return json({ ok: true })
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/contact' || pathname === '/api/contact/') {
      return handleContact(request, env)
    }
    return env.ASSETS.fetch(request)
  },
}

export default worker
