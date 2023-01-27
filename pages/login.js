import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import Account from "../components/Account"
import { SideBar } from "../components/SideBar"
import { AccountPage } from "../components/AccountPage"
import GigsDisplay from "../components/GigsDisplay"
import Router from "next/router"

const Login = () => {
    const session = useSession()
    const supabase = useSupabaseClient()

    if (session) {
        Router.push({
            pathname: "/gigs",
            //  query: { example: "something" }, // query is optional
        }).then(() => {
            window.scrollTo(0, 0)
        })
    }

    return (
        <div className="container" style={{ padding: "50px 0 100px 0" }}>
            {!session ? (
                <Auth
                    providers={["apple", "google", "github"]}
                    supabaseClient={supabase}
                    theme="dark"
                    redirectTo={"http://localhost:3000/gigs/"}
                    appearance={{
                        theme: ThemeSupa,
                        style: {
                            button: { background: "#ff5722", color: "black" },
                            anchor: { color: "grey" },
                        },
                    }}
                />
            ) : (
                <Account session={session} />
            )}
        </div>
    )
}

export default Login
