import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'


import styles from '@/pages/index.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <Link href="/login"><p>Login</p></Link>

      </main>
    </div>
  )
}
