import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !anon) {
        return NextResponse.json(
            { error: "Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)" },
            { status: 500 }
        )
    }

    const supabase = createClient()

    // 1. Count the rows
    const { count, error: countErr } = await supabase
        .from("quotes")
        .select("id", { count: "exact", head: true })

    if (countErr) {
        return NextResponse.json(
            { error: "Count failed", details: countErr.message },
            { status: 500 }
        )
    }
    if (!count || count === 0) {
        return NextResponse.json({ error: "No quotes in table" }, { status: 404 })
    }

    // 2. random index pick
    const randomIndex = Math.floor(Math.random() * count)

    // 3. Fetch exactly that row (ordered by id for deterministic offset)
    const { data, error: rowErr } = await supabase
        .from("quotes")
        .select("id,text,author,created_at")
        .order("id", { ascending: true })
        .range(randomIndex, randomIndex)

    if (rowErr) {
        return NextResponse.json(
            { error: "Row fetch failed", details: rowErr.message },
            { status: 500 }
        )
    }
    if (!data || data.length === 0) {
        return NextResponse.json(
            { error: "Random row not found (possible RLS policy issue)" },
            { status: 404 }
        )
    }

    // Return wrapped object so frontend can read data.quote
    return NextResponse.json({ quote: data[0] })
}
