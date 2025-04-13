export const metadata = {
  title: 'GDPR Rights | Lunar Weather',
  description: 'Your GDPR rights and data protection information',
}

export default function GDPRPage() {
  return (
    <article className="space-y-8">
      <h1>GDPR Rights</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4">
        <h2>Your Rights Under GDPR</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Right to access your personal data</li>
          <li>Right to rectification</li>
          <li>Right to erasure ("right to be forgotten")</li>
          <li>Right to restrict processing</li>
          <li>Right to data portability</li>
          <li>Right to object</li>
        </ul>
      </section>

      // ...more sections...
    </article>
  )
}
