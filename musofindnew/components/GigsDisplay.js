import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import  GigItem from './GigItem.js'

export default function GigsDisplay() {
    let loading = useRef(false)
    let gigs = useRef([])
    const [gigarray, setGigarray] = useState([])
    const supabase = useSupabaseClient()

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
            //setGigarray([...gigs])
          } else {
            console.log("No Data")
           // return ("<p>oh dear</p>")
          }
        } catch (error) {
          console.log(error)
         // return (<div></div>);
        }
      }

    getGigs();
    console.log("Gigs is still ", gigs)
}
/*
    return(gigarray.map((gig) => {
        <div>{gig}</div>
    }))

    console.log(gigs);
   // return(<div>{gigarray[1].city}</div>)
}*/