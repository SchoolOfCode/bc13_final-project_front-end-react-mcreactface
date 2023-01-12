import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import  GigItem from './GigItem.js'
import styles from "./GigItem.module.css"


export default function GigsDisplay() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [output, setOutput] = useState([])

  useEffect(() => {
    getGigs()
  }, [])

  async function getGigs() {


    // get the userID ✅
    // get the genres from the profiles table based on the userID and call it userGenres ✅
    // get the gigs ✅
    // filter the gigs based on whether genres matches userGenres (optional show all button) 
    // filter the gigs to remove any gig where gig.id matches userID (optional show my gigs with css styling)

    /* this has to be defined outside of the next block */
    let { data: gigs, gigsTableError } = await supabase
      .from('gigs')
      .select('*')

    if(user) {
      /* this has to be defined within the if(user) block otherwise the component can't render */
      let { data: userGenres, profileTableError } = await supabase
      .from('profiles')
      .select('genres')
      .eq("id", user.id)
      .single()

      console.log("Pre-filtered",gigs)

      gigs = gigs.filter((gig) => {
        //console.log("FILTERING: gig.genres: ",gig.genres," + userGenres.genres: ",userGenres.genres)
        return gig.genres.some(r=> userGenres.genres.indexOf(r) >= 0)
      })

      setOutput(gigs)
    } else {
      setOutput(gigs)
    }
  }
  

    return (<div className={styles.gigParent}>
    {output.map((gig) => (
        <GigItem key={gig.id} gig={gig}></GigItem>
    ))}
    </div>)
}