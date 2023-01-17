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
            <main>
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
                <div className={styles.minipage}>
                <h2>Booking made easy</h2>
                    <p>
                        Simply decide on a gig to play at and book your spot.
                        MusoFind will handle the rest. You can even add your
                        own gigs to the site. Just make sure to include all the
                        details so that other musicians can find you.
                    </p>
                </div>
                <div className={styles.minipage}>
                <h2>Manage your gigs</h2>
                <p>
                    MusoFind has a dedicated my gigs page where you can see all
                    the gigs you have booked and created. You can even edit or delete your gigs from
                    this page. All with sleek and simple interface that makes
                    it easy to use. Have complete control of your gigs and your
                    schedule at your fingertips.
                </p>
                </div>
                <div className={styles.minipage}>
                    <h2>Find Musicians</h2>
                    <p>
                        Since MusoFind is a community of musicians, you can also
                        find other musicians to jam with. You can search for
                        musicians by instrument, skill level, and style. You can
                        even search for musicians in your area. Create your own profile and 
                        add your own instruments and skill level. This way, other musicians 
                        can find you and you can find them.
                    </p>
                </div>
                <div className={styles.minipage}>
                    <h2>Join the community</h2>
                    <p>
                        Making an account is easy and free. You can even sign up with third party
                        services like Google or Facebook. MusoFind is a community of musicians for
                        musicians. Sign up today and get started.
                    </p>
                </div>
            </main>
        </div>
    )
}
