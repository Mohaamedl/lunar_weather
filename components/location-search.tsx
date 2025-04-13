"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocation } from "@/contexts/location-context"
import { getCurrentWeather } from "@/lib/weather-service"
import { Loader2, Search } from "lucide-react"
import { useState } from "react"

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
    <form 
      onSubmit={handleSearch} 
      className="flex w-[180px] sm:w-[200px] md:w-[250px] lg:w-[300px] items-center space-x-2 relative"
    >
      <Input
        type="text"
        placeholder="Search city..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="bg-secondary/30 w-full"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isSearching}
        className="relative right-1 top-1/2 -translate-y-1/2 h-8 w-8"
      >
        {isSearching ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </Button>

      {error && (
        <div className="absolute -bottom-6 left-0 text-xs text-red-400 w-full truncate">
          {error}
        </div>
      )}
    </form>
  )
}

