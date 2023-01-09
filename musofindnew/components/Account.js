import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [fullname, setFullname] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [address1stline, setAddress1stline] = useState(null)
  const [address2ndline, setAddress2ndline] = useState(null)
  const [town, setTown] = useState(null)
  const [city, setCity] = useState(null)
  const [postcode, setPostcode] = useState(null)
  const [travelradius, setTravelRadius] = useState(null)
  const [cashMinimum, setCashMinimum] = useState(null)
  const [instruments, setInstruments] = useState(null)
  const [genres, setGenres] = useState(null)
  const [rating, setRating] = useState(null)
//   const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, full_name, phone_number, address1stline, address2ndline, town, city, postcode, travelradius, cashminimum, instruments, genres, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setFullname(data.full_name)
        setPhoneNumber(data.phone_number)
        setAddress1stline(data.address1stline)
        setAddress2ndline(data.address2ndline)
        setTown(data.town)
        setCity(data.city)
        setPostcode(data.postcode)
        setTravelRadius(data.travelradius)
        setCashMinimum(data.cashminimum)
        setInstruments(data.instruments)
        setGenres(data.genres)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, full_name, phone_number, address1stline, address2ndline, town, city, postcode, travelradius, cashminimum, instruments, genres, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        full_name,
        phone_number,
        address1stline,
        address2ndline,
        town,
        city,
        postcode,
        travelradius,
        cashminimum,
        instruments,
        genres,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {/* Email input */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}