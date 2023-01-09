import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import navbar from "@/components/navbar"


import styles from '@/pages/index.module.css'
import Navbar from '@/components/navbar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<Navbar />
      <main>

      </main>
    </div>
  )
}
