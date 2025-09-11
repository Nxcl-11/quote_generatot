import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
    const cookieStore = cookies()
    const supabase = createClient(await cookieStore)

    const { data: quotes } = await supabase.from('quotes').select()

    return (
        <ul>
            {quotes?.map((quote) => (
                <li key={quote.id}>{quote.text} - {quote.author}</li>
            ))}
        </ul>
    )
}
