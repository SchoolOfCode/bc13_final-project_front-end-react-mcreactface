import React, { useEffect, useState } from "react"
import GigsBooked from "../components/GigsBooked"
import GigsCompleted from "../components/GigsCompleted"
import GigsCreated from "../components/GigsCreated"
import styles from "./mygigs.module.css"

export default function MyGigs() {
    const [createdList, setCreatedList] = useState(true)
    const [bookedList, setBookedList] = useState(false)
    return (
        <div
            className="container"
            style={{ padding: "50px 0 100px 0", width: "100%" }}
        >
            <div className={styles.management}>
                <div className={styles.selection}>
                    <button
                        className={
                            createdList && !bookedList ? styles.clicked : styles.options
                        }
                        onClick={() => {setCreatedList(true); setBookedList(false)}}
                    >
                        Gig Created
                    </button>
                    <button
                        className={
                            !createdList && bookedList ? styles.clicked : styles.options
                        }
                        onClick={() => {setCreatedList(false); setBookedList(true)}}
                    >
                        Gig Booked
                    </button>
                    <button className={!createdList && !bookedList ? styles.clicked : styles.options} onClick={()=> {setCreatedList(false); setBookedList(false)}}>Gig Completed</button>
                </div>
                {createdList && <GigsCreated /> }
                {bookedList && <GigsBooked bookedList={bookedList} />}
                {!createdList && !bookedList && <GigsCompleted />}
            </div>
        </div>
    )
}
