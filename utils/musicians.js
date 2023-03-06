// This is not working
// I moved the useEffect to the function in question - J
import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function useGetMusicians(range) {
    const [musicians, setMusicians] = useState([])
    const supabase = useSupabaseClient()

    useEffect(() => {
        async function getMusicians() {
            console.log("in useGetMusicians: range: ", range)
            let { data: musicians, error } = await supabase
                .from("profiles")
                .select("*")
                .range(...range)
            setMusicians(musicians)
        }
        getMusicians()
    }, [])

    return {
        musicians,
    }
}
