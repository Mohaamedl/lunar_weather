export const metadata = {
  title: 'Cookies Policy | Lunar Weather',
  description: 'Cookie usage policy for Lunar Weather',
}

export default function CookiesPolicy() {
  return (
    <article className="space-y-8">
      <h1>Cookies Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4">
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device that help us provide and improve our services.
          They are used to remember your preferences and analyze how you use our site.
        </p>
      </section>

      <section className="space-y-4">
        <h2>2. Types of Cookies We Use</h2>
        
        <h3>2.1 Essential Cookies</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Authentication and security</li>
          <li>Basic site functionality</li>
          <li>User preferences</li>
        </ul>

        <h3>2.2 Analytics Cookies</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Usage patterns</li>
          <li>Performance monitoring</li>
          <li>Error tracking</li>
        </ul>

        <h3>2.3 Preference Cookies</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Language settings</li>
          <li>Theme preferences</li>
          <li>Location data</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>3. Cookie Management</h2>
        <p>
          You can control cookies through your browser settings and our cookie consent banner.
          Blocking some types of cookies may impact your experience of our site.
        </p>
      </section>

      // ...more sections...
    </article>
  )
}
