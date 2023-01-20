import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function useGetSpecificGigs({ genres, instruments }) {
    const [filteredGigs, setFilteredGigs] = useState([])
    const supabase = useSupabaseClient()

    useEffect(() => {
        async function getSpecificGigs() {
            let { data: specificGigs, error } = await supabase
                .from("gigs")
                .select("*")
                .filter("genres", "cs", genres)
                .filter("instrumentreq", "cs", instruments)
            setFilteredGigs(specificGigs)
        }
        getSpecificGigs()
    }, [])

    return {
        filteredGigs,
    }
}
