"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera } from "lucide-react"

export function MoonPhotographyGuide() {
  return (
    <Card className="border-none bg-card/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>
          <Camera className="mr-2 h-5 w-5 text-accent inline" />
          Lunar Photography Guide
        </CardTitle>
        <CardDescription>Master the art of capturing the moon</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Essential Equipment</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>DSLR or mirrorless camera with manual controls</li>
              <li>Telephoto lens (300mm minimum, 400-600mm recommended)</li>
              <li>Sturdy tripod</li>
              <li>Remote shutter release or timer</li>
              <li>Optional: Teleconverter for extra reach</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Camera Settings</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>ISO: 100-400 (lower is better for less noise)</li>
              <li>Aperture: f/8 to f/11 for optimal sharpness</li>
              <li>Shutter Speed: 1/125 to 1/250 second</li>
              <li>Focus: Manual focus using live view</li>
              <li>File Format: RAW for better post-processing</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Advanced Techniques</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use spot metering for accurate exposure</li>
              <li>Stack multiple images to reduce noise</li>
              <li>Shoot during golden/blue hour for atmospheric effects</li>
              <li>Consider lunar phases for different lighting conditions</li>
              <li>Use the Looney 11 rule as a starting point</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
