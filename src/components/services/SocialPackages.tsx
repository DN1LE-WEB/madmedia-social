const packages = [
  {
    name: 'Starter',
    price: 300,
    features: [
      '8 posts per month',
      '1 platform',
      'Basic content creation',
      'Community engagement',
    ],
    emphasized: false,
  },
  {
    name: 'Standard',
    price: 600,
    features: [
      '16 posts per month',
      '2 platforms',
      'Advanced content creation',
      'Community engagement',
      'Monthly analytics report',
    ],
    emphasized: true,
  },
  {
    name: 'Premium',
    price: 900,
    features: [
      '24 posts per month',
      '3 platforms',
      'Comprehensive content strategy',
      'Strategic engagement',
      'Weekly analytics report',
      'Priority support',
    ],
    emphasized: false,
  },
]

export function SocialPackages() {
  return (
    <section className="bg-background-warm py-section">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="font-display text-3xl md:text-4xl mb-16">
          Social Media Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {packages.map((pkg, index) => (
            <div key={pkg.name} className="md:col-span-4">
              {pkg.emphasized ? (
                <div className="border-t-2 border-accent bg-white p-6 -mt-0 md:-mt-6 shadow-sm">
                  <span className="text-xs uppercase tracking-widest text-accent">
                    Most Popular
                  </span>
                  <h3 className="font-display text-xl mt-2">{pkg.name}</h3>
                  <p className="text-4xl font-display mt-4">
                    ${pkg.price}
                    <span className="text-lg text-text-muted">/mo</span>
                  </p>
                  <ul className="mt-6 space-y-2 text-text-muted text-sm">
                    {pkg.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="border-t-2 border-primary/20 pt-6">
                  <h3 className="font-display text-xl">{pkg.name}</h3>
                  <p className="text-4xl font-display mt-4">
                    ${pkg.price}
                    <span className="text-lg text-text-muted">/mo</span>
                  </p>
                  <ul className="mt-6 space-y-2 text-text-muted text-sm">
                    {pkg.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
