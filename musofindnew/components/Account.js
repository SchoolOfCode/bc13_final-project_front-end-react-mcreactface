import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
import Link from 'next/link'
import { SideBar } from './SideBar'

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [fullname, setFullname] = useState(null)
  const [email, setEmail] = useState(session.user.email)
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
        .select(`username, full_name, phone_number, address1stline, address2ndline, town, city, postcode, travelradius, cash_minimum, instruments, genres, avatar_url`)
        .eq('id', user.id)
        .single()
        console.log(data)
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
        setCashMinimum(data.cash_minimum)
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

  async function updateProfile({ username, email, fullname, phoneNumber, address1stline, address2ndline, town, city, postcode, travelradius, cashMinimum, instruments, genres, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        email,
        full_name: fullname,
        phone_number: phoneNumber,
        address1stline,
        address2ndline,
        town,
        city,
        postcode,
        travelradius,
        cash_minimum: cashMinimum,
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
  function addtoArray(e){
    let array = []
    array.push(e.target.value)
    return array
  }

  return (
    <div className="form-widget">
    <div>
    <Link href="/">
        <button className='primary'>
            Back to Hompage
        </button>
    </Link>
    </div>
    <Avatar
      uid={user.id}
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, avatar_url: url })
      }}
    />
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
      <div>
        <label htmlFor="fullname">Full name</label>
        <input
          id="fullname"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone_number">Phone Number</label>
        <input
          id="phone_number"
          type="text"
          value={phoneNumber || ''}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="address1stline">Address 1st line</label>
        <input
          id="address1stline"
          type="text"
          value={ address1stline || ''}
          onChange={(e) => setAddress1stline(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="address2ndline">Address 2nd line</label>
        <input
          id="address2ndline"
          type="text"
          value={ address2ndline || ''}
          onChange={(e) => setAddress2ndline(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="town">Town</label>
        <input
          id="town"
          type="text"
          value={ town || ''}
          onChange={(e) => setTown(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={ city || ''}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="postcode">Postcode</label>
        <input
          id="address1stline"
          type="text"
          value={ postcode || ''}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="travelradius">Travel Radius (km)</label>
        <input
          id="travelradius"
          type="text"
          value={ travelradius || ''}
          onChange={(e) => setTravelRadius(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="cash_minimum">Minimum booking rate</label>
        <input
          id="cash_minimum"
          type="text"
          value={ cashMinimum || ''}
          onChange={(e) => setCashMinimum(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="instruments">Instruments played</label>
        <input
          id="instruments"
          type="text"
          value={ instruments || ''}
          onChange={(e) => setInstruments([e.target.value])}
        />
      </div>

      <div>
        <label htmlFor="genres">Genres played</label>
        <input
          id="genres"
          type="text"
          value={ genres || ''}
          onChange={(e) => setGenres([e.target.value])}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, email, fullname, phoneNumber, address1stline, address2ndline, town, city, postcode, travelradius, cashMinimum, instruments, genres, avatar_url })}
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