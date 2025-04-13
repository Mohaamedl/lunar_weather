import { ReportForm } from "@/components/report-form"

export default function ReportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Report a problem</h1>
        <p className="text-muted-foreground">
          We appreciate your feedback! If you encounter any issues or have suggestions for improvement, please fill out the form below. 
          <br />
          Your input is invaluable in helping us enhance the Lunar Weather experience.
        </p>
      </div>

      <ReportForm />
    </div>
  )
}

