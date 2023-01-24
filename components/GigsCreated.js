import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react"
import GigCreation from "./GigCreation"
import GigItem from "./GigItem"
import { SimpleSlider } from "./SimpleSlider/carousel"
import styles from './GigsCreated.module.css'

export default function GigsCreated({ session }) {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [createdArray, setCreatedArray] = useState([])
    const [gigsAvailable, setGigsAvailable] = useState(false)
    const [creatingGig, setCreatingGig] = useState(false)
    async function getCreatedGigs() {
        try {
            let { data: userCreatedGigs, error } = await supabase
                .from("gigs")
                .select("*")
                .eq("bookee", user.id)

            if (error) {
                throw error
            }

            if (userCreatedGigs) {
                console.log("getCreatedGigs(): gigs: ", userCreatedGigs)
                setCreatedArray([...userCreatedGigs])
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

    if (!creatingGig && user) {
        return (
            <div className={styles.sliderContainer}>
                {gigsAvailable ? (
                        <SimpleSlider gigarray={createdArray}/>
                ) : (
                    <div>"You have not created any gigs"</div>
                )}
                <div>
                    <button
                        onClick={() => {
                            setCreatingGig(true)
                        }}
                    >
                        Create a new gig
                    </button>
                </div>
            </div>
        )
    } else if (creatingGig && user) {
        return (
            <div>
                <GigCreation
                    id={user.id}
                    closeModal={() => {
                        setCreatingGig(false)
                    }}
                />
            </div>
        )
    }
}
{/* <div className={styles.gigParent}>
                    {output.map((gig) => (
                        <GigItem key={gig.id} gig={gig}></GigItem>
                    ))}
                </div> */}