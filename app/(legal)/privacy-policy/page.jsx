export const metadata = {
  title: 'Privacy Policy | Lunar Weather',
  description: 'Privacy policy and data protection information for Lunar Weather',
}

export default function PrivacyPolicy() {
  return (
    <article className="space-y-8">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4">
        <h2>1. Information We Collect</h2>
        <h3>1.1 Information You Provide</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Name and email address when submitting reports</li>
          <li>Location data when checking weather</li>
          <li>Device and browser information for troubleshooting</li>
          <li>Any additional information you provide in report descriptions</li>
        </ul>

        <h3>1.2 Automatically Collected Information</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>IP address and approximate location</li>
          <li>Browser type and version</li>
          <li>Device type and operating system</li>
          <li>Usage patterns and preferences</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate weather forecasts</li>
          <li>Improve our services and user experience</li>
          <li>Communicate about your reports and updates</li>
          <li>Ensure service reliability and security</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>3. Data Protection</h2>
        <p>We implement industry-standard security measures including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Data encryption in transit and at rest</li>
          <li>Regular security audits</li>
          <li>Access controls and authentication</li>
          <li>Secure data centers</li>
        </ul>
      </section>

      // ...more sections...
    </article>
  )
}
