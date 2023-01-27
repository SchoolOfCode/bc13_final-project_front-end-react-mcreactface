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
                    <h2>Find Gigs</h2>
                    <p>
                        Find gigs in your area that match your skill set and
                        style. With a simple search system, you can find gigs
                        that are looking for a band or just want to jam.
                    </p>
                    <img
                        className={styles.miniimage}
                        src={`images/GigsDisplay.jpg`}
                        alt="gig search"
                    ></img>
                </div>
                <div className={styles.minipage2}>
                    <h2>Management made easy</h2>
                        <div className={styles.sidetext}>
                            <p>
                                <b>Looking for a gig? Book your gig with ease.
                                MusoFind has a simple booking system that allows
                                you to book gigs with just a few clicks. No more
                                hassle of emailing back and forth. Just book
                                your gig and get to playing.</b> <b className={styles.presponsivechange}>The My Gigs page
                                allows you to see all the gigs you have booked
                                and created. You can even edit or delete your
                                gigs from this page. All with sleek and simple
                                interface that makes it easy to use. Have
                                complete control of your gigs and your schedule
                                at your fingertips.</b>
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
                            <h2>JOIN THE COMMUNTITY</h2>
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
