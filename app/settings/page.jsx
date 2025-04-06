"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Moon, Sun, Palette, MapPin } from "lucide-react"
import { useLocation } from "@/contexts/location-context"
import { LocationSearch } from "@/components/location-search"

export default function SettingsPage() {
  const { location, temperatureUnit, setTemperatureUnit } = useLocation()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [locationPermission, setLocationPermission] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [particleDensity, setParticleDensity] = useState([50])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your Lunar Weather experience</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-none bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-accent" />
              Location Settings
            </CardTitle>
            <CardDescription>Change your location and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Current Location</Label>
              <div className="flex items-center justify-between">
                <p className="text-sm">{location}</p>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              <div className="pt-2">
                <LocationSearch />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="location-permission">Location Permission</Label>
                <Switch id="location-permission" checked={locationPermission} onCheckedChange={setLocationPermission} />
              </div>
              <p className="text-sm text-muted-foreground">Allow the app to access your device's location</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5 text-accent" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the look and feel of the app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <RadioGroup defaultValue="dark" id="theme" className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                  <Label
                    htmlFor="dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent/5 hover:border-accent peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent"
                  >
                    <Moon className="mb-3 h-6 w-6" />
                    Dark
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="light" id="light" className="peer sr-only" />
                  <Label
                    htmlFor="light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent/5 hover:border-accent peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent"
                  >
                    <Sun className="mb-3 h-6 w-6" />
                    Light
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="system" id="system" className="peer sr-only" />
                  <Label
                    htmlFor="system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent/5 hover:border-accent peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent"
                  >
                    <Settings className="mb-3 h-6 w-6" />
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">Animations</Label>
                <Switch id="animations" checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
              </div>
              <p className="text-sm text-muted-foreground">Enable or disable animations throughout the app</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="particle-density">Background Particle Density</Label>
              <Slider
                id="particle-density"
                min={0}
                max={100}
                step={1}
                value={particleDensity}
                onValueChange={setParticleDensity}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-accent" />
              General Settings
            </CardTitle>
            <CardDescription>Configure app preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="temperature-unit">Temperature Unit</Label>
              <RadioGroup
                value={temperatureUnit}
                onValueChange={(value) => setTemperatureUnit(value)}
                className="grid grid-cols-2 gap-4 pt-2"
              >
                <div>
                  <RadioGroupItem value="metric" id="celsius" className="peer sr-only" />
                  <Label
                    htmlFor="celsius"
                    className="flex items-center justify-center rounded-md border-2 border-muted bg-card p-4 hover:bg-accent/5 hover:border-accent peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent"
                  >
                    Celsius (°C)
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="imperial" id="fahrenheit" className="peer sr-only" />
                  <Label
                    htmlFor="fahrenheit"
                    className="flex items-center justify-center rounded-md border-2 border-muted bg-card p-4 hover:bg-accent/5 hover:border-accent peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent"
                  >
                    Fahrenheit (°F)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refresh-rate">Data Refresh Rate</Label>
              <Select defaultValue="30">
                <SelectTrigger id="refresh-rate">
                  <SelectValue placeholder="Select refresh rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                  <SelectItem value="manual">Manual only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
              <p className="text-sm text-muted-foreground">Receive alerts for weather changes and celestial events</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

