import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from './GigReview.module.css'
import StarRating from './StarRating'
export default function GigReview({ gigBeingReviewed, reviewee }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [depp, setDepp] = useState({})
    const supabase = useSupabaseClient()
    
    const imageUrl = supabase.storage.from("avatars").getPublicUrl(reviewee[0]?.avatar_url)
    console.log(imageUrl)
    console.log('THIS IS THE GIG', gigBeingReviewed)
    console.log('THIS IS THE REVIEWEE', reviewee)

    async function submitReview() {
        const review = {
            gig_id: gigBeingReviewed.id,
            created_at: new Date().toISOString(),
            reviewer: gigBeingReviewed.bookee,
            reviewee: reviewee[0].id,
            rating: rating
        }
        console.log(review)
        try {
            const { data, error } = await supabase
            .from('reviews')
            .insert(review)
            if (error) throw error
            console.log(data)
            const { data: reviewSuccess , error: reviewTrueError } = await supabase
            .from('gigs')
            .update({ reviewed: true })
            .eq('id', gigBeingReviewed.id)
            if (reviewTrueError) throw error
            console.log(reviewSuccess)
            
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <div>
            <h1>Gig Review</h1>
            <figure>
                <img src={imageUrl.data.publicUrl} alt={`Image of depp`}  style={{ height: 50, width: 50 }}/>
                <h2>{reviewee[0].full_name}</h2>
                <h3>{gigBeingReviewed.instrumentreq[0]}</h3>
            </figure>
        <div className={styles.rate}>
        <input onClick={()=>{setRating(5); console.log(rating)}} type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text">5 stars</label>
        <input onClick={()=>{setRating(4); console.log(rating)}} type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="text">4 stars</label>
        <input onClick={()=>setRating(3)} type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="text">3 stars</label>
        <input onClick={()=>setRating(2)} type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="text">2 stars</label>
        <input onClick={()=>setRating(1)} type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="text">1 star</label>
      </div>

      <div>
        <button onClick={submitReview}>
            Submit rating
        </button>
      </div>

        </div>
    )
}