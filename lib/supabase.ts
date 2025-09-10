import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // For development without Supabase, we'll just log a warning
  console.warn("Supabase environment variables not found. Using fallback mode.")
}

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client for development
    return {
      from: () => ({
        select: () => ({
          limit: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
    } as any
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

export type Database = {
  public: {
    Tables: {
      quotes: {
        Row: {
          id: number
          text: string
          author: string
          created_at: string
        }
        Insert: {
          id?: number
          text: string
          author: string
          created_at?: string
        }
        Update: {
          id?: number
          text?: string
          author?: string
          created_at?: string
        }
      }
    }
  }
}
