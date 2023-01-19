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
    const [tableState, setTableState] = useState({
        genres: "",
        instruments: "",
    })
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
            setUserData(response.data.user)
            setLoading(false)
        })

        let theYear = new Date().getFullYear()
        if (!searchCurrentYear) {
            setSearchCurrentYear(theYear)
        }

        getUser(userData)
        getGigs(userData)
    }, [user])

    useEffect(() => {
        getGigs()
    }, [searchGenres, searchInstruments])

    useEffect(() => {
        getUser()
    }, [])

    async function getUser(userData) {
        if (user) {
            let { data: profileTable, profileTableError } = await supabase
                .from("profiles")
                .select("genres, instruments")
                .eq("id", user.id)
                .single()

            setSearchGenres(profileTable.genres)
            setSearchInstruments(profileTable.instruments)
        }
    }

    async function getGigs(userData) {
        if (user) {
            //  console.log("genres: ", searchGenres)
            //  console.log("instruments: ", searchInstruments)

            let { data: gigs, gigsTableError } = await supabase
                .from("gigs")
                .select("*")
                .gte("starttime", `${searchCurrentYear}-01-01 00:00:00`)
                .lte("starttime", `${searchCurrentYear}-12-12 23:59:59`)
                // .eq("instrumentreq", searchInstruments[0])
                .contains("genres", searchGenres)
                .contains("instrumentreq", searchInstruments)

            if (gigs) {
                for (let eachGig of gigs) {
                    let newDate = new Date(eachGig.starttime)
                    eachGig.startday = newDate.getDate()
                    eachGig.startmonth = newDate.getMonth()
                    eachGig.startyear = newDate.getFullYear()
                }
            }
            
            setOutput(gigs)
        }
    }

    if (loading) return <p>Loading...</p>
    //   if (!userData) return <NoSessionWarn />

    return (
        <>
            <h3 className={styles.itemsheader}>
                {user ? (
                    <>
                        Finding Gigs:
                        {searchGenres.length
                            ? searchGenres.map((genre, key) => (
                                  <div>
                                      <button
                                          onClick={(e) => {
                                              setSearchGenres(
                                                  searchGenres.filter(
                                                      (genre, gkey) =>
                                                          key !== gkey
                                                  )
                                              )
                                          }}
                                      >
                                          {genre} ✖️
                                      </button>
                                  </div>
                              ))
                            : " [All Genres]"}
                        <button className={styles.filterEnd}>➕</button>
                        Who Are Looking for:
                        {searchInstruments.length
                            ? searchInstruments.map((instrument, key) => (
                                  <div>
                                      <button
                                          onClick={(e) => {
                                              setSearchInstruments(
                                                  searchInstruments.filter(
                                                      (instrument, gkey) =>
                                                          key !== gkey
                                                  )
                                              )
                                          }}
                                      >
                                          {instrument} ✖️
                                      </button>
                                  </div>
                              ))
                            : " [All Instruments]"}
                        <button className={styles.filterEnd}>➕</button>
                        <button onClick={() => getUser()}>RESET</button>
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
