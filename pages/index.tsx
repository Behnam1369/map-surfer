import Head from 'next/head'
import { Inter } from "@next/font/google"
import styles from '../styles/Home.module.css'
import Map from './components/map'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Map surfer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Map surfer</h1>
        <Map />
      </main>
    </>
  )
}
