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
    const [showAll, setShowAll] = useState(true)
    const [triggerBooking, setTriggerBooking] = useState(false)
    const [triggerCancellation, setTriggerCancellation] = useState(false)
    const [selectedGig, setSelectedGig] = useState({})

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

    useEffect(() => {
        doBooking(selectedGig)
        setShowAll(true)
    }, [triggerBooking])

    useEffect(() => {
        doCancellation(selectedGig)
    }, [triggerCancellation])

    function bookGig(gig) {
        setShowAll(false)
        setSelectedGig(gig)
    }

    async function doBooking() {
        if (user) {
            let query = supabase
                .from("gigs")
                .update({ chosen_id: user.id })
                .match({ id: selectedGig.id })

            const { data: result, error } = await query
        }
    }

    async function doCancellation() {
        if (user) {
            let query = supabase
                .from("gigs")
                .update({ chosen_id: null })
                .match({ id: selectedGig.id })

            const { data: result, error } = await query
        }
    }

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

    // If we have no instrument type set but we have a genre then we should see only the gigs with that genre type ✅
    // If we have no instrument type set but we have multiple genres then we should see all the gigs with any of those genres ✅
    // If we have a single instrument type set (Guitar) and have a genre (Rock) then we should see ONLY rock gigs that need guitar ✅
    // If we have a single instrument type set (Guitar) and multiple genres (Rock, Pop) then we should see all the gigs of type Rock/Pop that also have instrument of Guitar ✅
    // If we have multiple instruments and multiple genres then we should see a matrix of those filter inputs ✅

    // When we click on a gigdate item we either redirect to a new page/component which displays the gig data and asks if you want to book then confirms, writes to the chosen_id and
    // then takes you back to the GigsDisplay
    // or we hide everything on the page and do the same thing

    // ycomponent itemsheader monthParent all need to be hidden
    // new div with styles.confirmBooking set to flex and centered

    async function getGigs(userData) {
        if (user) {
            console.log("genres.length: ", searchGenres.length)
            console.log("instruments.length: ", searchInstruments.length)

            let query = supabase.from("gigs").select("*")

            query = query.gte(
                "starttime",
                `${searchCurrentYear}-01-01 00:00:00`
            )
            query = query.lte(
                "starttime",
                `${searchCurrentYear}-12-12 23:59:59`
            )

            if (searchGenres.length || searchInstruments.length) {
                if (searchGenres.length && searchInstruments.length) {
                    query = query.overlaps("genres", searchGenres)
                    query = query.overlaps("instrumentreq", searchInstruments)
                } else if (searchGenres.length) {
                    query = query.overlaps("genres", searchGenres)
                } else if (searchInstruments.length) {
                    query = query.overlaps("instrumentreq", searchInstruments)
                }
            }

            const { data: gigs, error } = await query

            if (gigs) {
                for (let eachGig of gigs) {
                    let newDate = new Date(eachGig.starttime)
                    eachGig.starthour = newDate.getHours()
                    if ((eachGig.startmin = newDate.getMinutes()) == 0) {
                        eachGig.starmin = "00"
                    }

                    eachGig.startday = newDate.getDate()
                    eachGig.startmonth = newDate.getMonth()
                    eachGig.startyear = newDate.getFullYear()
                }

                setOutput(gigs)
            }
        }
    }

    if (loading) return <p>Loading...</p>
    //   if (!userData) return <NoSessionWarn />

    return showAll ? (
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
                        <button
                            onClick={() => {
                                getUser()
                                getGigs()
                            }}
                        >
                            RESET
                        </button>
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
                                                    // I tried wrapping the whole return statement in some conditional rendering but there was a problem
                                                    // returning twice from within .map so I had to re-write it this way, ugly and repetitive as it is :( - J
                                                    return (
                                                        <div
                                                            className={
                                                                user.id ===
                                                                gig.bookee
                                                                    ? styles.gigDatesICreated
                                                                    : user.id ===
                                                                      gig.chosen_id
                                                                    ? styles.gigDatesIBooked
                                                                    : styles.gigDates
                                                            }
                                                            onClick={() => {
                                                                bookGig(gig)
                                                            }}
                                                        >
                                                            <div
                                                                className={
                                                                    user.id ===
                                                                    gig.bookee
                                                                        ? styles.gigDatesICreatedInner
                                                                        : user.id ===
                                                                          gig.chosen_id
                                                                        ? styles.gigDatesIBookedInner
                                                                        : styles.gigDatesInner
                                                                }
                                                            >
                                                                {gig.startday}
                                                            </div>
                                                            {gig.genres &&
                                                            gig.genres.length &&
                                                            gig.genres.length >
                                                                1 ? (
                                                                <div
                                                                    className={
                                                                        user.id ===
                                                                        gig.bookee
                                                                            ? styles.gigDatesICreatedInner
                                                                            : user.id ===
                                                                              gig.chosen_id
                                                                            ? styles.gigDatesIBookedInner
                                                                            : styles.gigDatesInner
                                                                    }
                                                                >
                                                                    Various
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={
                                                                        user.id ===
                                                                        gig.bookee
                                                                            ? styles.gigDatesICreatedInner
                                                                            : user.id ===
                                                                              gig.chosen_id
                                                                            ? styles.gigDatesIBookedInner
                                                                            : styles.gigDatesInner
                                                                    }
                                                                >
                                                                    {gig.genres}
                                                                </div>
                                                            )}
                                                            <div
                                                                className={
                                                                    user.id ===
                                                                    gig.bookee
                                                                        ? styles.gigDatesICreatedInner
                                                                        : user.id ===
                                                                          gig.chosen_id
                                                                        ? styles.gigDatesIBookedInner
                                                                        : styles.gigDatesInner
                                                                }
                                                            >
                                                                {
                                                                    gig.postcode.split(
                                                                        " "
                                                                    )[0]
                                                                }
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.gigImage
                                                                }
                                                            >
                                                                {gig
                                                                    .instrumentreq
                                                                    .length >
                                                                1 ? (
                                                                    gig.instrumentreq.map(
                                                                        (
                                                                            genre,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <img
                                                                                    className={
                                                                                        styles.gigImage
                                                                                    }
                                                                                    src={`images/icons/small${genre}.png`}
                                                                                    alt={`small${gig.instrumentreq}`}
                                                                                ></img>
                                                                            )
                                                                        }
                                                                    )
                                                                ) : (
                                                                    <img
                                                                        className={
                                                                            styles.gigImage
                                                                        }
                                                                        src={`images/icons/small${gig.instrumentreq}.png`}
                                                                        alt={`small${gig.instrumentreq}`}
                                                                    ></img>
                                                                )}
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
                                                    // if the user.id matches gig.bookee then A
                                                    // if the user.id matches gig.chosen_id then B
                                                    // if the user.id mathes neither then C
                                                    return (
                                                        <div
                                                            className={
                                                                user.id ===
                                                                gig.bookee
                                                                    ? styles.gigDatesICreated
                                                                    : user.id ===
                                                                      gig.chosen_id
                                                                    ? styles.gigDatesIBooked
                                                                    : styles.gigDates
                                                            }
                                                            onClick={() => {
                                                                bookGig(gig)
                                                            }}
                                                        >
                                                            <div
                                                                className={
                                                                    user.id ===
                                                                    gig.bookee
                                                                        ? styles.gigDatesICreatedInner
                                                                        : user.id ===
                                                                          gig.chosen_id
                                                                        ? styles.gigDatesIBookedInner
                                                                        : styles.gigDatesInner
                                                                }
                                                            >
                                                                {gig.startday}
                                                            </div>
                                                            {gig.genres &&
                                                            gig.genres.length &&
                                                            gig.genres.length >
                                                                1 ? (
                                                                <div
                                                                    className={
                                                                        user.id ===
                                                                        gig.bookee
                                                                            ? styles.gigDatesICreatedInner
                                                                            : user.id ===
                                                                              gig.chosen_id
                                                                            ? styles.gigDatesIBookedInner
                                                                            : styles.gigDatesInner
                                                                    }
                                                                >
                                                                    Various
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={
                                                                        user.id ===
                                                                        gig.bookee
                                                                            ? styles.gigDatesICreatedInner
                                                                            : user.id ===
                                                                              gig.chosen_id
                                                                            ? styles.gigDatesIBookedInner
                                                                            : styles.gigDatesInner
                                                                    }
                                                                >
                                                                    {gig.genres}
                                                                </div>
                                                            )}
                                                            <div
                                                                className={
                                                                    user.id ===
                                                                    gig.bookee
                                                                        ? styles.gigDatesICreatedInner
                                                                        : user.id ===
                                                                          gig.chosen_id
                                                                        ? styles.gigDatesIBookedInner
                                                                        : styles.gigDatesInner
                                                                }
                                                            >
                                                                {
                                                                    gig.postcode.split(
                                                                        " "
                                                                    )[0]
                                                                }
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.gigImage
                                                                }
                                                            >
                                                                {gig
                                                                    .instrumentreq
                                                                    .length >
                                                                1 ? (
                                                                    gig.instrumentreq.map(
                                                                        (
                                                                            genre,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <img
                                                                                    className={
                                                                                        styles.gigImage
                                                                                    }
                                                                                    src={`images/icons/small${genre}.png`}
                                                                                    alt={`small${gig.instrumentreq}`}
                                                                                ></img>
                                                                            )
                                                                        }
                                                                    )
                                                                ) : (
                                                                    <img
                                                                        className={
                                                                            styles.gigImage
                                                                        }
                                                                        src={`images/icons/small${gig.instrumentreq}.png`}
                                                                        alt={`small${gig.instrumentreq}`}
                                                                    ></img>
                                                                )}
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
        </>
    ) : (
        /* Confirmation of booking code here */
        <>
            <div className={styles.bookingData}>
                <ul>
                    <li>
                        ADDRESS 1ST LINE:
                        <text>{selectedGig.address1stline}</text>
                    </li>
                    <li>
                        ADDRESS 2ND LINE:
                        <text>{selectedGig.address2ndline}</text>
                    </li>
                    <li>
                        TOWN:<text> {selectedGig.town}</text>
                    </li>
                    <li>
                        CITY:<text> {selectedGig.city}</text>
                    </li>
                    <li>
                        POSTCODE:<text> {selectedGig.postcode}</text>
                    </li>
                    <li>
                        REGION:<text> {selectedGig.region}</text>
                    </li>
                    <li>
                        INSTRUMENTS REQUIRED:
                        <text> {selectedGig.instrumentreq}</text>
                    </li>
                    <li>
                        START TIME:
                        <text>
                            {selectedGig.startmin
                                ? selectedGig.starthour +
                                  ":" +
                                  selectedGig.startmin
                                : selectedGig.starthour + ":00"}
                        </text>
                    </li>
                    <li>
                        END TIME:<text> {selectedGig.endtime}</text>
                    </li>
                    <li>
                        FOOD PROVIDED:<text> {selectedGig.foodprovided}</text>
                    </li>
                    <li>
                        VEGGIE OPTION AVAILABLE:
                        <text> {selectedGig.veggieoption ? "Yes" : "No"}</text>
                    </li>
                    <li>
                        PA REQUIRED:
                        <text> {selectedGig.pa ? "Yes" : "No"}</text>
                    </li>

                    <li>
                        PAYMENT:<text> £{selectedGig.payment}</text>
                    </li>
                    <li>
                        NUMBER OF SETS:<text> {selectedGig.numberofsets}</text>
                    </li>
                    <li>
                        SET LENGTH:<text> {selectedGig.setlength}</text>
                    </li>
                    <li>
                        EVENT TYPE:<text> {selectedGig.eventtype}</text>
                    </li>
                    <li>
                        GENRES:<text> {selectedGig.genres}</text>
                    </li>
                </ul>
                <button
                    className={styles.bookButton}
                    onClick={() => {
                        alert(
                            "Are you sure?  Gigs cannot be unbooked without the mutual agreement of both you and the gig owner!"
                        )
                        setTriggerBooking(!triggerBooking)
                        setTimeout(() => {
                            router.reload(window.location.pathname)
                        }, 500)
                        setShowAll(!showAll)
                    }}
                >
                    CONFIRM BOOKING
                </button>

                <button
                    className={styles.bookButton}
                    onClick={() => {
                        setTriggerCancellation(!triggerCancellation)
                        setTimeout(() => {
                            router.reload(window.location.pathname)
                        }, 500)
                        setShowAll(!showAll)
                    }}
                >
                    CANCEL BOOKING
                </button>
                <button
                    className={styles.bookButton}
                    onClick={() => {
                        setShowAll(!showAll)
                    }}
                >
                    GO BACK
                </button>
            </div>
        </>
    )
}
