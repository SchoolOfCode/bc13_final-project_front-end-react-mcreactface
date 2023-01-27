import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import GigItem from "./GigItem"
import styles from "./GigsBooked.module.css"

export default function GigsBooked({ bookedList }) {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [bookedArray, setBookedArray] = useState([])
    const [bookedAvailable, setBookedAvailable] = useState(true)
    const ref = useRef(null)
    function scroll(scrollOffset) {
        ref.current.scrollLeft += scrollOffset
    }
    async function getBookedGigs() {
        try {
            let { data: userBookedGigs, error } = await supabase
                .from("gigs")
                .select("*")
                .eq("chosen_id", user.id)

            if (error) throw error

            if (userBookedGigs) {
                console.log("getBookedGigs(): gigs: ", userBookedGigs)
                setBookedArray([...userBookedGigs])
                setBookedAvailable(true)
            } else {
                console.log("No Data")
                setBookedAvailable(false)
                // return ("<p>oh dear</p>")
            }
        } catch (error) {
            setBookedArray([])
            setBookedAvailable(false)
            console.log(error)
        }
    }
    useEffect(() => {
        getBookedGigs()
    }, [])
    useEffect(() => {
        getBookedGigs()
    }, [bookedList])


    return (
            bookedAvailable ? (
                <div className={styles.layout}>
                    <button
                        className={styles.scroll}
                        onClick={() => scroll(-500)}
                    >
                        {"<"}
                    </button>
                    <div className={styles.row}>
                        <div ref={ref} className={styles.rowItems}>
                            {bookedArray.map((gig) => (
                                <div className={styles.rowItem}>
                                    <GigItem key={gig.id} gig={gig} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        className={styles.scroll}
                        onClick={() => scroll(500)}
                    >
                        {">"}
                    </button>
                </div>
            ) : (
                <div>
                    <p>
                        You have not booked any gigs. Please navigate to the
                        gigs page to book a gig
                    </p>
                    <Link href={"/gigs"}>
                        <button>Book a Gig</button>
                    </Link>
                </div>
            )
    )
}
