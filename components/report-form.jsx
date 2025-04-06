"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { submitReport } from "@/lib/actions"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useState } from "react"

export function ReportForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reportType: "bug", 
    description: "",
    location: "",
    device: "",
    browser: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [emailSent, setEmailSent] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [userCode, setUserCode] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // First, send a confirmation email
      if (!emailSent) {
        // Generate a random 6-digit confirmation code
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        setConfirmationCode(code)

        // Simulate email sending (in production, this would be a real Server Action)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setEmailSent(true)
        setSubmitStatus({
          type: "info",
          message: "We've sent a confirmation code to your email. Please check and enter the code below.",
        })
      } else {
        // Verify confirmation code
        if (userCode !== confirmationCode) {
          setSubmitStatus({
            type: "error",
            message: "Incorrect confirmation code. Please try again.",
          })
        } else {
          // Submit the report
          const result = await submitReport(formData)

          if (result.success) {
            setSubmitStatus({
              type: "success",
              message: "Your report has been submitted successfully. Thank you for helping us improve Lunar Weather!",
            })
            // Clear form
            setFormData({
              name: "",
              email: "",
              reportType: "bug",
              description: "",
              location: "",
              device: "",
              browser: "",
            })
            setEmailSent(false)
            setConfirmationCode("")
            setUserCode("")
          } else {
            throw new Error(result.error || "Error submitting report")
          }
        }
      }
    } catch (error) {
      console.error("Error submitting report:", error)
      setSubmitStatus({
        type: "error",
        message: "An error occurred while submitting your report. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-none bg-card/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Report an Issue</CardTitle>
        <CardDescription>
          Help us improve Lunar Weather by reporting bugs, incorrect information, or suggestions
        </CardDescription>
      </CardHeader>

      <CardContent>
        {submitStatus && (
          <Alert
            className={`mb-6 ${
              submitStatus.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-600"
                : submitStatus.type === "success"
                  ? "bg-green-500/10 border-green-500/20 text-green-600"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-600"
            }`}
          >
            <div className="flex items-start">
              {submitStatus.type === "error" ? (
                <AlertCircle className="h-5 w-5 mr-2" />
              ) : submitStatus.type === "success" ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <div>
                <AlertTitle>
                  {submitStatus.type === "error" ? "Error" : submitStatus.type === "success" ? "Success" : "Information"}
                </AlertTitle>
                <AlertDescription>{submitStatus.message}</AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!emailSent ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select
                  value={formData.reportType}
                  onValueChange={(value) => handleSelectChange("reportType", value)}
                  required
                >
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/80 backdrop-blur-sm">
                    <SelectItem value="bug">Bug or Technical Error</SelectItem>
                    <SelectItem value="data">Incorrect Weather Information</SelectItem>
                    <SelectItem value="ui">Interface Issue</SelectItem>
                    <SelectItem value="suggestion">Improvement Suggestion</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Issue Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail. Include steps to reproduce if applicable."
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="E.g., New York, USA"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="device">Device</Label>
                  <Input
                    id="device"
                    name="device"
                    value={formData.device}
                    onChange={handleChange}
                    placeholder="E.g., iPhone 13, Desktop"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="browser">Browser</Label>
                  <Input
                    id="browser"
                    name="browser"
                    value={formData.browser}
                    onChange={handleChange}
                    placeholder="E.g., Chrome, Safari"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm">
                  We've sent a confirmation code to <strong>{formData.email}</strong>. Please check your
                  inbox and enter the code below to confirm your report submission.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: In a production environment, you would receive a real email. For demonstration purposes, the confirmation
                  code is: <span className="font-mono font-bold">{confirmationCode}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmationCode">Confirmation Code</Label>
                <Input
                  id="confirmationCode"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
              </div>
            </div>
          )}

          <CardFooter className="px-0 pt-4 flex justify-between">
            {emailSent && (
              <Button type="button" variant="outline" onClick={() => setEmailSent(false)} disabled={isSubmitting}>
                Back
              </Button>
            )}
            <Button type="submit" className="ml-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {emailSent ? "Verifying..." : "Sending..."}
                </>
              ) : emailSent ? (
                "Confirm & Submit"
              ) : (
                "Submit Report"
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

