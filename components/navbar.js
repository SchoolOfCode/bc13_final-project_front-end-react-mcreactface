import Link from "next/link"
import { useEffect, useState, useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import AvatarIcon from "./AvatarIcon"
import {
    useSession,
    useUser,
    useSupabaseClient,
} from "@supabase/auth-helpers-react"

import styles from "../styles/Navbar.module.css"

export default function Navbar() {
    const { asPath } = useRouter()
    /* https://nextjs.org/docs/api-reference/next/router */

    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const supabase = useSupabaseClient()
    const session = useSession()
    const user = useUser()
    const [username, setUsername] = useState("")
    const [avatarUrl, setAvatarUrl] = useState(null)
    const router = useRouter()

    async function getUsername() {
        try {
            let { data, error } = await supabase
                .from("profiles")
                .select("username, avatar_url")
                .eq("id", user.id)
            if (data) {
                setUsername(data[0].username)
                setAvatarUrl(data[0].avatar_url)
            }
            if (error) {
                alert("fetch failed")
            }
        } catch (error) {
            alert(error.message)
        }
    }
    if (user) {
        getUsername()
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.logotitle}>
                <Link href="/">
                    <Image
                        src="/musoLogo.png"
                        alt="Logo"
                        width={75}
                        height={75}
                    />
                </Link>
                <p>Musofind</p>
            </div>
            <div>
                <div className={isNavExpanded ? styles.hide : styles.display}>
                    <button
                        className={styles.icon}
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className={isNavExpanded ? styles.display : styles.hide}>
                    <button
                        className={styles.icon}
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <ul
                className={`${styles.ul} ${
                    isNavExpanded ? styles.display : styles.hide
                }`}
            >
                <li className={styles.li}>
                    <Link
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                        href={"/"}
                        className={asPath == "/" ? styles.activelink : ""}
                    >
                        Home
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                        href={"/gigs"}
                        className={asPath == "/gigs" ? styles.activelink : ""}
                    >
                        Gigs
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                        href={"/musicians"}
                        className={
                            asPath == "/musicians" ? styles.activelink : ""
                        }
                    >
                        Musicians
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                        href={"/about"}
                        className={asPath == "/about" ? styles.activelink : ""}
                    >
                        About
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                        href={"/contact"}
                        className={
                            asPath == "/contact" ? styles.activelink : ""
                        }
                    >
                        Contact
                    </Link>
                </li>
                {!session ? (
                    <li className={styles.li}>
                        <Link
                            onClick={() => {
                                setIsNavExpanded(!isNavExpanded)
                            }}
                            href={"/login"}
                            className={
                                asPath == "/login" ? styles.activelink : ""
                            }
                        >
                            Login
                        </Link>
                    </li>
                ) : (
                    <>
                        <li className={`${styles.avataricon} ${styles.li}`}>
                            <Link
                                onClick={() => {
                                    setIsNavExpanded(!isNavExpanded)
                                }}
                                href={"/login"}
                                className={
                                    asPath == "/login" ? styles.activelink : ""
                                }
                            >
                                <AvatarIcon size={50} avatarUrl={avatarUrl} />
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link
                                onClick={() => {
                                    setIsNavExpanded(!isNavExpanded)
                                }}
                                href={"/mygigs"}
                                className={
                                    asPath == "/mygigs" ? styles.activelink : ""
                                }
                            >
                                My Gigs
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link
                                onClick={() => {
                                    setIsNavExpanded(!isNavExpanded)
                                }}
                                href="/"
                                onClick={() => supabase.auth.signOut()}
                                className={
                                    asPath == "/" ? styles.activelink : ""
                                }
                            >
                                Sign Out
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
