export const metadata = {
  title: 'Terms of Service | Lunar Weather',
  description: 'Terms of service and user agreement for Lunar Weather',
}

export default function Terms() {
  return (
    <article className="space-y-8">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Lunar Weather, you agree to be bound by these Terms of Service and our Privacy Policy.
          If you disagree with any part of these terms, you may not access our service.
        </p>
      </section>

      <section className="space-y-4">
        <h2>2. User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate information when submitting reports</li>
          <li>Maintain the confidentiality of any account credentials</li>
          <li>Not misuse or attempt to exploit our services</li>
          <li>Report any security vulnerabilities responsibly</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>3. Service Limitations</h2>
        <p>
          Weather forecasts are provided on a best-effort basis using data from reliable sources.
          However, we cannot guarantee 100% accuracy of weather predictions.
        </p>
      </section>

      <section className="space-y-4">
        <h2>4. Intellectual Property</h2>
        <p>
          All content, features, and functionality are owned by Lunar Weather and protected by international copyright laws.
        </p>
      </section>

      // ...more sections...
    </article>
  )
}
