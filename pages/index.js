import Head from "next/head"
import GigsDisplay from "../components/GigsDisplay"
import styles from "/pages/index.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Welcome to MusoFind</title>
                <link rel="icon" href="/musoLogo.png" />
            </Head>
            <main>
                <GigsDisplay />
            </main>
        </div>
    )
}
