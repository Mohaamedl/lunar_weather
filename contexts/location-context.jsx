"use client"

import { createContext, useContext, useEffect, useState } from "react"

const LocationContext = createContext(undefined)

export function LocationProvider({ children }) {
  const [location, setLocation] = useState("London")
  const [temperatureUnit, setTemperatureUnit] = useState("metric")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocation = localStorage.getItem("lunarweather-location")
      const savedUnit = localStorage.getItem("lunarweather-unit")

      if (savedLocation) setLocation(savedLocation)
      if (savedUnit) setTemperatureUnit(savedUnit)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lunarweather-location", location)
      localStorage.setItem("lunarweather-unit", temperatureUnit)
    }
  }, [location, temperatureUnit])

  const unitSymbol = temperatureUnit === "imperial" ? "°F" : "°C"

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        temperatureUnit,
        setTemperatureUnit,
        unitSymbol,
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

