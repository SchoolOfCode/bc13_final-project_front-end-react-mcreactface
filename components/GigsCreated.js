import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect, useRef } from "react"
import GigCreation from "./GigCreation"
import GigItem from "./GigItem"
import styles from "./GigsCreated.module.css"
import GigEdit from "./GigEdit"

export default function GigsCreated({ session }) {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [createdArray, setCreatedArray] = useState([])
    const [gigsAvailable, setGigsAvailable] = useState(false)
    const [creatingGig, setCreatingGig] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    async function getCreatedGigs() {
        try {
            let { data: userCreatedGigs, error } = await supabase
                .from("gigs")
                .select("*")
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
        getCreatedGigs()
    }, [user])

    async function deleteGig(gigId) {
        try {
            console.log("deleteGig(): gigId: ", gigId)
            let { data, error } = await supabase
                .from("gigs")
                .delete()
                .eq("id", gigId)
            if (error) {
                throw error
            }
            if (data) {
                console.log("Gig Deleted", data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Controls scroll buttons for cards
    const ref = useRef(null)
    function scroll(scrollOffset) {
        ref.current.scrollLeft += scrollOffset
    }

    if (user && !creatingGig) {
        if (editing) {
            return (
                <div>
                    <GigEdit
                        id={user.id}
                        gigId={editingId}
                        closeEdit={() => {
                            setEditing(false)
                        }}
                    />
                </div>
            )
        } else {
            return (
                <>
                    <div className={styles.button}>
                        <h2>Need a dep for your gig?</h2>
                        <h3>
                            Give us the details and let us help you find someone
                        </h3>
                        <button
                            onClick={() => {
                                setCreatingGig(true)
                            }}
                        >
                            Create a Gig
                        </button>
                    </div>
                    <div className={styles.layout}>
                        <div className={deleting ? "modalOpen" : "modalClosed"}>
                            <div class="modal-content">
                                <span
                                    onClick={() => setDeleting(false)}
                                    class="close"
                                >
                                    &times;
                                </span>
                                <p>Are you sure you want to delete this Gig?</p>
                                <div className="modal-buttons">
                                    <button
                                        className="cancel"
                                        onClick={() => setDeleting(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="delete"
                                        onClick={() => {
                                            deleteGig(deletingId)
                                            console.log(deletingId)
                                            setDeleting(false)
                                        }}
                                    >
                                        Delete
                                    </button>
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
                                {createdArray.map((gig) => (
                                    <div className={styles.rowItem}>
                                        <GigItem
                                            key={gig.id}
                                            gig={gig}
                                            setEditing={setEditing}
                                            setEditingId={setEditingId}
                                            setDeleting={setDeleting}
                                            setDeletingId={setDeletingId}
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
                </>
            )
        }
    } else if (creatingGig && user) {
        return (
            <div>
                <GigCreation
                    id={user.id}
                    closeModal={() => {
                        setCreatingGig(false)
                    }}
                />
            </div>
        )
    }
}
{
    /* <div className={styles.gigParent}>
                    {output.map((gig) => (
                        <GigItem key={gig.id} gig={gig}></GigItem>
                    ))}
                </div> */
}
