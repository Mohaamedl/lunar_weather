import { OutfitRecommendation } from "@/components/outfit-recommendation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Footprints, Shirt, Sun, Umbrella, Wind } from "lucide-react"

// Mock data - in a real app, this would come from an API
const weatherData = {
  temperature: 22, 
  condition: "Clear",
  windSpeed: 8,
  precipitation: 0,
  humidity: 65,
  uvIndex: 6,
}

export default function RecommendationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Outfit & Activity Guide</h1>
        <p className="text-muted-foreground">Personalized recommendations based on current weather</p>
      </div>

      <Tabs defaultValue="outfit" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="outfit" className="flex items-center">
            <Shirt className="h-4 w-4 mr-2" />
            Outfit Guide
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center">
            <Footprints className="h-4 w-4 mr-2" />
            Activity Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="outfit" className="space-y-6">
          <OutfitRecommendation
            temperature={weatherData.temperature}
            condition={weatherData.condition}
            windSpeed={weatherData.windSpeed}
            precipitation={weatherData.precipitation}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sun className="mr-2 h-5 w-5 text-accent" />
                  UV Protection
                </CardTitle>
                <CardDescription>UV Index: {weatherData.uvIndex} (High)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    With today's UV index of {weatherData.uvIndex}, it's important to protect your skin from harmful
                    rays.
                  </p>
                  <div className="grid gap-2">
                    <div className="flex items-start">
                      <div className="bg-secondary/50 p-2 rounded-full mr-3">
                        <Umbrella className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Sunscreen</h4>
                        <p className="text-xs text-muted-foreground">Apply SPF 30+ sunscreen every 2 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-secondary/50 p-2 rounded-full mr-3">
                        <Shirt className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Protective Clothing</h4>
                        <p className="text-xs text-muted-foreground">Consider a hat and sunglasses</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-secondary/50 p-2 rounded-full mr-3">
                        <Sun className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Seek Shade</h4>
                        <p className="text-xs text-muted-foreground">Especially between 10am and 4pm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wind className="mr-2 h-5 w-5 text-accent" />
                  Comfort Factors
                </CardTitle>
                <CardDescription>Additional considerations for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/30 p-3 rounded-lg flex flex-col items-center">
                      <Wind className="h-5 w-5 mb-2 text-green-400" />
                      <span className="text-sm font-medium">Wind Chill</span>
                      <span className="text-xs text-muted-foreground">None</span>
                      <span className="text-lg font-bold mt-1">22°C</span>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-lg flex flex-col items-center">
                      <Droplets className="h-5 w-5 mb-2 text-blue-400" />
                      <span className="text-sm font-medium">Humidity</span>
                      <span className="text-xs text-muted-foreground">Moderate</span>
                      <span className="text-lg font-bold mt-1">65%</span>
                    </div>
                  </div>
                  <div className="bg-secondary/30 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Comfort Tips</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Breathable fabrics recommended due to moderate humidity</li>
                      <li>• Light layers ideal for temperature fluctuations</li>
                      <li>• Stay hydrated throughout the day</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="border-none bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Activity Recommendations</CardTitle>
              <CardDescription>Based on current weather conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Sun className="mr-2 h-5 w-5 text-green-400" />
                    Highly Recommended Activities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: "Beach Visit", description: "Perfect weather for the beach", icon: Sun },
                      { name: "Outdoor Dining", description: "Enjoy meals outside", icon: Sun },
                      { name: "Park Visit", description: "Great day for the park", icon: Sun },
                      { name: "Hiking", description: "Comfortable temperatures for trails", icon: Footprints },
                      { name: "Cycling", description: "Low winds, ideal for biking", icon: Footprints },
                      { name: "Sightseeing", description: "Clear skies for great views", icon: Sun },
                    ].map((activity, index) => {
                      const Icon = activity.icon
                      return (
                        <div key={index} className="bg-secondary/30 p-3 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Icon className="h-4 w-4 mr-2 text-accent" />
                            <h4 className="text-sm font-medium">{activity.name}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Umbrella className="mr-2 h-5 w-5 text-red-400" />
                    Not Recommended Today
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: "Indoor Swimming", description: "Better to be outdoors today", icon: Droplets },
                      { name: "Movie Theater", description: "Save for a rainy day", icon: Umbrella },
                      { name: "Shopping Mall", description: "Too nice to be indoors", icon: Umbrella },
                    ].map((activity, index) => {
                      const Icon = activity.icon
                      return (
                        <div key={index} className="bg-secondary/30 p-3 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Icon className="h-4 w-4 mr-2 text-red-400" />
                            <h4 className="text-sm font-medium">{activity.name}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Local Activity Suggestions</CardTitle>
              <CardDescription>Things to do near New York, NY</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {[
                  {
                    name: "Central Park",
                    description: "Enjoy the beautiful weather with a walk, picnic, or boat ride in Central Park.",
                    distance: "1.2 miles away",
                    weatherSuitability: "Perfect",
                  },
                  {
                    name: "High Line",
                    description: "Walk the elevated park with great city views, perfect on clear days like today.",
                    distance: "2.5 miles away",
                    weatherSuitability: "Excellent",
                  },
                  {
                    name: "Brooklyn Bridge",
                    description: "Cross the iconic bridge on foot or bike with excellent visibility today.",
                    distance: "3.8 miles away",
                    weatherSuitability: "Very Good",
                  },
                ].map((place, index) => (
                  <div key={index} className="flex flex-col p-4 bg-secondary/30 rounded-lg">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{place.name}</h4>
                      <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        {place.weatherSuitability}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground my-2">{place.description}</p>
                    <div className="text-xs text-muted-foreground mt-auto">{place.distance}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

