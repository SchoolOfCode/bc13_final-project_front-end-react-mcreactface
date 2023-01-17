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
    const [searchCurrentYear, setSearchCurrentYear] = useState()
    const [searchInstruments, setSearchInstruments] = useState([])
    const [searchGenres, setSearchGenres] = useState([])
    const router = useRouter()
    const data = router.query
    const moy = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    useEffect(() => {
        supabase.auth.getUser().then((response) => {
            console.log("in useEffect, userdata: ", response.data.user)
            setUserData(response.data.user)
            setLoading(false)
        })

        let theYear = new Date().getFullYear()
        if (!searchCurrentYear) {
            setSearchCurrentYear(theYear)
        }

        getGigs(userData)
    }, [user])

    async function getGigs(userData) {
        if (user) {
            /* this has to be defined within the if(user) block otherwise the component can't render */
            let { data: profileTable, profileTableError } = await supabase
                .from("profiles")
                .select("genres, instruments")
                .eq("id", user.id)
                .single()

            const splitGenres = profileTable.genres[0].split(",")
            console.log("splitGenres: ", splitGenres)

          /* this is not a very good way to do it but I did it anyway :( - J */
          let gigs = [];

            for (let thisGenre of splitGenres) {
              let { data: gigsdata, gigsTableError } = await supabase
                .from("gigs")
                .select("*")
                .gte("starttime", `${searchCurrentYear}-01-01 00:00:00`)
                .lte("starttime", `${searchCurrentYear}-12-12 23:59:59`)
                .contains("genres", [thisGenre])

                
                gigs.push(...gigs, ...gigsdata)
                console.log("gigs: ", gigs)
            }
/*
            let { data: gigs, gigsTableError } = await supabase
                .from("gigs")
                .select("*")
                .gte("starttime", `${searchCurrentYear}-01-01 00:00:00`)
                .lte("starttime", `${searchCurrentYear}-12-12 23:59:59`)
                .contains("genres", splitGenres)
                //.in  .contains("genres", [splitGenres[0] || splitGenres[1]])

                .order("starttime", { ascending: true })
*/
            for (let eachGig of gigs) {
                let newDate = new Date(eachGig.starttime)
                eachGig.startday = newDate.getDate()
                eachGig.startmonth = newDate.getMonth()
                eachGig.startyear = newDate.getFullYear()
            }

            setOutput(gigs)
            setGenres(profileTable.genres)

            setTableState({
                genres: profileTable.genres,
                instruments: profileTable.instruments,
            })
            /*
            if (genres.length != 0) {
                gigs = gigs.filter((gig) => {
                    //console.log("FILTERING: gig.genres: ",gig.genres," + profileTable.genres: ",profileTable.genres)
                    return gig.genres.some(
                        (r) => profileTable.genres.indexOf(r) >= 0
                    )
                })
                setOutput(gigs)
            }*/
        } else {
            //setOutput(gigs)
        }
    }
    if (loading) return <p>Loading...</p>
    //   if (!userData) return <NoSessionWarn />

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
            <div className={styles.ycomponents}>
                <div
                    className={styles.yarrow}
                    onClick={() => setSearchCurrentYear(searchCurrentYear - 1)}
                >
                    ⬅️
                </div>
                <div className={styles.year}>{searchCurrentYear}</div>
                <div
                    className={styles.yarrow}
                    onClick={() => setSearchCurrentYear(searchCurrentYear + 1)}
                >
                    ➡️
                </div>
            </div>
            <div className={styles.monthParent}>
                <div
                    onClick={() => {
                        setMonthPageOne(true)
                    }}
                >
                    ⬅️
                </div>
                {monthPageOne
                    ? moy.map((themonth, index) => {
                          if (index < 6) {
                              return (
                                  <div className={styles.longMonthBox}>
                                      <div className={styles.month}>
                                          {themonth}
                                      </div>
                                      <div className={styles.upArrow}>⬆️</div>
                                      {output
                                          ? output
                                                .filter(
                                                    (gig) =>
                                                        gig.startmonth ==
                                                            index &&
                                                        gig.startyear ==
                                                            searchCurrentYear
                                                )
                                                .map((gig) => {
                                                    return (
                                                        <div
                                                            className={
                                                                styles.gigDates
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.gigDay
                                                                }
                                                            >
                                                                {gig.startday}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.gigType
                                                                }
                                                            >
                                                                {gig.eventtype}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.gigPostCode
                                                                }
                                                            >
                                                                {gig.postcode}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                          : ""}
                                      <div className={styles.downArrow}>⬇️</div>
                                  </div>
                              )
                          }
                      })
                    : moy.map((themonth, index) => {
                          if (index >= 6) {
                              return (
                                  <div className={styles.longMonthBox}>
                                      <div className={styles.month}>
                                          {themonth}
                                      </div>
                                      <div className={styles.upArrow}>⬆️</div>
                                      {output
                                          ? output
                                                .filter(
                                                    (gig) =>
                                                        gig.startmonth ==
                                                            index &&
                                                        gig.startyear ==
                                                            searchCurrentYear
                                                )
                                                .map((gig) => {
                                                    return (
                                                        <div
                                                            className={
                                                                styles.gigDates
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.gigDay
                                                                }
                                                            >
                                                                {gig.startday}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.gigType
                                                                }
                                                            >
                                                                {gig.eventtype}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.gigPostCode
                                                                }
                                                            >
                                                                {gig.postcode}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                          : ""}
                                      <div className={styles.downArrow}>⬇️</div>
                                  </div>
                              )
                          }
                      })}
                <div
                    onClick={() => {
                        setMonthPageOne(false)
                    }}
                >
                    ➡️
                </div>
            </div>
            {/*
                <div className={styles.gigParent}>
                    {output.map((gig) => (
                        <GigItem key={gig.id} gig={gig}></GigItem>
                    ))}
                </div>
            */}
            {/*
                <h2 className={styles.itemsfooter}>
                    {output.length ? output.length + " Items" : ""}
                </h2>
            */}
        </>
    )
}
