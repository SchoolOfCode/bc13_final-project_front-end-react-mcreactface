import Link from "next/link"
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from "./GigItem.module.css"

export default function GigItem({gig}) {
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseEnter = () => {
      setIsHovering(true)
    }
  
    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    console.log("GigItem: ", gig)
    console.log(gig.address1stline);

    let thedate = new Date(gig.starttime);

    //let mystart = new Date(gig.starttime).toLocaleString('uk');
    let myend = new Date(gig.endtime).toLocaleString('uk');

    let mystart = thedate.getDate()+ "/"+(thedate.getMonth()+1)+ "/"+thedate.getFullYear();

    return (
        <div className={styles.gigCard}>
      <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.card}
    >   
        <div className={styles.cardcontent}>
        <div className={styles.cardTitleImage}>
     {gig.instrumentreq && <img src={`images/icons/${gig.instrumentreq}.jpg`} alt="imagehere"></img>}
          <p>{gig.address1stline}</p>
        </div>
          <div className={styles.text}>
            <p>Date: {mystart}</p>
            <p>Number of sets: {gig.numberofsets} x {gig.setlength}m Sets</p>
            <p><data>Instruments: {gig.instrumentreq} required</data></p> 
          </div>
        </div>
        <div className={styles.expansion}>
        {isHovering && (
          <div className={styles.cardisHovering}>
            <p>Additional gig information:</p>
            <div className={styles.additional}>
              <p><b>Gig start time:</b> {gig.starttime}</p>
              <p><b>Gig end time:</b> {gig.endtime}</p>
              <p><b>First-line:</b> {gig.address2ndline}, {gig.town}</p>
              <p><b>Second-line:</b> {gig.region}, {gig.postcode}</p>
              {/* <li>Is food provided: {gig.foodprovided}</li>
              <li>Veggie option: {gig.veggieoption}</li> */}
              <p><b>Event type:</b> {gig.eventtype}</p>
              <p><b>Genre:</b> {gig.genres}</p>
              <p><b>Length of set:</b> {gig.setlength}mins</p>
              <p><b>Payment:</b> £{gig.payment}</p>
              </div>
          </div>
        )}
        </div> 
          </div>
      </div>
)
}