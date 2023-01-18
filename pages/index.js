import Head from "next/head"
import GigsDisplay from "../components/GigsDisplay"
import styles from "/pages/index.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Welcome to MusoFind</title>
                <link rel="icon" href="/musoLogo.png" />
            </Head>
            <div className={styles.scrolling}>
                <div className={styles.minipage}>
                    <img
                        className={styles.largeLogo}
                        src="musoLogo.png"
                        alt="MusoFind logo"
                    >
                    </img>
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
                </div>
                <div className={styles.minipage2}>
                <h2>Management made easy</h2>
                <div className={styles.sideby}>
                <div className={styles.sidetext}>
                    <p>
                        Looking for a gig? Book your gig with ease. MusoFind has
                        a simple booking system that allows you to book gigs
                        with just a few clicks. No more hassle of emailing
                        back and forth. Just book your gig and get to playing.
                        The My Gigs page allows you to see all the gigs you have
                        booked and created. You can even edit or delete your gigs
                        from this page. All with sleek and simple interface that
                        makes it easy to use. Have complete control of your gigs
                        and your schedule at your fingertips.
                    </p>
                    </div>
                    <div className={styles.sideimage}>
                        <img
                            className={styles.gigImage}
                            src="gigImage.png"
                            alt="Gig image"
                        >
                        </img>
                    </div>
                    </div>
                </div>
                <div className={styles.minipage3}>
                <h2></h2>
                <div className={styles.sideby}>
                <div className={styles.sideimage}>
                    </div>
                <div className={styles.sidetext2}>
                <h2>JOIN THE COMMUNTITY</h2>
                <p>
                        Making an account is easy and free. You can even sign up with third party
                        services like Google or Facebook. MusoFind is a community of musicians for
                        musicians. Sign up today and get started!
                    </p>
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}
