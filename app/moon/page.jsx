import { MoonPhase } from "@/components/moon-phase"
import { MoonObservation } from "@/components/moon-observation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Moon, Star, Calendar } from "lucide-react"

// Mock data - in a real app, this would come from an API
const moonData = {
  phase: 0.25, // First quarter
  illumination: "25%",
  age: "7.4 days",
  nextFullMoon: "April 6, 2023",
  nextNewMoon: "April 20, 2023",
  moonrise: "11:42 AM",
  moonset: "1:23 AM",
}

const observationSpots = [
  {
    name: "Central Park",
    distance: "1.2 miles",
    lightPollution: "High",
    elevation: "20 ft",
    bestTime: "Early evening",
  },
  {
    name: "Brooklyn Heights Promenade",
    distance: "3.5 miles",
    lightPollution: "Medium",
    elevation: "66 ft",
    bestTime: "After 9 PM",
  },
  {
    name: "Floyd Bennett Field",
    distance: "12.3 miles",
    lightPollution: "Low",
    elevation: "15 ft",
    bestTime: "After 10 PM",
  },
]

const upcomingEvents = [
  {
    name: "Full Moon",
    date: "April 6, 2023",
    description: "The moon will be fully illuminated as seen from Earth.",
    type: "moon",
  },
  {
    name: "Lyrid Meteor Shower",
    date: "April 22-23, 2023",
    description: "The Lyrids produce about 20 meteors per hour at their peak.",
    type: "meteor",
  },
  {
    name: "New Moon",
    date: "April 20, 2023",
    description: "The moon will be completely dark as seen from Earth.",
    type: "moon",
  },
]

export default function MoonPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Moon Phases & Observation</h1>
        <p className="text-muted-foreground">Track lunar cycles and find the best viewing spots</p>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="current" className="flex items-center">
            <Moon className="h-4 w-4 mr-2" />
            Current Moon
          </TabsTrigger>
          <TabsTrigger value="observation" className="flex items-center">
            <Star className="h-4 w-4 mr-2" />
            Observation Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card className="border-none bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>First Quarter Moon</CardTitle>
              <CardDescription>{moonData.illumination} illuminated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <MoonPhase phase={moonData.phase} size="xl" />
                </div>

                <div className="space-y-4 flex-grow">
                  <p className="text-sm">
                    The First Quarter Moon rises around noon and sets around midnight, making it visible in the
                    afternoon and evening. At this phase, half of the moon's face is illuminated from our perspective on
                    Earth.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Moon Age</h4>
                      <p className="text-lg font-semibold">{moonData.age}</p>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Illumination</h4>
                      <p className="text-lg font-semibold">{moonData.illumination}</p>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Moonrise</h4>
                      <p className="text-lg font-semibold">{moonData.moonrise}</p>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Moonset</h4>
                      <p className="text-lg font-semibold">{moonData.moonset}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-accent" />
                Lunar Calendar
              </CardTitle>
              <CardDescription>Upcoming moon phases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <MoonPhase phase={0} size="md" />
                    <div>
                      <h4 className="font-medium">New Moon</h4>
                      <p className="text-sm text-muted-foreground">{moonData.nextNewMoon}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">In 22 days</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <MoonPhase phase={0.5} size="md" />
                    <div>
                      <h4 className="font-medium">Full Moon</h4>
                      <p className="text-sm text-muted-foreground">{moonData.nextFullMoon}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">In 8 days</div>
                </div>

                <div className="relative pt-6">
                  <div className="absolute left-0 right-0 top-0 h-px bg-border"></div>
                  <div className="flex justify-between">
                    {[0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875].map((phase, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <MoonPhase phase={phase} size="sm" />
                        <div className="text-xs text-muted-foreground mt-2">
                          {index === 0 && "New"}
                          {index === 2 && "First Quarter"}
                          {index === 4 && "Full"}
                          {index === 6 && "Last Quarter"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute left-1/4 top-0 h-4 w-px bg-primary"></div>
                  <div className="absolute left-1/4 -top-6 text-xs text-primary font-medium">Current</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="observation" className="space-y-6">
          <MoonObservation observationSpots={observationSpots} upcomingEvents={upcomingEvents} />

          <Card className="border-none bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Moon Photography Tips</CardTitle>
              <CardDescription>Capture stunning lunar images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Equipment Recommendations</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use a telephoto lens (at least 200mm) or telescope adapter</li>
                    <li>• Tripod is essential for stability</li>
                    <li>• Remote shutter release to prevent camera shake</li>
                    <li>• Consider a moon filter to reduce glare during full moon</li>
                  </ul>
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Camera Settings</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use manual mode for full control</li>
                    <li>• Start with ISO 100-400</li>
                    <li>• Aperture around f/8 to f/11</li>
                    <li>• Shutter speed 1/100 to 1/250 (varies with phase)</li>
                    <li>• Use manual focus set to infinity</li>
                  </ul>
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Best Practices</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• First quarter and last quarter moons often show more detail due to shadows</li>
                    <li>• Shoot RAW for better post-processing flexibility</li>
                    <li>• Use the "Looney 11 Rule": f/11, ISO 100, shutter speed = 1/ISO</li>
                    <li>• Consider bracketing exposures to ensure you capture details</li>
                    <li>• Allow your equipment to acclimate to outside temperature</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

