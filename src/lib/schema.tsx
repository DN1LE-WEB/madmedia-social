/**
 * JsonLd component for rendering structured data
 * Includes XSS sanitization by escaping < characters
 * See: https://nextjs.org/docs/app/guides/json-ld
 */
export function JsonLd<T extends Record<string, unknown>>({ data }: { data: T }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
