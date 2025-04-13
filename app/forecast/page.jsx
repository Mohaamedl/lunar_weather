import { ForecastCard } from "@/components/forecast-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherIcon } from "@/components/weather-icon"
import { Calendar, Clock, Droplets, Thermometer, Wind } from "lucide-react"

// Mock data with Celsius temperatures and km/h wind speeds
const weeklyForecast = [
  { day: "Today", date: "Mar 29", high: 22, low: 14, condition: "Clear", moonPhase: 0.25, precipitation: 0 },
  { day: "Sat", date: "Mar 30", high: 20, low: 13, condition: "Partly Cloudy", moonPhase: 0.28, precipitation: 10 },
  { day: "Sun", date: "Mar 31", high: 18, low: 11, condition: "Cloudy", moonPhase: 0.31, precipitation: 30 },
  { day: "Mon", date: "Apr 1", high: 17, low: 10, condition: "Rain", moonPhase: 0.34, precipitation: 80 },
  { day: "Tue", date: "Apr 2", high: 16, low: 9, condition: "Showers", moonPhase: 0.37, precipitation: 60 },
  { day: "Wed", date: "Apr 3", high: 18, low: 11, condition: "Partly Cloudy", moonPhase: 0.4, precipitation: 20 },
  { day: "Thu", date: "Apr 4", high: 19, low: 12, condition: "Clear", moonPhase: 0.43, precipitation: 0 },
]

// Hourly forecast for today
const hourlyForecast = [
  { time: "Now", temp: 22, condition: "Clear", precipitation: 0, wind: 13 },
  { time: "11 AM", temp: 23, condition: "Clear", precipitation: 0, wind: 11 },
  { time: "12 PM", temp: 24, condition: "Clear", precipitation: 0, wind: 13 },
  { time: "1 PM", temp: 24, condition: "Clear", precipitation: 0, wind: 14 },
  { time: "2 PM", temp: 23, condition: "Clear", precipitation: 0, wind: 13 },
  { time: "3 PM", temp: 22, condition: "Clear", precipitation: 0, wind: 11 },
  { time: "4 PM", temp: 21, condition: "Clear", precipitation: 0, wind: 10 },
  { time: "5 PM", temp: 20, condition: "Clear", precipitation: 0, wind: 8 },
  { time: "6 PM", temp: 19, condition: "Clear", precipitation: 0, wind: 6 },
  { time: "7 PM", temp: 18, condition: "Clear", precipitation: 0, wind: 6 },
  { time: "8 PM", temp: 17, condition: "Clear", precipitation: 0, wind: 5 },
  { time: "9 PM", temp: 16, condition: "Clear", precipitation: 0, wind: 5 },
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
              <div className="grid gap-8">
                {/* Temperature Trend */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Temperature Trend</h3>
                  <div className="relative h-52 bg-secondary/30 rounded-lg p-6">
                    <div className="absolute inset-0 flex items-end justify-around px-2 pb-10">
                      {weeklyForecast.map((day, index) => (
                        <div key={index} className="flex flex-col items-center w-full max-w-[60px]">
                          {/* High temp label */}
                          <span className="text-xs mb-1">{day.high}°C</span>
                          
                          {/* Temperature bar */}
                          <div className="relative w-2 bg-primary/20 rounded-full"
                               style={{
                                 height: `${(day.high - day.low) * 4}px`,
                                 marginTop: `${(30 - day.high) * 4}px`
                               }}>
                            <div className="absolute bottom-0 inset-x-0 bg-primary rounded-full"
                                 style={{
                                   height: `${(day.high - day.low) * 4}px`
                                 }} />
                          </div>
                          
                          {/* Low temp label */}
                          <span className="text-xs mt-1">{day.low}°C</span>
                          
                          {/* Day label */}
                          <span className="absolute bottom-[-2rem] text-xs text-muted-foreground">
                            {day.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Precipitation Chance */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Precipitation Chance</h3>
                  <div className="relative h-40 bg-secondary/30 rounded-lg p-6">
                    <div className="absolute inset-0 flex items-end justify-around px-2 pb-10">
                      {weeklyForecast.map((day, index) => (
                        <div key={index} className="flex flex-col items-center w-full max-w-[60px]">
                          {/* Precipitation percentage */}
                          <span className="text-xs mb-1">{day.precipitation}%</span>
                          
                          {/* Precipitation bar */}
                          <div className="w-4 bg-blue-500/20 rounded-t-lg"
                               style={{
                                 height: `${day.precipitation}%`
                               }}>
                            <div className="w-full h-full bg-blue-500 rounded-t-lg opacity-50" />
                          </div>
                          
                          {/* Day label */}
                          <span className="absolute bottom-[-2rem] text-xs text-muted-foreground">
                            {day.day}
                          </span>
                        </div>
                      ))}
                    </div>
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
                        <span className="text-xs">{hour.wind} km/h</span>
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
                        <div className="text-2xl font-bold">24°</div>
                        <div className="text-xs text-muted-foreground">High</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">14°</div>
                        <div className="text-xs text-muted-foreground">Low</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">22°</div>
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
                      <div className="text-2xl font-bold">13 km/h</div>
                      <div className="text-xs text-muted-foreground">Speed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">NE</div>
                      <div className="text-xs text-muted-foreground">Direction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">19 km/h</div>
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

