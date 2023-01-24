import styles from "../../styles/musicians.module.css"
import Image from "next/image"
import Link from "next/link"

export default function Musician(profile) {
    const instruments = profile.instruments.join(', ')
    const spacedinstruments = instruments.split(',  ')

    const genres = profile.genres.join(', ')
    const spacedgenres = genres.split(',  ')

    return (
        <div className={styles.musiciancard}>
        <div className= {styles.top}>
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
                <Image
                    src={`https://mrtlmherhdiqarnmtiyx.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}`}
                    alt="Logo"
                    width={100}
                    height={100}
                />
            ) : (
                <Image
                    src={`/images/icons/offwhiteavatar.png`}
                    alt="Logo"
                    width={100}
                    height={100}
                /> 
            )}
            </div>
            <div className= {styles.infosection}>
            <div className= {styles.creatingsections}>
            <div className= {styles.makingsectionscolumn}>
                <p className={styles.reqs}>Instruments:</p>
                <p className={styles.p}>{spacedinstruments}</p>
            </div>
            <div className= {styles.makingsectionscolumn}>
                <p className={styles.reqs}>Genres:</p>
                <p className={styles.p}>{spacedgenres}</p>  
            </div>
         
            </div>
            <div className= {styles.creatingsections}>
            <div className= {styles.makingsectionscolumn}>
                <p className={styles.reqs}>Location:</p>
                <p className={styles.p}>{profile.city}</p>
            </div>
            <div className= {styles.makingsectionscolumn}>
                <p className={styles.reqs}>Willing to travel:</p>
                <p className={styles.p}>{profile.travelradius} km</p>
            </div>
            </div>
            </div> 
            <div className={styles.cashAndRate}>
                <p className={styles.p}>
                    Rate (from): £{" "} {profile.cash_minimum} 
                </p>
            </div>

            <div className={styles.buttons}>
                <div className={styles.contactbutton}>
                    <Link href="/contact" style={{ textDecoration: 'none' }}>
                        <p>Contact Me!</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
