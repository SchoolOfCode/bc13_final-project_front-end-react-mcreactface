import React, { useEffect, useState } from 'react';
import GigsBooked from "../components/GigsBooked";
import GigsCreated from "../components/GigsCreated";
import styles from "./mygigs.module.css";

export default function MyGigs() {
    const [createdList, setCreatedList] = useState(true);
    return (
        <div className="container" style={{ padding: '50px 0 100px 0', width: '100%' }}>
        <div className={styles.management}>
        <div className={styles.selection}> 
            <button className={createdList ? styles.clicked : styles.options} onClick={()=> setCreatedList(true)}>Gig Created</button>
            <button className={createdList ? styles.options : styles.clicked} onClick={()=> setCreatedList(false)}>Gig Booked</button>
        </div>
        {createdList ? <GigsCreated/> : <GigsBooked/>}
        </div>
        </div>
    )
}