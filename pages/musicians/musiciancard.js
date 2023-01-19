import styles from "../../styles/musicians.module.css"
import Image from "next/image"
import Link from "next/link"

export default function Musician(profile) {
    return (
        <div className={styles.musiciancard}>
            <h2 className={styles.h2}>{profile.full_name}</h2>
            <Image
                src={`https://mrtlmherhdiqarnmtiyx.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}`}
                alt="Logo"
                width={100}
                height={100}
            />

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
                <div className={styles.contactbutton}>
                    <Link href="/contact">
                        <p>Contact Us!</p>
                    </Link>
                </div>
                <div className={styles.profilebutton}>
                    <Link href={`/${profile.username}`}>
                        <p>See Profile</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
