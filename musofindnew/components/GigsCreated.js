import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react"
import GigItem from './GigItem'

export default function GigsCreated({ session }){
    const supabase = useSupabaseClient()
    const user = useUser()
    const [createdArray, setCreatedArray] = useState([])
    async function getCreatedGigs() {
        try {
          let { data: userCreatedGigs, error } = await supabase
            .from('gigs')
            .select('*')
            .eq("bookee", user.id)
  
          if (error) {
            throw error
          }
      
          if (userCreatedGigs) {
            console.log("getCreatedGigs(): gigs: ", userCreatedGigs)
            setCreatedArray([...userCreatedGigs])
          } else {
            console.log("No Data")
           // return ("<p>oh dear</p>")
          }
        } catch (error) {
          console.log(error)
        }

      }
      useEffect(() => {
        getCreatedGigs();
      }, [])
    
      return (<div>
        {createdArray.map((gig) => (
            <GigItem gig={gig}></GigItem>
        ))}
      </div>)
}