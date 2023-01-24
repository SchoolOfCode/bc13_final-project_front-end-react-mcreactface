import Head from "next/head"
import styles from "../../styles/musicians.module.css"
import Musician from "./musiciancard"
import useGetMusicians from "../../utils/musicians.js"

export default function Musicians() {
    const { musicians } = useGetMusicians()
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
            </div>
        </>
    )
}
