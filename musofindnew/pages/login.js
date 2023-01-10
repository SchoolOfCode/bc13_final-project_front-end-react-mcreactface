import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import { SideBar } from '../components/SideBar'
import { AccountPage } from '../components/AccountPage'

const Login = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <AccountPage session={session}/>
      )}
    </div>
  )
}

export default Login