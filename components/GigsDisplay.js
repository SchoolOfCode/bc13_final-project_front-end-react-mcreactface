import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import {
    useUser,
    useSupabaseClient,
    useSession,
} from "@supabase/auth-helpers-react"

import GigItem from "./GigItem.js"
import styles from "./GigItem.module.css"

export default function GigsDisplay() {
    const supabase = useSupabaseClient()
    const session = useSession()
    const user = useUser()
    const [output, setOutput] = useState([])
    const [genres, setGenres] = useState([])
    const [tableState, setTableState] = useState({})
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [monthPageOne, setMonthPageOne] = useState(true)
    const router = useRouter()
    const data = router.query



    useEffect(() => {
        supabase.auth.getUser().then((response) => {
            console.log("in useEffect, userdata: ", response.data.user)
            setUserData(response.data.user)
            setLoading(false)
        })

        getGigs(userData)
    }, [user])

    async function getGigs(userData) {
        console.log("in getGigs, userdata: ", userData)
        // get the userID ✅
        // get the genres from the profiles table based on the userID and call it userGenres ✅
        // get the gigs ✅
        // filter the gigs based on whether genres matches userGenres (optional show all button)
        // filter the gigs to remove any gig where gig.id matches userID (optional show my gigs with css styling)

        /* this has to be defined outside of the next block */
        let { data: gigs, gigsTableError } = await supabase
            .from("gigs")
            .select("*")

        console.log("user: ", user)

        if (user) {
            /* this has to be defined within the if(user) block otherwise the component can't render */
            let { data: profileTable, profileTableError } = await supabase
                .from("profiles")
                .select("genres, instruments")
                .eq("id", user.id)
                .single()

            setOutput(gigs)
            setGenres(profileTable.genres)
            console.log("profileTable.instruments: ", profileTable.instruments)

            setTableState({
                genres: profileTable.genres,
                instruments: profileTable.instruments,
            })
            console.log("Pre-filtered", gigs)
            if (profileTable.genres) {
                gigs = gigs.filter((gig) => {
                    //console.log("FILTERING: gig.genres: ",gig.genres," + profileTable.genres: ",profileTable.genres)
                    return gig.genres.some(
                        (r) => profileTable.genres.indexOf(r) >= 0
                    )
                })
            }
        } else {
            setOutput(gigs)
        }
    }
    if (loading) return <p>Loading...</p>
    //   if (!userData) return <NoSessionWarn />

    let theYear = new Date().getFullYear()

    return (
        <>
            <h3 className={styles.itemsheader}>
                {user ? (
                    <>
                        Showing Gigs:
                        <button>{genres + " ✖️"}</button> <button>+</button>
                        {tableState.instruments ? (
                            <h3>
                                {"Showing Instruments: " +
                                    <button>{tableState.instruments}</button>}
                            </h3>
                        ) : (
                            "All Instruments"
                        )}
                    </>
                ) : (
                    "No filters applied"
                )}
            </h3>

            <div className={styles.ylarrow}>⬅️</div><div className={styles.year}>{theYear}</div><div className={styles.yrarrow}>➡️</div>
            <div>
                {monthPageOne ?
                    <div className={styles.monthParent}>

                        <div className={styles.longMonthBox}>
                            <div className={styles.month}>Jan</div>
                            <div className={styles.upArrow}>⬆️</div>
                            <div className={styles.gigDates}>Item One</div>
                            <div className={styles.gigDates}>Item Two</div>
                            <div className={styles.gigDates}>Item Three</div>
                            <div className={styles.gigDates}>Item Four</div>
                            <div className={styles.downArrow}>⬇️</div>
                        </div>
                        <div className={styles.longMonthBox}><div className={styles.month}>Feb</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                        <div className={styles.longMonthBox}><div className={styles.month}>Mar</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                        <div className={styles.longMonthBox}><div className={styles.month}>Apr</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                        <div className={styles.longMonthBox}><div className={styles.month}>May</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                        <div className={styles.longMonthBox}><div className={styles.month}>Jun</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                    </div> :
                    <div className={styles.monthParent}><div className={styles.longMonthBox}><div className={styles.month}>Jul</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                        <div className={styles.longMonthBox}><div className={styles.month}>Aug</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                        <div className={styles.longMonthBox}><div className={styles.month}>Sep</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                        <div className={styles.longMonthBox}><div className={styles.month}>Oct</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                        <div className={styles.longMonthBox}><div className={styles.month}>Nov</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                        <div className={styles.longMonthBox}><div className={styles.month}>Dec</div><div className={styles.uparrow}>⬆️</div><div className={styles.gigDates}><div className={styles.downarrow}>⬇️</div></div></div>
                    </div>
                }
            </div>
            <div className={styles.gigParent}>
                {output.map((gig) => (
                    <GigItem key={gig.id} gig={gig}></GigItem>
                ))}
            </div>
            {
                <h2 className={styles.itemsfooter}>
                    {output.length ? output.length + " Items" : ""}
                </h2>
            }

        </>
    )
}
