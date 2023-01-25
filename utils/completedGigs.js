// This is not working
import { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

export default function useGetCompleted() {
    const [completedGigs, setCompletedGigs] = useState([])
    const supabase = useSupabaseClient()
    const user = useUser()

    useEffect(() => {
        async function getCompleted() {
            let { data: completed, error } = await supabase
                .from("gigs")
                .select("*")
                .eq("bookee", user.id)
                .gt("endtime", "now()")
            setCompletedGigs(completed)
        }
        getCompleted()
    }, [])

    return {
        completedGigs,
    }
}