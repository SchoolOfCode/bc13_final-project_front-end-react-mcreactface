import styles from './SideBar.module.css'
export function SideBar({ createdClick, bookedClick, personalClick }){
    return <div className={styles.sidebar}>
        <button className={styles.button} onClick={personalClick}>Personal Information</button>
        <button className={styles.button} onClick={createdClick}>Gigs Created</button>
        <button className={styles.button} onClick={bookedClick}>Gigs Booked</button>
    </div>
}