import Link from "next/link"
import { useState, useEffect } from "react"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import styles from "./GigItem.module.css"

export default function GigItem({ gig }) {
    //  console.log("GigItem: ", gig)
    //  console.log(gig.address1stline)

    let thedate = new Date(gig.starttime)

    //let mystart = new Date(gig.starttime).toLocaleString('uk');
    let myend = new Date(gig.endtime).toLocaleString("uk")

    let mystart =
        thedate.getDate() +
        "/" +
        (thedate.getMonth() + 1) +
        "/" +
        thedate.getFullYear()

    return (
        <div className={styles.gigCard}>
            {gig.instrumentreq && (
                <img
                    width="75vh"
                    src={`images/icons/${gig.instrumentreq}.jpg`}
                    alt="imagehere"
                ></img>
            )}
            <div className={styles.gigCardSub}>
                <ol>
                    <li></li>
                    <li className={styles.bigtitle}>{gig.address1stline}</li>
                    <li className={styles.title}>{mystart}</li>
                    <li className={styles.title}>
                        {gig.numberofsets} x {gig.setlength}m Sets
                    </li>
                    <li>
                        <data>{gig.instrumentreq} required</data>
                    </li>
                </ol>
            </div>
        </div>
    )
}
