import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import  GigItem from './GigItem.js'

export default function GigsDisplay() {
    let loading = useRef(false)

    async function getGigs() {
        let gigs = useRef([])
        const supabase = useSupabaseClient()

        try {
          loading = true;
    
          let { data: gigs, error } = await supabase
            .from('gigs')
            .select('*')
            .eq("id", 1)

          if (error) {
            throw error
          }
    
          if (gigs) {
            console.log("gigs",gigs)
            return (
                gigs.map((gig) => {
                    (<GigItem gig={gig}></GigItem>)
                })
            )
          } else {
            console.log("No Data")
            return (<p>oh dear</p>)
          }
        } catch (error) {
          console.log(error)
        } finally {
          loading = false;
        }
      }
    
    getGigs();
}