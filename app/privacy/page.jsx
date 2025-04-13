import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <Card className="border-none bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Data Collection and Usage</CardTitle>
          <CardDescription>Information about how we handle your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Location Data</h3>
            <p>We collect location data only when you explicitly provide it to show weather information for your area. This data is:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Used only to fetch weather and lunar information</li>
              <li>Not stored permanently on our servers</li>
              <li>Not shared with third parties</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Weather API Usage</h3>
            <p>We use OpenWeatherMap API to provide weather data. When you request weather information:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your location is shared with OpenWeatherMap</li>
              <li>The data is cached temporarily to improve performance</li>
              <li>No personal information is included in these requests</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Local Storage</h3>
            <p>We store your preferences locally on your device, including:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Temperature unit preference (Celsius/Fahrenheit)</li>
              <li>Last searched locations</li>
              <li>Theme preferences</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p>If you have any questions about this privacy policy, you can contact us at:</p>
            <p className="mt-2">contact@lunarweather.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
