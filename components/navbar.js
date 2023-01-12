import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession, useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import AvatarIcon from "./AvatarIcon"

function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const supabase = useSupabaseClient()
    const session = useSession()
    const user = useUser()
    const [username, setUsername] = useState("")
    const [avatarUrl, setAvatarUrl] = useState(null)
    async function getUsername(){
        try {
    let { data, error } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', user.id)
    if (data){
        console.log(data[0].username)
        console.log(data)
        console.log(data[0].avatar_url)
        setUsername(data[0].username)
        setAvatarUrl(data[0].avatar_url)
    }
    if (error){
        alert("fetch failed")
    }
} catch (error) {
    alert(error.message)
    console.log("error")
    }
}
    if (user) {
    getUsername()
    }
    return (
        <nav>
            <Link href="/">
                <Image
                    src="vercel.svg"
                    alt="Logo"
                    width={137}
                    height={50}
                />
            </Link>
            <div id="mobile">
                <div className={isNavExpanded ? "hide" : "display"}>
                    <button
                        className="icon"
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
                <div className={isNavExpanded ? "display" : "hide"}>
                    <button
                        className="icon"
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
            <ul className={isNavExpanded ? "display" : "hide"}>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/gigs"}>Gigs</Link>
                </li>
                <li>
                    <Link href={"/musicians"}>Articles</Link>
                </li>
                <li>
                    <Link href={"/contact"}>Contact</Link>
                </li>
                <li>
                {!session ? (
                    <Link href={"/login"}>Login</Link>
                    ) : (<Link href={"/login"}><AvatarIcon size={20} avatarUrl={avatarUrl} />{username}</Link>)}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
