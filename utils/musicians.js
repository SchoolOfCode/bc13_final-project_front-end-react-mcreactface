// This is not working
import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function useGetMusicians() {
    const [musicians, setMusicians] = useState([])
    const supabase = useSupabaseClient()

    useEffect(() => {
        async function getMusicians() {
            let { data: musicians, error } = await supabase
                .from("profiles")
                .select("*")
            setMusicians(musicians)
        }
        getMusicians()
    }, [])

    return {
        musicians,
    }
}
