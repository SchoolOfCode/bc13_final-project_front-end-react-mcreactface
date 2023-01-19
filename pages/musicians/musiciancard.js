import styles from "../../styles/musicians.module.css"
import Image from "next/image"

export default function Musician(profile) {
    return (
        <div className={styles.musiciancard}>
            <h2 className={styles.h2}>{profile.full_name}</h2>
            {/*             <Image
                src={`https://mrtlmherhdiqarnmtiyx.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}`}
                alt="Logo"
                width={200}
                height={170}
            /> */}
            <Image src={"/band.jpg"} alt="Logo" width={250} height={170} />

            <div>
                <p className={styles.p}>Proficient with:</p>
                <p className={styles.p}>{profile.instruments}</p>

                <p className={styles.p}>Willing to move up to:</p>
                <p className={styles.p}>{profile.travelradius} km</p>
                <p className={styles.p}>{profile.genres}</p>
                <p className={styles.p}>{profile.city}</p>
            </div>
            <div className={styles.cashAndRate}>
                <p className={styles.p}>
                    Cash (from): {profile.cash_minimum} £{" "}
                </p>
                <p className={styles.p}>
                    {profile.rating ? profile.rating : "Unrated"}{" "}
                    <Image
                        src={"images/star.svg"}
                        alt="Logo"
                        width={15}
                        height={15}
                    />
                </p>
            </div>

            <div className={styles.buttons}>
                <button>Contact Me!</button>
                <button href="/">See Profile</button>
            </div>
        </div>
    )
}
