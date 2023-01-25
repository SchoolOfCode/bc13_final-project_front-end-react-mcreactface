import { useState } from "react"
import GigsBooked from "./GigsBooked"
import GigsCreated from "./GigsCreated"
import { SideBar } from "./SideBar"
import Account from "./Account"
import styles from "./AccountPage.module.css"

export function AccountPage({ session }) {
    const [gigsCreated, setGigsCreated] = useState(false)
    const [gigsBooked, setGigsBooked] = useState(false)
    function handleCreated() {
        setGigsCreated(true)
        setGigsBooked(false)
    }
    function handleBooked() {
        setGigsCreated(false)
        setGigsBooked(true)
    }
    function handlePersonal() {
        setGigsCreated(false)
        setGigsBooked(false)
    }
    if (gigsCreated) {
        return (
            <div className={styles.accountPage}>
                <SideBar
                    createdClick={handleCreated}
                    bookedClick={handleBooked}
                    personalClick={handlePersonal}
                />
                <GigsCreated />
            </div>
        )
    }
    if (gigsBooked) {
        return (
            <div className={styles.accountPage}>
                <SideBar
                    createdClick={handleCreated}
                    bookedClick={handleBooked}
                    personalClick={handlePersonal}
                />
                <GigsBooked />
            </div>
        )
    } else {
        return (
            <div className={styles.accountPage}>
                <SideBar
                    createdClick={handleCreated}
                    bookedClick={handleBooked}
                    personalClick={handlePersonal}
                />
                <Account session={session} />
            </div>
        )
    }
}
