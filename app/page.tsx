import { QuoteGenerator } from "@/components/QuoteGenerator"
import { Crest } from "@/components/Crest"

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[oklch(0.97_0.01_130)] relative overflow-hidden">
      {/* Subtle layered texture */}
      <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(135deg,rgba(40,70,50,0.04)_0_14px,transparent_14px_28px)] opacity-60" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_20%,rgba(40,90,60,0.12),transparent_60%),radial-gradient(circle_at_85%_80%,rgba(120,90,30,0.10),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Heritage Panel */}
          <aside className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Crest />
            <h1 className="mt-8 font-serif text-[clamp(2.6rem,4.2vw,3.8rem)] leading-none font-semibold tracking-wide text-[oklch(0.27_0.04_150)] max-w-sm">
              The<br className="hidden md:block" /> Quote Collection
            </h1>
            <p className="mt-6 font-serif text-lg italic text-[oklch(0.40_0.04_150)]/90 max-w-sm">
              A curated compendium of distilled sentiment & reflective phrasing.
            </p>
            <div className="relative mt-10 w-40 h-px bg-gradient-to-r from-transparent via-[oklch(0.42_0.06_150)] to-transparent" />
            <div className="mt-8 flex flex-col gap-3 font-serif text-sm tracking-wide text-[oklch(0.40_0.04_150)]/85">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[oklch(0.42_0.06_150)]/50" />
                <span>Collected Lines</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[oklch(0.42_0.06_150)]/50" />
                <span>Considered Words</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[oklch(0.42_0.06_150)]/50" />
                <span>Tasteful Restraint</span>
              </div>
            </div>
          </aside>

          {/* Content Panel */}
          <section className="lg:col-span-7 relative">
            <div className="relative rounded-xl border border-[oklch(0.86_0.01_140)]/70 bg-card/75 backdrop-blur-sm shadow-[0_6px_18px_-8px_rgba(0,0,0,0.18)] before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:[background:linear-gradient(to_bottom,rgba(255,255,255,0.5),rgba(255,255,255,0))]">
              <div className="p-8 md:p-10">
                <QuoteGenerator />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
