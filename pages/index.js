import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import GigsDisplay from "../components/GigsDisplay"

import styles from "/pages/index.module.css"
import Navbar from "/components/navbar"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Welcome to MusoFind</title>
                <link rel="icon" href="/musoLogo.png" />
            </Head>
            <Navbar />
            <main>
                <GigsDisplay />
            </main>
        </div>
    )
}
