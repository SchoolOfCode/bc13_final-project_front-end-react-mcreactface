import Head from "next/head"
import styles from "../../styles/musicians.module.css"
import Musician from "../../components/musiciancard"
import useGetMusicians from "../../utils/musicians.js"
import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function Musicians() {
    const [range, setRange] = useState([0, 8])
    const [musicians, setMusicians] = useState([])
    const supabase = useSupabaseClient()

    useEffect(() => {
        async function getMusicians() {
            let { data: musicians, error } = await supabase
                .from("profiles")
                .select("*")
                .range(...range)
            setMusicians(musicians)
        }
        getMusicians()
    }, [range])

    return (
        <>
            <Head>
                <title>Find a Musician</title>
                <link rel="icon" href="/musoLogo.png" />
            </Head>
            <div className={styles.pagecontainer}>
                <h1 className={styles.h1}>Musicians</h1>
                <div className={styles.cardcontainer}>
                    {musicians.map((musician) => (
                        <Musician key={musician.id} {...musician} />
                    ))}
                </div>
                {range[0] != 0 && (
                    <button
                        className={styles.pageButton}
                        onClick={(e) => {
                            e.preventDefault()
                            setRange([range[0] - 8, range[0]])
                        }}
                    >
                        PREVIOUS
                    </button>
                )}
                {musicians.length === 9 && (
                    <button
                        className={styles.pageButton}
                        onClick={(e) => {
                            e.preventDefault()
                            setRange([range[1], range[1] + 9])
                        }}
                    >
                        NEXT
                    </button>
                )}
            </div>
        </>
    )
}
