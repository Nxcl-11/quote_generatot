"use client"

export function Crest() {
  return (
    <div className="relative inline-flex items-center justify-center h-24 w-24 rounded-full border border-[oklch(0.86_0.01_140)]/70 bg-[oklch(0.97_0.01_130)] shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]">
      <div className="absolute inset-0 rounded-full pointer-events-none [background:radial-gradient(circle_at_30%_25%,rgba(120,90,30,0.15),transparent_70%)]" />
      <span className="font-serif text-xl tracking-[0.2em] text-[oklch(0.27_0.04_150)] select-none">QC</span>
    </div>
  )
}

