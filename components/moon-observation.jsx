import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Star, Moon, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function MoonObservation({ observationSpots, upcomingEvents, className }) {
  return (
    <Card className={cn("border-none bg-card/60 backdrop-blur-sm", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 h-5 w-5 text-accent" />
          Observation Guide
        </CardTitle>
        <CardDescription>Best spots and upcoming celestial events</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            Best Observation Spots Near You
          </h3>
          <div className="grid gap-3">
            {observationSpots.map((spot, index) => (
              <div key={index} className="flex flex-col p-3 bg-secondary/30 rounded-lg">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{spot.name}</h4>
                  <Badge
                    variant={
                      spot.lightPollution === "Low"
                        ? "default"
                        : spot.lightPollution === "Medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {spot.lightPollution} Light Pollution
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-1">Distance:</span> {spot.distance}
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-1">Elevation:</span> {spot.elevation}
                  </div>
                  <div className="flex items-center col-span-2">
                    <span className="text-muted-foreground mr-1">Best time:</span> {spot.bestTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Upcoming Celestial Events
          </h3>
          <div className="grid gap-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start p-3 bg-secondary/30 rounded-lg">
                <div className="mr-3 mt-1">
                  {event.type === "moon" ? (
                    <Moon className="h-5 w-5 text-gray-300" />
                  ) : event.type === "meteor" ? (
                    <Star className="h-5 w-5 text-accent" />
                  ) : (
                    <Star className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium">{event.name}</h4>
                    <span className="text-xs text-muted-foreground ml-2">{event.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

