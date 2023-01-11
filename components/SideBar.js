import styles from './SideBar.module.css'
export function SideBar({ createdClick, bookedClick, personalClick }){
    return <div className={styles.sidebar}>
        <button onClick={personalClick}>Personal Information</button>
        <button onClick={createdClick}>Gigs Created</button>
        <button onClick={bookedClick}>Gigs Booked</button>
    </div>
}