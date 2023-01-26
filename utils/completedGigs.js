// This is not working
import { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

export default function useGetCompleted(reviewing) {
    const [completedGigs, setCompletedGigs] = useState([])
    const supabase = useSupabaseClient()
    const user = useUser()
    async function getCompleted() {
        let { data: completed, error } = await supabase
            .from("gigs")
            .select("*")
            .eq("bookee", user.id)
            .lt("endtime", "now()")
            .eq("reviewed", false)
        setCompletedGigs(completed)
    }

    useEffect(() => {
        getCompleted()
    }, [])

    useEffect(() => {
        getCompleted()
    }, [reviewing])
    return {
        completedGigs,
    }
}