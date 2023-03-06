import "../styles/globals.css"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"
import Layout from "../components/layout"

function MyApp({ Component, pageProps }) {
    const [supabase] = useState(() => createBrowserSupabaseClient())
    //const supabase = useSupabaseClient()
    //const user = useUser()

    return (
        <SessionContextProvider
            supabaseClient={supabase}
            initialSession={pageProps.initialSession}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionContextProvider>
    )
}
export default MyApp
