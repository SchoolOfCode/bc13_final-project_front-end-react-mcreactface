import Head from "next/head"
import styles from "../../styles/musicians.module.css"
import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Musician } from "./musiciancard.js"

export default function Musicians() {
    const [musicians, setMusicians] = useState([])
    const supabase = useSupabaseClient()

    async function getMusicians() {
        let { data: musicians, error } = await supabase
            .from("musicians")
            .select("*")
        setMusicians(musicians)
    }
    useEffect(() => {
        getMusicians()
    }, [])

    return (
        <>
            <Head>
                <title>Find a Musician</title>
                <link rel="icon" href="/musoLogo.png" />
            </Head>
            <div className={styles.pagecontainer}>
                <h1>Our Musicians</h1>
            </div>
            {musicians.map((musician) => (
                <Musician key={musician.id} {...musician} />
            ))}
        </>
    )
}
