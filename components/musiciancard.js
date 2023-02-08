// import styles from "../styles/musicians.module.css"
import styles from "../styles/musicians.module.css"
import Image from "next/image"
import Link from "next/link"

export default function Musician(profile) {
    console.log("pic: ", profile.avatar_url)
    let duffImage

    function imageExists(image_url) {
        var http = new XMLHttpRequest()

        http.open("HEAD", image_url, false)

        try {
            http.send()
        } catch {
            return false
        }

        return http.status != 404
    }

    if (!imageExists(profile.avatar_url)) {
        duffImage = "images/icons/offwhiteavatar.png"
    }

    return (
        <div className={styles.musiciancard}>
            <div className={styles.top}>
                <div className={styles.titlecontainer}>
                    <h2 className={styles.h2}>{profile.full_name}</h2>
                </div>
                <div className={styles.ratingcontainer}>
                    <p className={styles.ratingnumber}>
                        {profile.rating ? profile.rating : "Unrated"}{" "}
                        <Image
                            src={"images/star.svg"}
                            alt="Logo"
                            width={20}
                            height={20}
                        />
                    </p>
                </div>
            </div>
            <div className={styles.avatarcontainer}>
                {profile.avatar_url ? (
                    profile.avatar_url.indexOf("http") == -1 ? (
                        <Image
                            src={`https://mrtlmherhdiqarnmtiyx.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}`}
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    ) : duffImage ? (
                        <img
                            src={"images/icons/offwhiteavatar.png"}
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <img
                            src={`${profile.avatar_url}`}
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    )
                ) : (
                    <img
                        src={"images/icons/offwhiteavatar.png"}
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                )}
            </div>
            <div className={styles.infosection}>
                <div className={styles.creatingsections}>
                    <div className={styles.makingsectionscolumn}>
                        <p className={styles.reqs}>Instruments:</p>
                        <p className={styles.p}>
                            {profile.instruments &&
                                profile.instruments.join(", ")}
                        </p>
                    </div>
                    <div className={styles.makingsectionscolumn}>
                        <p className={styles.reqs}>Genres:</p>
                        <p className={styles.p}>
                            {profile.genres && profile.genres.join(", ")}
                        </p>
                    </div>
                </div>
                <div className={styles.creatingsections}>
                    <div className={styles.makingsectionscolumn}>
                        <p className={styles.reqs}>Location:</p>
                        <p className={styles.p}>{profile.city}</p>
                    </div>
                    <div className={styles.makingsectionscolumn}>
                        <p className={styles.reqs}>Willing to travel:</p>
                        <p className={styles.p}>{profile.travelradius} km</p>
                    </div>
                </div>
            </div>
            <div className={styles.cashAndRate}>
                <p className={styles.ratesection}>
                    Rate (from): £ {profile.cash_minimum}
                </p>
            </div>

            <div className={styles.buttons}>
                <div className={styles.contactbutton}>
                    <Link href="/contact" style={{ textDecoration: "none" }}>
                        <p>Contact Me!</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
