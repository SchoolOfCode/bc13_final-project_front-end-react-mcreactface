import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import  GigItem from './GigItem.js'

export default function GigsDisplay() {
    let loading = useRef(false)
    const [gigarray, setGigarray] = useState([])

    async function getGigs() {
        let gigs = useRef([])
        const supabase = useSupabaseClient()

        try {
          let { data: gigs, error } = await supabase
            .from('gigs')
            .select('*')


          if (error) {
            throw error
          }
    
          if (gigs) {
            setGigarray([...gigs]);
          } else {
            console.log("No Data")
            return ("<p>oh dear</p>")
          }
        } catch (error) {
          console.log(error)
        }
      }

    getGigs();

    return( {gigarray.map(gig) => <div></div>})
}