import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"

import { useRouter } from "next/router"
import {
    useUser,
    useSupabaseClient,
    useSession,
} from "@supabase/auth-helpers-react"

import GigItem from "./GigItem.js"
import styles from "./GigsDisplay.module.css"

export default function GigsDisplay() {
    const supabase = useSupabaseClient()
    const session = useSession()
    const user = useUser()
    const [output, setOutput] = useState([])
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchCurrentYear, setSearchCurrentYear] = useState(
        new Date().getFullYear()
    )
    const [searchInstruments, setSearchInstruments] = useState([])
    const [searchGenres, setSearchGenres] = useState([])
    const [showCalendar, setShowCalendar] = useState(true)
    const [selectedGig, setSelectedGig] = useState({})
    const [visibleMonths, setVisibleMonths] = useState({})
    const [pageSize, setPageSize] = useState(0)
    const [shrinkFilters, setShrinkFilters] = useState(false)
    const { ty, sm, md, lg, xl } = useMediaQueries()
    let pageCurrent = useRef(1)
    let multiplier = useRef(0)

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

    const backwards = 0
    const forwards = 1

    const router = useRouter()
    const data = router.query

    useEffect(() => {
        /* supabase.auth.getUser().then((response) => {
            // setUserData(response.data.user)
            // console.log("userData: ", response.data.user)
            setLoading(false)
        })*/

        setLoading(false)

        // Somewhere in this useEffect is the solution (I think) to keeping content the same if we switch tabs.
        // setFilters(userData)
        //   getGigs(userData)
    }, [user])

    useEffect(() => {
        getGigs()
    }, [searchGenres, searchInstruments])

    /* on page load figure out which months to display and get the user data */
    useEffect(() => {
        calculateWhichMonthsToShow()
        setFilters(userData)
    }, [])

    /* any time we resize the screen beyond these thresholds (media query sizes) we reset which months to show */
    useEffect(() => {
        calculateWhichMonthsToShow()
    }, [ty, sm, md, lg, xl])

    /* calculate which months to show based on the media query currently active */
    function calculateWhichMonthsToShow() {
        const cloneVisibleMonths = {
            Jan: false,
            Feb: false,
            Mar: false,
            Apr: false,
            May: false,
            Jun: false,
            Jul: false,
            Aug: false,
            Sep: false,
            Oct: false,
            Nov: false,
            Dec: false,
        }

        if (xl) {
            setPageSize(6)
            cloneVisibleMonths.Jan = true
            cloneVisibleMonths.Feb = true
            cloneVisibleMonths.Mar = true
            cloneVisibleMonths.Apr = true
            cloneVisibleMonths.May = true
            cloneVisibleMonths.Jun = true
            setShrinkFilters(false)
        } else if (lg && !xl) {
            setPageSize(4)
            cloneVisibleMonths.Jan = true
            cloneVisibleMonths.Feb = true
            cloneVisibleMonths.Mar = true
            cloneVisibleMonths.Apr = true
            setShrinkFilters(false)
        } else if (md && !lg) {
            setPageSize(3)
            cloneVisibleMonths.Jan = true
            cloneVisibleMonths.Feb = true
            cloneVisibleMonths.Mar = true
            setShrinkFilters(false)
        } else if (sm && !md) {
            setPageSize(2)
            cloneVisibleMonths.Jan = true
            cloneVisibleMonths.Feb = true
            setShrinkFilters(false)
        } else if (ty && !sm) {
            setPageSize(1)
            cloneVisibleMonths.Jan = true
            setShrinkFilters(true)
        }

        setVisibleMonths(cloneVisibleMonths)
        pageCurrent.current = 1
    }

    function useMediaQuery(query) {
        if (typeof window !== "undefined") {
            const mediaQuery = useMemo(() => window.matchMedia(query), [query])
            const [match, setMatch] = useState(mediaQuery.matches)

            useEffect(() => {
                const onChange = () => setMatch(mediaQuery.matches)
                mediaQuery.addEventListener("change", onChange)

                return () => mediaQuery.removeEventListener("change", onChange)
            }, [mediaQuery])

            return match
        }
    }

    function useMediaQueries() {
        const ty = useMediaQuery("(min-width: 300px)")
        const sm = useMediaQuery("(min-width: 600px)")
        const md = useMediaQuery("(min-width: 1000px)")
        const lg = useMediaQuery("(min-width: 1100px)")
        const xl = useMediaQuery("(min-width: 1850px) and (max-height: 1250px)")

        return { ty, sm, md, lg, xl }
    }

    function bookGig(gig) {
        setShowCalendar(false)
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

    /* get the currently auth'd user's genre and instrument */
    async function setFilters(userData) {
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

    /* calculate how many items to show in each month based on screen size/size of gigDate, number of items */
    function monthItemsToShow() {}

    /* possibly badly named - should be setMonths but then there'd be setSetMonths and we already have setVisibleMonths */
    /* calculate which months to show and which ones to hide based on which way we're scrolling, which page you're on and on the media query affecting pageSize  */
    function calculateMonths(direction) {
        let cloneVisibleMonths = Object.assign({}, visibleMonths)
        let lastPage = 12 / pageSize
        let nextMonthsStart
        let nextMonthsStop
        let previousMonthsStart
        let previousPage
        let i

        if (pageCurrent.current == 1 && direction == backwards) {
            return
        } else if (pageCurrent.current == lastPage && direction == forwards) {
            return
        } else {
            for (i = 0; i < 12; i++) {
                cloneVisibleMonths[moy[i]] = false
            }

            nextMonthsStart = pageCurrent.current * pageSize
            nextMonthsStop = nextMonthsStart + pageSize

            previousPage = pageCurrent.current - 1

            if (previousPage !== 1) {
                previousMonthsStart = previousPage * pageSize
            } else {
                previousMonthsStart = 1
            }

            previousMonthsStart -= 1

            if (direction === forwards) {
                for (i = nextMonthsStart; i < nextMonthsStop; i++) {
                    cloneVisibleMonths[moy[i]] = true
                }
                pageCurrent.current += 1
            }

            if (direction === backwards) {
                pageCurrent.current -= 1

                for (
                    i = (pageCurrent.current - 1) * pageSize;
                    i < pageCurrent.current * pageSize;
                    i++
                ) {
                    cloneVisibleMonths[moy[i]] = true
                }
            }

            setVisibleMonths(cloneVisibleMonths)
        }
    }

    /* gets the gig */
    async function getGigs(userData) {
        let query = supabase.from("gigs").select("*")

        query = query.gte("starttime", `${searchCurrentYear}-01-01 00:00:00`)
        query = query.lte("starttime", `${searchCurrentYear}-12-12 23:59:59`)

        if (!user) {
            query = query.filter("chosen_id", "is", "null")
        }
        if (user) {
        }

        if (searchGenres.length || searchInstruments.length) {
            if (searchGenres.length && searchInstruments.length) {
                /* console.log(
                    "querying with a filter (searchGenres: ",
                    searchGenres,
                    ") (searchInstruments: ",
                    searchInstruments,
                    ")"
                )*/
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

    function ShowFilters() {
        return (
            <h3 className={styles.itemsheader}>
                {user ? (
                    <>
                        <h1
                            className={
                                shrinkFilters ? styles.hidden : styles.shown
                            }
                        >
                            Finding:
                        </h1>
                        {searchGenres.length
                            ? searchGenres.map((genre, key) => (
                                  <div>
                                      <button
                                          onClick={(e) => {
                                              e.preventDefault()
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
                        <Link href="/login#instruments">
                            <button className={styles.filterEnd}>➕</button>
                        </Link>
                        <h1
                            className={
                                shrinkFilters ? styles.visible : styles.shown
                            }
                        >
                            Who Are Looking for:
                        </h1>
                        {searchInstruments.length
                            ? searchInstruments.map((instrument, key) => (
                                  <div>
                                      <button
                                          onClick={(e) => {
                                              e.preventDefault()
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
                        <Link href="/login#instruments">
                            <button className={styles.filterEnd}>➕</button>
                        </Link>
                        <button
                            onClick={(e) => {
                                setFilters()
                                getGigs()
                                e.preventDefault()
                            }}
                        >
                            MY PREFS
                        </button>
                        {searchInstruments.length || searchGenres.length ? (
                            <button
                                onClick={(e) => {
                                    setSearchGenres([])
                                    setSearchInstruments([])
                                    e.preventDefault()
                                }}
                            >
                                CLEAR
                            </button>
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    "No filters applied"
                )}
            </h3>
        )
    }

    function ShowKey() {
        return (
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
                <div className={[styles.whsample, styles.sample].join(" ")}>
                    AVAILABLE
                </div>
                <div className={[styles.crsample, styles.sample].join(" ")}>
                    CREATED
                </div>
                <div className={[styles.bksample, styles.sample].join(" ")}>
                    BOOKED
                </div>
            </div>
        )
    }

    function ShowGigData() {
        /* this block is to make the left and right buttons work properly when paging through months */
        const filteredMonths = Object.entries(visibleMonths).filter(
            ([key, value]) => value === true
        )

        if (pageCurrent.current != 1) {
            multiplier.current = pageSize * pageCurrent.current - pageSize
        } else {
            multiplier.current = 0
        }
        /* end block */

        return (
            <div className={styles.monthParent}>
                <div
                    onClick={() => {
                        calculateMonths(backwards)
                    }}
                >
                    ⬅️
                </div>
                {
                    /* filteredMonths is an array with whichever months are supposed to be on the screen given the window size */
                    filteredMonths.map((themonth, index) => {
                        return (
                            <div className={styles.longMonthBox}>
                                <div className={styles.month}>{themonth}</div>
                                <div className={styles.upArrow}></div>
                                <div className={styles.gigDatesContainer}>
                                    {output
                                        ? output
                                              .filter(
                                                  (gig) =>
                                                      gig.startmonth ==
                                                          moy.indexOf(
                                                              filteredMonths[0]
                                                          ) +
                                                              1 +
                                                              index +
                                                              multiplier.current &&
                                                      gig.startyear ==
                                                          searchCurrentYear
                                              )
                                              .sort((a, b) =>
                                                  a.startday > b.startday
                                                      ? 1
                                                      : b.startday > a.startday
                                                      ? -1
                                                      : 0
                                              )
                                              .map((gig) => {
                                                  // I tried wrapping the whole return statement in some conditional rendering but there was a problem
                                                  // returning twice from within .map so I had to re-write it this way, ugly and repetitive as it is :( - J
                                                  return (
                                                      <div
                                                          className={
                                                              user &&
                                                              user.id ===
                                                                  gig.bookee
                                                                  ? styles.gigDatesICreated
                                                                  : user &&
                                                                    user.id ===
                                                                        gig.chosen_id
                                                                  ? styles.gigDatesIBooked
                                                                  : styles.gigDates
                                                          }
                                                          onClick={
                                                              user &&
                                                              user.id ===
                                                                  gig.bookee
                                                                  ? () => {
                                                                        router.push(
                                                                            "mygigs"
                                                                        )
                                                                    }
                                                                  : () => {
                                                                        bookGig(
                                                                            gig
                                                                        )
                                                                    }
                                                          }
                                                      >
                                                          <div
                                                              className={
                                                                  user &&
                                                                  user.id ===
                                                                      gig.bookee
                                                                      ? styles.gigDatesICreatedInner
                                                                      : user &&
                                                                        user.id ===
                                                                            gig.chosen_id
                                                                      ? styles.gigDatesIBookedInner
                                                                      : styles.gigDatesInner
                                                              }
                                                          >
                                                              {gig.startday +
                                                                  "/" +
                                                                  (gig.startmonth +
                                                                      1)}
                                                          </div>
                                                          {gig.genres &&
                                                          gig.genres.length &&
                                                          gig.genres.length >
                                                              1 ? (
                                                              <div
                                                                  className={
                                                                      user &&
                                                                      user.id ===
                                                                          gig.bookee
                                                                          ? styles.gigDatesICreatedInner
                                                                          : user &&
                                                                            user.id ===
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
                                                                      user &&
                                                                      user.id ===
                                                                          gig.bookee
                                                                          ? styles.gigDatesICreatedInner
                                                                          : user &&
                                                                            user.id ===
                                                                                gig.chosen_id
                                                                          ? styles.gigDatesIBookedInner
                                                                          : styles.gigDatesInner
                                                                  }
                                                              >
                                                                  {gig.genres ==
                                                                  "Standard Function"
                                                                      ? "Function"
                                                                      : gig.genres}
                                                              </div>
                                                          )}
                                                          <div
                                                              className={
                                                                  user &&
                                                                  user.id ===
                                                                      gig.bookee
                                                                      ? styles.gigDatesICreatedInner
                                                                      : user &&
                                                                        user.id ===
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
                                                              {gig.instrumentreq
                                                                  .length >
                                                              1 ? (
                                                                  <img
                                                                      className={
                                                                          styles.gigImage
                                                                      }
                                                                      src={`images/icons/smallMultiple.png`}
                                                                      alt={`smallMultiple}`}
                                                                  ></img>
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
                                        : "Oops"}
                                    <div className={styles.downArrow}></div>
                                </div>
                            </div>
                        )
                    })
                }
                <div
                    onClick={() => {
                        calculateMonths(forwards)
                        // console.log("after filter: ", filteredMonths)
                    }}
                >
                    ➡️
                </div>
            </div>
        )
    }

    function ShowBookingConfirmation() {
        return (
            <>
                {user ? (
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
                                FOOD PROVIDED:
                                <text> {selectedGig.foodprovided}</text>
                            </li>
                            <li>
                                VEGGIE OPTION AVAILABLE:
                                <text>
                                    {" "}
                                    {selectedGig.veggieoption ? "Yes" : "No"}
                                </text>
                            </li>
                            <li>
                                PA REQUIRED:
                                <text> {selectedGig.pa ? "Yes" : "No"}</text>
                            </li>

                            <li>
                                PAYMENT:<text> £{selectedGig.payment}</text>
                            </li>
                            <li>
                                NUMBER OF SETS:
                                <text> {selectedGig.numberofsets}</text>
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
                        {user.id != selectedGig.chosen_id && (
                            <button
                                className={styles.bookButton}
                                onClick={() => {
                                    doBooking(selectedGig)
                                    setShowCalendar(true)
                                    setTimeout(() => {
                                        router.reload(window.location.pathname)
                                    }, 500)
                                    //setShowCalendar(!showCalendar)
                                }}
                            >
                                CONFIRM BOOKING
                            </button>
                        )}

                        {user.id == selectedGig.chosen_id && (
                            <button
                                className={styles.bookButton}
                                onClick={() => {
                                    doCancellation(selectedGig)
                                    setShowCalendar(!showCalendar)
                                    setTimeout(() => {
                                        router.reload(window.location.pathname)
                                    }, 500)
                                }}
                            >
                                CANCEL BOOKING
                            </button>
                        )}
                        <button
                            className={styles.bookButton}
                            onClick={() => {
                                setShowCalendar(!showCalendar)
                            }}
                        >
                            GO BACK
                        </button>
                    </div>
                ) : (
                    <div className={styles.bookingData}>
                        <Link href="login">
                            <text>
                                Create a Profile/Log in to see more details!
                            </text>
                        </Link>
                    </div>
                )}
            </>
        )
    }

    if (loading) return <p>Loading...</p>
    //if (!userData) return <NoSessionWarn />

    return showCalendar ? (
        <>
            {shrinkFilters ? "" : <ShowFilters />}
            <ShowKey />
            <ShowGigData />
        </>
    ) : (
        <ShowBookingConfirmation />
    )
}
