import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import GigItem from "./GigItem"
import GigCreation from "./GigCreation"

export default function GigsBooked({ session }) {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [bookedArray, setBookedArray] = useState([])
    const [gigsAvailable, setGigsAvailable] = useState(false)
    async function getCreatedGigs() {
        try {
            let { data: userBookedGigs, error } = await supabase
                .from("gigs")
                .select("*")
                .eq("chosen_id", user.id)

            if (error) {
                throw error
            }

            if (userBookedGigs) {
                console.log("getCreatedGigs(): gigs: ", userBookedGigs)
                setCreatedArray([...userBookedGigs])
                setGigsAvailable(true)
            } else {
                console.log("No Data")
                // return ("<p>oh dear</p>")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCreatedGigs()
    }, [])

    return (
        <>
            {gigsAvailable ? (
                <div>
                    {createdArray.map((gig) => (
                        <GigItem gig={gig}></GigItem>
                    ))}
                </div>
            ) : (
                <div>
                    <p>
                        You have not booked any gigs. Please navigate to the
                        gigs page to book a gig
                    </p>
                    <Link href={"/"}>
                        <button>Book a Gig</button>
                    </Link>
                    <GigCreation />
                </div>
            )}
        </>
    )
}
