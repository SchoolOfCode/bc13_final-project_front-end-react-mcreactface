import useGetCompleted from "../utils/completedGigs";
import GigItem from "./GigItem";
import GigReview from "./GigReview";
import styles from "./GigsCompleted.module.css";
import { useState, useRef, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
export default function GigsCompleted() {
    
    const [reviewing, setReviewing] = useState(false);
    const [reviewingId, setReviewingId] = useState(null)
    const [gigBeingReviewed, setGigBeingReviewed] = useState(null)
    const [reviewee, setReviewee] = useState(null)
    const supabase = useSupabaseClient();
    const ref = useRef(null)
    function scroll(scrollOffset) {
        ref.current.scrollLeft += scrollOffset
    }
    const { completedGigs } = useGetCompleted(reviewing);
    console.log(completedGigs);

    async function getReviewee() {
        try {
            let { data: depp, error } = await supabase
                .from("profiles")
                .select('*')
                .eq("id", reviewingId)
                if(depp){
                setReviewee(depp)
                console.log(depp)
                }
                else {
                    console.log('NO DATA')
                    setReviewee(null)
                }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getReviewee()
        console.log('THIS IS THE REVIWEE', reviewee)
    }, [reviewing])

    
    return (
        <div className={styles.layout}>
        {reviewing ?
                        <div className="modalOpen">
                            <div class="modal-content2">
                            <span
                                    onClick={() => {setReviewing(false); console.log(reviewing)}}
                                    class="close"
                                >
                                    &times;
                                </span>
                             {reviewee !== null ? <GigReview gigBeingReviewed={gigBeingReviewed} reviewee={reviewee}/> : <h2>This gig was not booked</h2>}  
                            </div>
                            <button></button>
                        </div> : null}
                        <button
                            className={styles.scroll}
                            onClick={() => scroll(-500)}
                        >
                            {"<"}
                        </button>
                        <div className={styles.row}>
                            <div ref={ref} className={styles.rowItems}>
                                {completedGigs.map((gig) => (
                                    <div className={styles.rowItem}>
                                        <GigItem
                                            key={gig.id}
                                            gig={gig}
                                            setReviewing={setReviewing}
                                            setReviewingId={setReviewingId}
                                            reviewingId={reviewingId}
                                            setGigBeingReviewed={setGigBeingReviewed}
                                            reviewing={reviewing}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            className={styles.scroll}
                            onClick={() => scroll(500)}
                        >
                            {">"}
                        </button>
                    </div>
    );
}