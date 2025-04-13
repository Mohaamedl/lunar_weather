import { MoonObservation } from "@/components/moon-observation"
import { MoonPhase } from "@/components/moon-phase"
import { MoonPhotographyGuide } from "@/components/moon-photography-guide"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Moon, Star } from "lucide-react"

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
    distance: "1.9 km",  
    lightPollution: "High",
    elevation: "6 m", 
    bestTime: "Early evening",
  },
  {
    name: "Brooklyn Heights Promenade",
    distance: "5.6 km",
    lightPollution: "Medium",
    elevation: "20 m",
    bestTime: "After 9 PM",
  },
  {
    name: "Floyd Bennett Field",
    distance: "19.8 km",
    lightPollution: "Low",
    elevation: "4.5 m",
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
              <CardTitle className="text-2xl">First Quarter Moon</CardTitle>
              <CardDescription className="text-lg">{moonData.illumination} illuminated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-8">
                <div className="w-full flex justify-center p-8">
                  <MoonPhase phase={moonData.phase} size="xl" className="text-[200px]" />
                </div>
                <div className="text-center space-y-4 max-w-2xl">
                  <p className="text-lg">
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
              <CardDescription>Moon phase progression</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Next phases */}
                <div className="grid gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <MoonPhase phase={0} size="md" />
                      <div>
                        <h4 className="font-medium mb-1">New Moon</h4>
                        <p className="text-sm text-muted-foreground">{moonData.nextNewMoon}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground px-4 py-1 bg-secondary/50 rounded-full">
                      In 22 days
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <MoonPhase phase={0.5} size="md" />
                      <div>
                        <h4 className="font-medium mb-1">Full Moon</h4>
                        <p className="text-sm text-muted-foreground">{moonData.nextFullMoon}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground px-4 py-1 bg-secondary/50 rounded-full">
                      In 8 days
                    </div>
                  </div>
                </div>

                {/* Moon phase timeline */}
                <div className="relative pt-8 mt-8">
                  <div className="absolute left-0 right-0 top-0 h-px bg-border/50"></div>
                  <div className="grid grid-cols-8 gap-1">
                    {[
                      { phase: 0, label: "New Moon" },          // New Moon
                      { phase: 0.125, label: "Waxing Crescent" },
                      { phase: 0.25, label: "First Quarter" },  // First Quarter
                      { phase: 0.375, label: "Waxing Gibbous" },
                      { phase: 0.5, label: "Full Moon" },       // Full Moon
                      { phase: 0.625, label: "Waning Gibbous" },
                      { phase: 0.75, label: "Last Quarter" },   // Last Quarter
                      { phase: 0.875, label: "Waning Crescent" }
                    ].map(({ phase, label }, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="mb-2">
                          <MoonPhase phase={phase} size="sm" date={new Date()} />
                        </div>
                        <div className="text-xs text-center text-muted-foreground mt-2 px-1">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Current phase indicator */}
                  <div className="absolute left-1/4 -top-2 w-px h-4 bg-primary"></div>
                  <div className="absolute left-1/4 transform -translate-x-1/2 -top-8 px-2 py-1 rounded bg-primary text-xs font-medium">
                    Current
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="observation" className="space-y-6">
          <MoonObservation observationSpots={observationSpots} upcomingEvents={upcomingEvents} />
          <MoonPhotographyGuide />
        </TabsContent>
      </Tabs>
    </div>
  )
}

