import React, { useState } from 'react';
import GigsBooked from "../components/GigsBooked";
import GigsCreated from "../components/GigsCreated";
import styles from "./mygigs.module.css";

export default function MyGigs() {
    const [createdList, setCreatedList] = useState(true);
    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <div className={styles.management}>
        <div className={styles.selection}> 
            <button onClick={()=> setCreatedList(true)}>Gig Created</button>
            <button onClick={()=> setCreatedList(false)}>Gig Booked</button>
        </div>
        {createdList ? <GigsCreated/> : <GigsBooked/>}
        </div>
        </div>
    )
}