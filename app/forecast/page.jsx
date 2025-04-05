import { ForecastCard } from "@/components/forecast-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Droplets, Thermometer, Wind } from "lucide-react"
import { WeatherIcon } from "@/components/weather-icon"

// Mock data - in a real app, this would come from an API
const weeklyForecast = [
  { day: "Today", date: "Mar 29", high: 72, low: 58, condition: "Clear", moonPhase: 0.25, precipitation: 0 },
  { day: "Sat", date: "Mar 30", high: 68, low: 55, condition: "Partly Cloudy", moonPhase: 0.28, precipitation: 10 },
  { day: "Sun", date: "Mar 31", high: 65, low: 52, condition: "Cloudy", moonPhase: 0.31, precipitation: 30 },
  { day: "Mon", date: "Apr 1", high: 62, low: 50, condition: "Rain", moonPhase: 0.34, precipitation: 80 },
  { day: "Tue", date: "Apr 2", high: 60, low: 48, condition: "Showers", moonPhase: 0.37, precipitation: 60 },
  { day: "Wed", date: "Apr 3", high: 64, low: 52, condition: "Partly Cloudy", moonPhase: 0.4, precipitation: 20 },
  { day: "Thu", date: "Apr 4", high: 67, low: 54, condition: "Clear", moonPhase: 0.43, precipitation: 0 },
]

// Hourly forecast for today
const hourlyForecast = [
  { time: "Now", temp: 72, condition: "Clear", precipitation: 0, wind: 8 },
  { time: "11 AM", temp: 73, condition: "Clear", precipitation: 0, wind: 7 },
  { time: "12 PM", temp: 74, condition: "Clear", precipitation: 0, wind: 8 },
  { time: "1 PM", temp: 74, condition: "Clear", precipitation: 0, wind: 9 },
  { time: "2 PM", temp: 73, condition: "Clear", precipitation: 0, wind: 8 },
  { time: "3 PM", temp: 72, condition: "Clear", precipitation: 0, wind: 7 },
  { time: "4 PM", temp: 71, condition: "Clear", precipitation: 0, wind: 6 },
  { time: "5 PM", temp: 69, condition: "Clear", precipitation: 0, wind: 5 },
  { time: "6 PM", temp: 67, condition: "Clear", precipitation: 0, wind: 4 },
  { time: "7 PM", temp: 65, condition: "Clear", precipitation: 0, wind: 4 },
  { time: "8 PM", temp: 63, condition: "Clear", precipitation: 0, wind: 3 },
  { time: "9 PM", temp: 61, condition: "Clear", precipitation: 0, wind: 3 },
]

export default function ForecastPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Weather Forecast</h1>
        <p className="text-muted-foreground">Detailed forecast for New York, NY</p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="daily" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Daily Forecast
          </TabsTrigger>
          <TabsTrigger value="hourly" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Hourly Forecast
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weeklyForecast.map((day, index) => (
              <ForecastCard key={index} {...day} />
            ))}
          </div>

          <Card className="border-none bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Weather Details</CardTitle>
              <CardDescription>Extended forecast information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Temperature Trend</h3>
                  <div className="h-48 bg-secondary/30 rounded-lg p-4 flex items-end">
                    {/* This would be a chart in a real app */}
                    {weeklyForecast.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                        <div
                          className="w-full bg-primary/20 rounded-t-sm relative"
                          style={{
                            height: `${(day.high - 50) * 3}px`,
                            maxHeight: "100px",
                          }}
                        >
                          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs">{day.high}°</div>
                          <div
                            className="absolute w-full bg-muted rounded-b-sm bottom-0"
                            style={{ height: `${(day.high - day.low) * 3}px` }}
                          >
                            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs">
                              {day.low}°
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Precipitation Chance</h3>
                  <div className="h-32 bg-secondary/30 rounded-lg p-4 flex items-end">
                    {/* This would be a chart in a real app */}
                    {weeklyForecast.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-2/3 bg-blue-500/70 rounded-t-sm"
                          style={{ height: `${day.precipitation}%` }}
                        ></div>
                        <div className="text-xs text-muted-foreground mt-1">{day.day}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hourly" className="space-y-6">
          <div className="overflow-x-auto pb-4">
            <div className="inline-flex space-x-4 min-w-max">
              {hourlyForecast.map((hour, index) => (
                <Card key={index} className="w-32 border-none bg-card/60 backdrop-blur-sm">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="text-sm font-medium mb-2">{hour.time}</div>
                    <WeatherIcon condition={hour.condition} size={28} className="mb-2" />
                    <div className="text-xl font-semibold mb-2">{hour.temp}°</div>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <div className="flex flex-col items-center">
                        <Droplets className="h-3 w-3 text-blue-400 mb-1" />
                        <span className="text-xs">{hour.precipitation}%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Wind className="h-3 w-3 text-green-400 mb-1" />
                        <span className="text-xs">{hour.wind} mph</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-none bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Today's Details</CardTitle>
              <CardDescription>Hourly breakdown and conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Thermometer className="h-4 w-4 mr-1 text-red-400" />
                      Temperature
                    </h3>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-2xl font-bold">74°</div>
                        <div className="text-xs text-muted-foreground">High</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">58°</div>
                        <div className="text-xs text-muted-foreground">Low</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">72°</div>
                        <div className="text-xs text-muted-foreground">Feels Like</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Droplets className="h-4 w-4 mr-1 text-blue-400" />
                      Precipitation
                    </h3>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-2xl font-bold">0%</div>
                        <div className="text-xs text-muted-foreground">Chance</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">0.0"</div>
                        <div className="text-xs text-muted-foreground">Amount</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">65%</div>
                        <div className="text-xs text-muted-foreground">Humidity</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Wind className="h-4 w-4 mr-1 text-green-400" />
                    Wind
                  </h3>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-2xl font-bold">8 mph</div>
                      <div className="text-xs text-muted-foreground">Speed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">NE</div>
                      <div className="text-xs text-muted-foreground">Direction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">12 mph</div>
                      <div className="text-xs text-muted-foreground">Gusts</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

