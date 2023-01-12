import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import  GigItem from './GigItem.js'
import styles from "./GigItem.module.css"

export default function GigsDisplay() {
    let loading = useRef(false)
    let gigs = useRef([])
    const [gigarray, setGigarray] = useState([])
    const supabase = useSupabaseClient()
    const user = useUser()

    async function getGigs() {
      try {
        let { data: gigs, error } = await supabase
          .from('gigs')
          .select('*')

        if (error) {
          throw error
        }
    
        if (gigs) {
          console.log("getGigs(): gigs: ",gigs)
          setGigarray(gigs)
        } else {
          console.log("No Data")
         // return ("<p>oh dear</p>")
        }
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    getGigs();
  }, [])
 
  gigs = JSON.stringify(gigs);

  if(user) {
    gigs = gigarray.filter((gig) => gig.bookee !== user.id)

    return (<div className={styles.gigParent}>
      {gigarray.map((gig) => (
          <GigItem gig={gig}></GigItem>
      ))}
      </div>)
  } else {
    return (<div className={styles.gigParent}>
    {gigarray.map((gig) => (
        <GigItem gig={gig}></GigItem>
    ))}
   </div>)
  }
}