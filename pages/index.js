import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Head from "next/head"
import { useEffect, useState } from "react"
import GigsDisplay from "../components/GigsDisplay"
import { SimpleSlider } from "../components/SimpleSlider/carousel.js"
import styles from "/pages/index.module.css"

export default function Home() {
    const supabase = useSupabaseClient()
    const [gigs, setGigs] = useState([])
    async function getGigs() {
        try {
            let { data: allGigs, error } = await supabase
                .from("gigs")
                .select("*")

            if (error) {
                throw error
            }

            if (allGigs) {
                console.log("getCreatedGigs(): gigs: ", allGigs)
                setGigs([...allGigs])
            } else {
                console.log("No Data")
                // return ("<p>oh dear</p>")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getGigs()
    }, [])
    return (
        <div className={styles.container}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
                <title>Welcome to MusoFind</title>
                <link rel="icon" href="/musoLogo.png" />
            </Head>
            <div className={styles.scrolling}>
                <div className={styles.landingpage}>
                    <img
                        className={styles.largeLogo}
                        src="musoLogo.png"
                        alt="MusoFind logo"
                    ></img>
                    <h1 className={styles.title}>Welcome to MusoFind</h1>
                    <p className={styles.description}>
                        Find gigs, musicians, and more!
                    </p>
                </div>
                <div className={styles.minipage}>
                    <h2>Find And Book Gigs</h2>
                    <p>
                        Are you a professional player looking to fill in those
                        empty dates in your calendar? Musofind helps you quickly
                        and easily find bands looking for a replacement that
                        matches your playing style and repertoire.
                    </p>
                    <img
                        className={styles.miniimage}
                        src={`images/GigsDisplay.jpg`}
                        alt="gig search"
                    ></img>
                </div>
                <div className={styles.minipage2}>
                    <h2>Find And Book Players</h2>
                    <div className={styles.minipage}>
                        <p>

                                Your regular drummer/guitarist/singer pulls out
                                of a show at the last minute. Disaster? Fear
                                not! MusoFind are here to help with a booking
                                system that allows you to find reliable,
                                professional players in just a few clicks. No
                                more amateurs turning up late and unprepared.
                                Our system of trust establishes that who you
                                book will get the job done and done well.
                                {" "}
                            <p>
                                Your personal "My Gigs" page lets you
                                effortlessly manage your calendar and rate
                                performances. Now you can have complete control
                                of your gigs and your schedule at your
                                fingertips.
                            </p>
                        </p>
                    </div>
                    <div>
                        {gigs ? (
                            <div className={styles.sliderContainer}>
                                <SimpleSlider gigarray={gigs} />
                            </div>
                        ) : (
                            <p>loading</p>
                        )}
                    </div>
                </div>
                <div className={styles.minipage3}>
                    <h2></h2>
                    <div className={styles.sideby}>
                        <div className={styles.sideimage}></div>
                        <div className={styles.sidetext2}>
                            <h2>JOIN THE COMMUNITY</h2>
                            <p>
                                Making an account is easy and free. You can even
                                sign up with third party services like Google or
                                Facebook. MusoFind is a community of musicians
                                for musicians. Sign up today and get started!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
