"use client"

import { useState, useEffect } from "react"
import { CurrentWeather } from "@/components/current-weather"
import { ForecastCard } from "@/components/forecast-card"
import { OutfitRecommendation } from "@/components/outfit-recommendation"
import { MoonPhase } from "@/components/moon-phase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Shirt, ArrowRight, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useLocation } from "@/contexts/location-context"
import {
  getForecast,
  groupForecastByDay,
  formatDay,
  formatDate,
  getMoonPhase,
  getMoonPhaseName,
  getMockForecastData,
} from "@/lib/weather-service"

export default function Home() {
  const { location, temperatureUnit } = useLocation()
  const [forecastData, setForecastData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [moonPhase, setMoonPhase] = useState(0.25)
  const [moonPhaseName, setMoonPhaseName] = useState("First Quarter")

  const fetchForecast = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log(
        "Fetching forecast with API key:",
        process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ? "Available" : "Not available",
      )
      const data = await getForecast(location, temperatureUnit)
      const processedData = groupForecastByDay(data)
      setForecastData(processedData)

      // Calculate moon phase for today
      const phase = getMoonPhase()
      setMoonPhase(phase)
      setMoonPhaseName(getMoonPhaseName(phase))
    } catch (err) {
      console.error("Error fetching forecast:", err)
      setError(err.message || "Failed to load forecast data. Please try again.")

      // Use mock data as fallback
      const mockData = getMockForecastData()
      setForecastData(mockData)

      // Calculate moon phase for today
      const phase = getMoonPhase()
      setMoonPhase(phase)
      setMoonPhaseName(getMoonPhaseName(phase))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchForecast()
  }, [location, temperatureUnit])

  return (
    <div className="space-y-8">
      <section className="grid gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome to Lunar Weather</h1>
            <p className="text-muted-foreground">Your celestial guide to weather and moon phases</p>
          </div>
        </div>

        <CurrentWeather />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-accent" />
            5-Day Forecast
          </h2>
          <div className="flex items-center gap-2">
            {error && (
              <Button variant="outline" size="sm" onClick={fetchForecast} className="flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Retry
              </Button>
            )}
            <Link href="/forecast">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View Full Forecast
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecastData.slice(0, 5).map((day, index) => (
                <ForecastCard
                  key={index}
                  day={formatDay(day.date, index === 0)}
                  date={formatDate(day.date)}
                  high={day.high}
                  low={day.low}
                  condition={day.condition}
                  moonPhase={day.moonPhase}
                  precipitation={day.precipitation}
                />
              ))}
            </div>

            {error && (
              <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400">
                {error} Using cached data.
              </div>
            )}
          </>
        )}
      </section>

      <section className="grid md:grid-cols-2 gap-6  px-5 py-4 ">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight flex items-center">
              <Shirt className="h-5 w-5 mr-2 text-accent" />
              Today's Recommendations
            </h2>
            <Link href="/recommendations">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoading || !forecastData.length ? (
            <Card className="border-none bg-card/60 backdrop-blur-sm h-[300px] flex items-center justify-center">
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              ) : (
                <p className="text-muted-foreground">No data available</p>
              )}
            </Card>
          ) : (
            <OutfitRecommendation
              temperature={forecastData[0].high}
              condition={forecastData[0].condition}
              windSpeed={8} // This would come from current weather data
              precipitation={forecastData[0].precipitation}
            />
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight flex items-center">
              <MoonPhase phase={moonPhase} size="sm" className="mr-2" />
              Moon Phase & Events
            </h2>
            <Link href="/moon">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Card className="border-none bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle>{moonPhaseName}</CardTitle>
              <CardDescription>{Math.round(moonPhase * 100)}% illuminated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <MoonPhase phase={moonPhase} size="xl" />
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  {moonPhase < 0.25
                    ? "The Waxing Crescent Moon rises in the morning and sets in the evening, visible in the afternoon."
                    : moonPhase < 0.5
                      ? "The First Quarter Moon rises around noon and sets around midnight, making it visible in the afternoon and evening."
                      : moonPhase < 0.75
                        ? "The Full Moon rises at sunset and sets at sunrise, visible all night."
                        : "The Last Quarter Moon rises around midnight and sets around noon, making it visible in the early morning."}
                </p>
                <h4 className="text-sm font-medium mt-4">Upcoming Events:</h4>
                <div className="text-sm text-muted-foreground">
                  <p>
                    • Full Moon -{" "}
                    {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>• Lyrid Meteor Shower - April 22</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

