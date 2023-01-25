import useGetCompleted from "../utils/completedGigs";
import GigItem from "./GigItem";
import styles from "./GigsCompleted.module.css";
import { useState, useRef } from "react";
export default function GigsCompleted() {
    const { completedGigs } = useGetCompleted();
    console.log(completedGigs);
    const [reviewing, setReviewing] = useState(false);
    const ref = useRef(null)
    function scroll(scrollOffset) {
        ref.current.scrollLeft += scrollOffset
    }
    return (
        <div className={styles.layout}>
                        <div className={reviewing ? "modalOpen" : "modalClosed"}>
                            <div class="modal-content">
                                <span
                                    class="close"
                                >
                                    &times;
                                </span>
                                <p>Are you sure you want to delete this Gig?</p>
                                <div className="modal-buttons">
                                </div>
                            </div>
                        </div>
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
                                            reviewed={gig.reviewed}
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