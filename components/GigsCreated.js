import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect, useRef } from "react"
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
    const scrl = useRef(null); // For scrolling

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
    }, [user])
    

    //Controls scroll buttons for cards
  const ref = useRef(null);
  function scroll(scrollOffset) {
    ref.current.scrollLeft += scrollOffset;
  }

    if (user) {
        return (<>
            <div className={styles.layout}>
            <button className={styles.scroll} onClick={() => scroll(-500)}>{"<"}</button>
            <div className={styles.row}>
                <div ref={ref} className={styles.rowItems}>
                    {createdArray.map((gig) => (
                        <div className={styles.rowItem}>
                        <GigItem key={gig.id} gig={gig}/>
                        </div>
                    ))}
                </div>
            </div>
            <button className={styles.scroll} onClick={() => scroll(500)}>{">"}</button>
            </div>
            <div className={styles.button}>
                    <button
                        onClick={() => {
                            setCreatingGig(true)
                        }}
                    >
                        Create a Gig
                    </button>
                </div>
                </>
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