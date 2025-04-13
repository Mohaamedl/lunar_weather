"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { submitReport } from "@/lib/actions"
import { sendConfirmationEmail } from "@/lib/email"
import { confirmationCodeSchema, reportFormSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"

export function ReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [emailSent, setEmailSent] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [userCode, setUserCode] = useState("")
  const [recaptchaToken, setRecaptchaToken] = useState(null)

  const form = useForm({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      reportType: "bug",
      description: "",
      location: "",
      device: "",
      browser: "",
      acceptTerms: false,
    },
    mode: "all"
  });

  // Load cached form data on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem('report-form-data')
      if (cached) {
        const parsedData = JSON.parse(cached)
        Object.keys(parsedData).forEach(key => {
          form.setValue(key, parsedData[key])
        })
      }
    } catch (error) {
      console.error("Error loading cached form data:", error)
    }
  }, []);

  // Save form data to cache when it changes
  useEffect(() => {
    const formData = form.getValues()
    localStorage.setItem('report-form-data', JSON.stringify(formData))
  }, [form.watch()])

  const {
    formState: { errors, isValid, isDirty },
    handleSubmit,
    watch,
    trigger,
    setValue,
    register
  } = form;

  const handleRecaptchaError = () => {
    setSubmitStatus({
      type: "error",
      message: "reCAPTCHA verification failed. Please try again."
    });
  };

  const handleSubmitForm = async (data) => {
    // Force validation of all fields
    const isValidForm = await trigger();

    if (!isValidForm) {
      setSubmitStatus({
        type: "error",
        message: "Please fill out all required fields correctly"
      });
      return;
    }

    if (!recaptchaToken) {
      setSubmitStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (!emailSent) {
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        setConfirmationCode(code)

        try {
          const emailResult = await sendConfirmationEmail({
            to: data.email,
            name: data.name,
            code: code
          })

          if (!emailResult.success) {
            throw new Error(emailResult.error || "Failed to send confirmation email")
          }

          setEmailSent(true)
          setSubmitStatus({
            type: "info",
            message: "Please check your email for the confirmation code.",
          })
        } catch (emailError) {
          console.error("Email error:", emailError)
          setSubmitStatus({
            type: "error",
            message: "Failed to send confirmation email. Please try again."
          })
          return
        }
      } else {
        const codeValidation = confirmationCodeSchema.safeParse({ code: userCode })
        
        if (!codeValidation.success) {
          setSubmitStatus({
            type: "error",
            message: "Invalid confirmation code format",
          })
          return
        }

        if (userCode !== confirmationCode) {
          setSubmitStatus({
            type: "error",
            message: "Incorrect confirmation code",
          })
          return
        }

        const result = await submitReport({
          ...data,
          recaptchaToken
        })

        if (result.success) {
          setSubmitStatus({
            type: "success",
            message: "Your report has been submitted successfully. Thank you for helping us improve Lunar Weather!",
          })
          // Clear form
          form.reset()
          setEmailSent(false)
          setConfirmationCode("")
          setUserCode("")
          // Clear cache on successful submission
          localStorage.removeItem('report-form-data')
        } else {
          throw new Error(result.error || "Error submitting report")
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
  };

  // Clear cache when form is reset
  const handleReset = () => {
    form.reset();
    localStorage.removeItem('report-form-data');
  };

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

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          {!emailSent ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    {...register("name")}
                    placeholder="Your name"
                    required
                    aria-invalid={!!errors.name}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    {...register("email")}
                    placeholder="your.email@example.com"
                    required
                    aria-invalid={!!errors.email}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select 
                  value={watch("reportType")}
                  onValueChange={(value) => {
                    setValue("reportType", value);
                    trigger("reportType");
                  }}
                  required
                >
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/80 backdrop-blur-sm min-w-[var(--radix-select-trigger-width)] ">
                    <SelectItem value="bug">Bug or Technical Error</SelectItem>
                    <SelectItem value="data">Incorrect Weather Information</SelectItem>
                    <SelectItem value="ui">Interface Issue</SelectItem>
                    <SelectItem value="suggestion">Improvement Suggestion</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reportType && (
                  <p className="text-sm text-red-500">{errors.reportType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Issue Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  {...register("description")}
                  placeholder="Describe the issue in detail. Include steps to reproduce if applicable."
                  rows={5}
                  required
                  aria-invalid={!!errors.description}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    {...register("location")}
                    placeholder="E.g., New York, USA"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="device">Device</Label>
                  <Input
                    id="device"
                    name="device"
                    {...register("device")}
                    placeholder="E.g., iPhone 13, Desktop"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="browser">Browser</Label>
                  <Input
                    id="browser"
                    name="browser"
                    {...register("browser")}
                    placeholder="E.g., Chrome, Safari"
                  />
                </div>
              </div>

              <div className="mt-6">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={setRecaptchaToken}
                  onError={handleRecaptchaError}
                  onExpired={() => setRecaptchaToken(null)}
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={watch('acceptTerms')}
                  onCheckedChange={(checked) => {
                    setValue('acceptTerms', checked);
                    trigger('acceptTerms');
                  }}
                  aria-invalid={!!errors.acceptTerms}
                />
                <div className="space-y-1">
                  <label htmlFor="acceptTerms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="underline">
                      Terms of Service
                    </Link>
                    {" "}and{" "}
                    <Link href="/privacy-policy" className="underline">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm">
                  We've sent a confirmation code to <strong>{watch("email")}</strong>. Please check your
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
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {emailSent ? "Verifying..." : "Sending..."}
                </>
              ) : (
                emailSent ? "Confirm & Submit" : "Submit Report"
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

