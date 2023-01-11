import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import { SideBar } from '../components/SideBar'
import { AccountPage } from '../components/AccountPage'

const Login = () => {
  const session = useSession()
  const supabase = useSupabaseClient()


  return (<>
    {!session ? (<div className="container" style={{ padding: '50px 0 100px 0' }}>
        <Auth providers={["apple", "google", "github"]} supabaseClient={supabase} theme="dark" appearance={{
          theme: ThemeSupa,
          style: {
            button: { background: '#ff5722', color: 'black'},
            anchor: { color: 'grey' }
          },
        }} /> </div>)
        : (
          <AccountPage session={session} />
        )}
    </>
  )
}

export default Login