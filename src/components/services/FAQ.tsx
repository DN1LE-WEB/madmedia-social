const faqItems = [
  {
    question: 'How many social media platforms can you manage?',
    answer:
      'Depends on your package. Starter includes 1 platform, Standard includes 2, and Premium covers up to 3 platforms of your choice.',
  },
  {
    question: 'What kind of content do you create?',
    answer:
      'We create custom graphics, write engaging captions, develop hashtag strategies, and ensure everything aligns with your brand voice.',
  },
  {
    question: 'Do I need to provide content ideas?',
    answer:
      "No, we handle the entire content strategy for you. However, we always welcome your input and ideas if you have them.",
  },
  {
    question: 'How long does website design take?',
    answer:
      'Typically 4-6 weeks from kickoff to launch, depending on the complexity and scope of the project.',
  },
  {
    question: 'Can you work with my existing website?',
    answer:
      'Yes, our maintenance services work with websites on any platform. We can also help migrate your site if needed.',
  },
  {
    question: 'What if I need both social media and website services?',
    answer:
      'We offer bundle pricing for clients who need both services. Contact us for a custom quote tailored to your needs.',
  },
]

export function FAQ() {
  return (
    <section className="bg-background-warm py-section">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="font-display text-3xl md:text-4xl mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group border-b border-primary/10 pb-4"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none py-4 font-medium hover:text-accent transition-colors duration-300">
                {item.question}
                <span className="ml-4 transform group-open:rotate-180 transition-transform duration-300">
                  +
                </span>
              </summary>
              <div className="pb-4 text-text-muted">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
