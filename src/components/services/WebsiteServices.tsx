const services = [
  {
    name: 'Website Design',
    description:
      'Custom, mobile-responsive websites designed for small businesses. Each site is crafted to reflect your unique brand.',
    features: [
      'Design consultation',
      'Mobile-first development',
      'SEO-ready structure',
      'Training session included',
    ],
    pricing: 'Starting at $1,500',
  },
  {
    name: 'Website Maintenance',
    description:
      'Keep your website secure, updated, and running smoothly with ongoing maintenance.',
    features: [
      'Monthly updates',
      'Security monitoring',
      'Regular backups',
      'Technical support',
    ],
    pricing: 'Starting at $150/month',
  },
]

export function WebsiteServices() {
  return (
    <section className="bg-background py-section">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="font-display text-3xl md:text-4xl mb-12">
          Website Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service) => (
            <div key={service.name} className="border-t-2 border-primary/20 pt-6">
              <h3 className="font-display text-xl">{service.name}</h3>
              <p className="text-text-muted mt-4">{service.description}</p>
              <ul className="mt-6 space-y-2 text-text-muted text-sm">
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p className="text-2xl font-display mt-6">{service.pricing}</p>
            </div>
          ))}
        </div>

        <p className="text-text-muted italic mt-12">
          Bundle website services with social media management for special pricing
        </p>
      </div>
    </section>
  )
}
