"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Quote, AlertCircle } from "lucide-react"

interface QuoteType {
  id: number
  text: string
  author: string
  created_at: string
}

export function QuoteGenerator() {
  const [quote, setQuote] = useState<QuoteType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRandomQuote = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/quotes/random")

      if (!response.ok) {
        throw new Error("Failed to fetch quote")
      }

      const data = await response.json()
      setQuote(data.quote)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          onClick={fetchRandomQuote}
          disabled={loading}
          size="lg"
          variant="heritage"
          className="group relative px-12 py-3 text-[0.8rem] tracking-[0.15em] font-medium rounded-sm cursor-pointer select-none overflow-hidden border border-[oklch(0.74_0.09_95)]/40 bg-[linear-gradient(to_bottom,oklch(0.42_0.06_150)_0%,oklch(0.38_0.05_150)_100%)] shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-6px_rgba(0,0,0,0.35)] hover:border-[oklch(0.74_0.09_95)]/65 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.42_0.06_150)]/50 disabled:opacity-55 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Consulting…
              </>
            ) : (
              <>
                <Quote className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                Request A Line
              </>
            )}
          </span>
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-white/60 transition-all duration-500 group-hover:w-full" />
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Error: {error}</AlertDescription>
        </Alert>
      )}

      {quote && (
        <Card className="relative animate-fade-in bg-card/85 backdrop-blur-sm border border-[oklch(0.86_0.01_140)] rounded-lg shadow-[0_4px_10px_-4px_rgba(0,0,0,0.18)]">
          <span className="pointer-events-none absolute -top-3 -left-3 h-8 w-8 rotate-45 bg-gradient-to-br from-[oklch(0.78_0.08_90)]/80 to-[oklch(0.62_0.10_95)]/30 border border-[oklch(0.74_0.09_95)]/60 shadow-[0_0_6px_rgba(120,90,30,0.35)]" />
          <span className="pointer-events-none absolute -top-3 -right-3 h-8 w-8 rotate-45 bg-gradient-to-br from-[oklch(0.78_0.08_90)]/80 to-[oklch(0.62_0.10_95)]/30 border border-[oklch(0.74_0.09_95)]/60 shadow-[0_0_6px_rgba(120,90,30,0.35)]" />
          <span className="pointer-events-none absolute -bottom-3 -left-3 h-8 w-8 rotate-45 bg-gradient-to-br from-[oklch(0.78_0.08_90)]/80 to-[oklch(0.62_0.10_95)]/30 border border-[oklch(0.74_0.09_95)]/60 shadow-[0_0_6px_rgba(120,90,30,0.35)]" />
          <span className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 rotate-45 bg-gradient-to-br from-[oklch(0.78_0.08_90)]/80 to-[oklch(0.62_0.10_95)]/30 border border-[oklch(0.74_0.09_95)]/60 shadow-[0_0_6px_rgba(120,90,30,0.35)]" />
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="flex items-center gap-2 font-serif text-lg tracking-wide text-[oklch(0.32_0.05_150)]">
              <Quote className="h-5 w-5 text-[oklch(0.74_0.09_95)]" />
              Selected Reflection
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 relative z-10">
            <blockquote className="font-serif text-2xl md:text-[2.1rem] leading-snug text-[oklch(0.27_0.04_150)] italic mb-5 relative">
              <span className="select-none text-[oklch(0.74_0.09_95)] mr-1">“</span>
              {quote.text}
              <span className="select-none text-[oklch(0.74_0.09_95)] ml-1">”</span>
            </blockquote>
            <Badge variant="secondary" className="font-serif text-sm tracking-wide bg-[oklch(0.90_0.02_140)]/70 border border-[oklch(0.86_0.01_140)] text-[oklch(0.32_0.05_150)] px-4 py-1 rounded-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              — {quote.author}
            </Badge>
          </CardContent>
        </Card>
      )}

      {!quote && !loading && !error && (
        <Card className="border border-dashed border-[oklch(0.86_0.01_140)]/80 bg-card/40 backdrop-blur-sm rounded-lg shadow-inner">
          <CardContent className="p-10 text-center">
            <Quote className="h-10 w-10 text-[oklch(0.42_0.06_150)] mx-auto mb-4" />
            <p className="font-serif text-[oklch(0.40_0.04_150)] text-lg italic">Press the button to unveil a curated line.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
