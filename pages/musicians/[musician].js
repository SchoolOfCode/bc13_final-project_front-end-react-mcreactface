import Link from "next/link"
import styles from "../../styles/musicians.module.css"
import Head from "next/head"
import { useEffect, useState } from "react"
/* import useGetMusicians from "../../utils/musicians.js" */
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export async function getStaticPaths() {
    const [musicians, setMusicians] = useState([])
    const supabase = useSupabaseClient()

    useEffect(() => {
        async function getMusicians() {
            let { data: musicians, error } = await supabase
                .from("profiles")
                .select("*")
            setMusicians(musicians)
        }
        getMusicians()
    }, [])

    console.log(musicians)

    const paths = musicians.map((musician) => {
        return {
            params: { name: musician.id },
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    //https://www.youtube.com/watch?v=2zRHlqc0_yw

    return {
        props: {
            slug,
            content,
        },
    }
}

export default function Musician(data) {
    return (
        <>
            <div className={styles.pagecontainer}>
                <p>The musician page</p>
            </div>
        </>
    )
}
