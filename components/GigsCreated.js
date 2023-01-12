import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react"
import GigCreation from "./GigCreation"
import GigItem from './GigItem'

export default function GigsCreated({ session }){
    const supabase = useSupabaseClient()
    const user = useUser()
    const [createdArray, setCreatedArray] = useState([])
    const [gigsAvailable, setGigsAvailable] = useState(false)
    const [creatingGig, setCreatingGig] = useState(false)
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
            setGigsAvailable(true)
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
      if (!creatingGig){
      return (<>
      {gigsAvailable ? (<div>
        {createdArray.map((gig) => (
            <GigItem gig={gig}></GigItem>
        ))}
      </div>) : (<div>"You have not created any gigs"</div>)}
      <div>
        <button onClick={()=>{setCreatingGig(true)}}>Create a new gig</button>
      </div>
      </>)
      } else {
        return (<><GigCreation id={user.id} closeModal={()=>{setCreatingGig(false)}}/></>)
      }
}