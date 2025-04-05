"use client"

import type React from "react"

import { useState } from "react"
import { useLocation } from "@/contexts/location-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"
import { getCurrentWeather } from "@/lib/weather-service"

export function LocationSearch() {
  const { setLocation } = useLocation()
  const [searchInput, setSearchInput] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchInput.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      console.log("Searching for location:", searchInput)

      // Validate location by attempting to fetch weather data
      await getCurrentWeather(searchInput)

      // If successful, update the location
      setLocation(searchInput)
      setSearchInput("")
    } catch (err: any) {
      console.error("Location search error:", err)
      setError(err.message || "Location not found. Please try another city name.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 relative">
      <Input
        type="text"
        placeholder="Search city (e.g., London, Paris)"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="bg-secondary/30"
      />
      <Button type="submit" size="icon" disabled={isSearching}>
        {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
      </Button>

      {error && <div className="absolute -bottom-6 left-0 text-xs text-red-400">{error}</div>}
    </form>
  )
}

