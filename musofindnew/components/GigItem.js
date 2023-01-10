import Link from "next/link"
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from "./GigItem.module.css"


export default function GigItem({gig}) {
    console.log("GigItem: ", gig)
    console.log(gig.address1stline);

    let mystart = new Date(gig.starttime).toLocaleString('uk');
    let myend = new Date(gig.endtime).toLocaleString('uk');

    return (<div className={styles.gigCard}>
                <ol>
                    <li><data className={styles.data}>{gig.address1stline}</data></li>
                    <li>Start: <data>{mystart}</data></li>
                    <li>End: <data>{myend}</data></li>
                    <li>Looking for a <data>{gig.instrumentreq} player</data></li>
                    <li>{gig.instrumentreq && <img width="75vh" src={`images/icons/${gig.instrumentreq}.jpg`} alt="imagehere"></img>}</li>
                </ol>
            </div>)
}