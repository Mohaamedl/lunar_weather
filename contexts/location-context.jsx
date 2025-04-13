"use client"

import { getAirQuality, getCurrentWeather, getForecast } from "@/lib/weather-service"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export const LocationContext = createContext({})

export function LocationProvider({ children }) {
  const [mounted, setMounted] = useState(false)
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [airQuality, setAirQuality] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [temperatureUnit, setTemperatureUnit] = useState("metric") // Add temperature unit state

  // Memoize the location+unit pair to prevent unnecessary refetches
  const locationKey = useMemo(() => {
    if (!location) return null;
    return JSON.stringify({ ...location, unit: temperatureUnit });
  }, [location, temperatureUnit]);

  // Helper function to safely format coordinates
  const formatCoordinates = (lat, lon) => {
    if (typeof lat === 'number' && typeof lon === 'number') {
      return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    }
    return '';
  };

  // Handle hydration and initial data load
  useEffect(() => {
    setMounted(true)
    
    try {
      const savedLocation = localStorage.getItem("lunarweather-location")
      const savedUnit = localStorage.getItem("lunarweather-unit")

      if (savedLocation) {
        // Try to parse as JSON first
        try {
          const parsed = JSON.parse(savedLocation)
          if (parsed && parsed.lat && parsed.lon) {
            setLocation({
              lat: parseFloat(parsed.lat),
              lon: parseFloat(parsed.lon)
            })
          } else if (parsed && parsed.city) {
            setLocation({ city: parsed.city })
          }
        } catch {
          // If parsing fails, it's a plain string (legacy format)
          setLocation({ city: savedLocation.trim() })
        }
      } else {
        // Default location if none is saved
        setLocation({ city: "London" })
      }
      
      if (savedUnit && ["metric", "imperial"].includes(savedUnit)) {
        setTemperatureUnit(savedUnit)
      }
    } catch (error) {
      console.error("Error loading preferences:", error)
      setLocation({ city: "London" })
    }
  }, [])

  // Save location state
  useEffect(() => {
    if (!mounted || !location) return
    
    try {
      localStorage.setItem("lunarweather-location", JSON.stringify(location))
    } catch (error) {
      console.error("Error saving location:", error)
    }
  }, [location, mounted])

  // Save temperature unit
  useEffect(() => {
    if (!mounted) return
    
    try {
      localStorage.setItem("lunarweather-unit", temperatureUnit)
    } catch (error) {
      console.error("Error saving temperature unit:", error)
    }
  }, [temperatureUnit, mounted])

  // Single effect for fetching data
  useEffect(() => {
    if (!locationKey || !mounted || !location) return;

    const fetchData = async () => {
      if (loading) return; // Prevent concurrent fetches
      
      setLoading(true);
      setError(null);

      try {
        const params = location.city 
          ? { city: location.city }
          : { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };

        if (!params.city && (!params.lat || !params.lon)) {
          throw new Error("Invalid location parameters");
        }

        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeather(params, temperatureUnit),
          getForecast(params, temperatureUnit)
        ]);

        setWeather(weatherData);
        setForecast(forecastData);

        // Fetch air quality in background
        if (weatherData?.coord) {
          getAirQuality(weatherData.coord)
            .then(setAirQuality)
            .catch(console.error);
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err.message);
        setWeather(null);
        setForecast(null);
        setAirQuality(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locationKey, mounted, location]); // Add location to dependencies

  // Don't render until after hydration
  if (!mounted) return null

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        weather,
        forecast,
        airQuality,
        loading,
        error,
        temperatureUnit,
        setTemperatureUnit,
        unitSymbol: temperatureUnit === "imperial" ? "°F" : "°C",
        // Add helper methods for location display
        locationDisplay: location ? (
          location.city || 
          (location.lat && location.lon ? formatCoordinates(location.lat, location.lon) : '')
        ) : "",
        isCoordinates: location ? Boolean(location.lat && location.lon) : false,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}

