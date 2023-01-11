import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import  GigItem from './GigItem.js'
import styles from "./GigItem.module.css"

export default function GigsDisplay() {
    let loading = useRef(false)
    let gigs = useRef([])
    let filteredArray = useRef([])
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
  let filtered
  if (user){
    console.log("the id of the person logged in", user.id)
    console.log("array of bookees", gigarray.map((gig)=> gig.bookee))
    filtered = gigarray.filter((gig)=> gig.bookee !== user.id)
  }
  console.log(filtered)
  // setGigarray([...filtered])
  // gigs = JSON.stringify(gigs);

  return (<div className={styles.gigParent}>
    {gigarray.map((gig) => (
        <GigItem gig={gig}></GigItem>
    ))}
  </div>);
}