"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { WeatherIcon } from "@/components/weather-icon"
import { MoonPhase } from "@/components/moon-phase"
import { Droplets, Thermometer, Wind, Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocation } from "@/contexts/location-context"
import {
  getCurrentWeather,
  type WeatherData,
  mapWeatherCondition,
  getMoonPhase,
  getMoonPhaseName,
  getMockWeatherData,
} from "@/lib/weather-service"
import { Button } from "@/components/ui/button"

interface CurrentWeatherProps {
  className?: string
}

export function CurrentWeather({ className }: CurrentWeatherProps) {
  const { location, temperatureUnit, unitSymbol } = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [moonPhase, setMoonPhase] = useState(0.25)
  const [moonPhaseName, setMoonPhaseName] = useState("First Quarter")

  const fetchWeather = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log(
        "Fetching weather with API key:",
        process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ? "Available" : "Not available",
      )
      const data = await getCurrentWeather(location, temperatureUnit)
      console.log("Weather data:", data);
      setWeatherData(data)

      // Calculate moon phase for today
      const phase = getMoonPhase()
      setMoonPhase(phase)
      setMoonPhaseName(getMoonPhaseName(phase))
    } catch (err: any) {
      console.error("Error fetching weather:", err)
      setError(err.message || "Failed to load weather data. Please try again.")

      // Use mock data as fallback
      const mockData = getMockWeatherData()
      setWeatherData(mockData)

      // Calculate moon phase for today
      const phase = getMoonPhase()
      setMoonPhase(phase)
      setMoonPhaseName(getMoonPhaseName(phase))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [location, temperatureUnit])

  return (
    <Card
      className={cn(
        "overflow-hidden border-none bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md weather-card",
        className,
      )}
    >
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        ) : weatherData ? (
          <>
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {weatherData.name}
                  {weatherData.sys.country ? `, ${weatherData.sys.country}` : ""}
                </h2>
                <p className="text-sm text-muted-foreground">Updated just now</p>
              </div>

              {error && (
                <Button variant="outline" size="sm" onClick={fetchWeather} className="flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Retry
                </Button>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
              <div className="flex items-center">
                <WeatherIcon condition={mapWeatherCondition(weatherData.weather[0].main)} size={64} className="mr-4" />
                <div>
                  <div className="text-5xl font-bold">
                    {Math.round(weatherData.main.temp)}
                    {unitSymbol}
                  </div>
                  <div className="text-muted-foreground">{weatherData.weather[0].description}</div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <MoonPhase phase={moonPhase} size="lg" className="mb-2" />
                <span className="text-sm text-muted-foreground">{moonPhaseName}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-lg">
                <Droplets className="h-6 w-6 mb-2 text-blue-400" />
                <span className="text-sm text-muted-foreground">Humidity</span>
                <span className="text-xl font-semibold">{weatherData.main.humidity}%</span>
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-lg">
                <Thermometer className="h-6 w-6 mb-2 text-red-400" />
                <span className="text-sm text-muted-foreground">Feels Like</span>
                <span className="text-xl font-semibold">
                  {Math.round(weatherData.main.feels_like)}
                  {unitSymbol}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-lg">
                <Wind className="h-6 w-6 mb-2 text-green-400" />
                <span className="text-sm text-muted-foreground">Wind Speed</span>
                <span className="text-xl font-semibold">
                  {Math.round(weatherData.wind.speed)} {temperatureUnit === "imperial" ? "mph" : "m/s"}
                </span>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400">
                {error} Using cached data.
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-red-400 mb-2">Failed to load weather data</p>
            <Button onClick={fetchWeather} variant="outline" size="sm" className="mt-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

