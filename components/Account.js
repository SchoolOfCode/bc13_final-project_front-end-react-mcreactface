import { useState, useEffect } from "react"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import Avatar from "./Avatar"
import Link from "next/link"
import styles from "./Account.module.css"

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
    const [instruments, setInstruments] = useState("null")
    const [genres, setGenres] = useState([])
    const [rating, setRating] = useState(null)
    //   const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [boxchecked, setBoxChecked] = useState({
        Drums: false,
        Guitar: false,
        Bass: false,
        Keys: false,
        Vocals: false,
        Saxophone: false,
        Trumpet: false,
        Flute: false,
        Violin: false,
        Cello: false,
        Rock: false,
        "Standard Function": false,
        Pop: false,
        Jazz: false,
        Blues: false,
        Acoustic: false,
        Classical: false,
        Folk: false,
        Country: false,
        })

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from("profiles")
                .select(
                    `username, full_name, phone_number, address1stline, address2ndline, town, city, postcode, travelradius, cash_minimum, instruments, genres, avatar_url`
                )
                .eq("id", user.id)
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
                setBoxChecked({
                    Drums: data.instruments.includes("Drums"),
                    Guitar: data.instruments.includes("Guitar"),
                    Bass: data.instruments.includes("Bass"),
                    Keys: data.instruments.includes("Keys"),
                    Vocals: data.instruments.includes("Vocals"),
                    Saxophone: data.instruments.includes("Saxophone"),
                    Trumpet: data.instruments.includes("Trumpet"),
                    Flute: data.instruments.includes("Flute"),
                    Violin: data.instruments.includes("Violin"),
                    Cello: data.instruments.includes("Cello"),
                    Rock: data.genres.includes("Rock"),
                    "Standard Function": data.genres.includes("Standard Function"),
                    Pop: data.genres.includes("Pop"),
                    Jazz: data.genres.includes("Jazz"),
                    Blues: data.genres.includes("Blues"),
                    Acoustic: data.genres.includes("Acoustic"),
                    Classical: data.genres.includes("Classical"),
                    Folk: data.genres.includes("Folk"),
                    Country: data.genres.includes("Country")
                })
            }
        } catch (error) {
            alert("Error loading user data!")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({
        username,
        email,
        fullname,
        phoneNumber,
        address1stline,
        address2ndline,
        town,
        city,
        postcode,
        travelradius,
        cashMinimum,
        instruments,
        genres,
        avatar_url,
    }) {
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

            let { error } = await supabase.from("profiles").upsert(updates)
            if (error) throw error
            alert("Profile updated!")
        } catch (error) {
            alert("Error updating the data!")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    function editInstruments(e){
        if (e.currentTarget.checked) {
        setInstruments([...instruments, e.target.value]);
        setBoxChecked({...boxchecked, [e.target.value]: e.currentTarget.checked})
        console.log("checked log", boxchecked)
        } 
        else if (!e.currentTarget.checked){ 
        setInstruments(instruments.filter((inst) => inst !== e.target.value));
        console.log(instruments)
        setBoxChecked({...boxchecked, [e.target.value]: e.currentTarget.checked})
    }
}
    function editGenres(e){
        if (e.currentTarget.checked) {
        setGenres([...genres, e.target.value]);
        setBoxChecked({...boxchecked, [e.target.value]: e.currentTarget.checked})
        console.log("checked log", boxchecked)
        }
        else if (!e.currentTarget.checked){
        setGenres(genres.filter((genre) => genre !== e.target.value));
        console.log(genres)
        setBoxChecked({...boxchecked, [e.target.value]: e.currentTarget.checked})
    }
}

    let guitarChecked = instruments.includes("Guitar")
    let bassChecked = instruments.includes("Bass")
    let drumsChecked = instruments.includes("Drums")
    let keysChecked = instruments.includes("Keys")
    let violinChecked = instruments.includes("Violin")
    let saxophoneChecked = instruments.includes("Saxophone")
    let trumpetChecked = instruments.includes("Trumpet")
    let fluteChecked = instruments.includes("Flute")
    let celloChecked = instruments.includes("Cello")
    let vocalsChecked = instruments.includes("Vocals")

    let rockChecked = genres.includes("Rock")
    let standardFunctionChecked = genres.includes("Standard Function")
    let popChecked = genres.includes("Pop")
    let jazzChecked = genres.includes("Jazz")
    let bluesChecked = genres.includes("Blues")
    let acousticChecked = genres.includes("Acoustic")
    let classicalChecked = genres.includes("Classical")
    let folkChecked = genres.includes("Folk")
    let countryChecked = genres.includes("Country")


    return (
        <div className="form-widget">
            <div>
                <Link href="/">
                    <button className="primary">Back to Hompage</button>
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
                <input
                    id="email"
                    type="text"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="fullname">Full name</label>
                <input
                    id="fullname"
                    type="text"
                    value={fullname || ""}
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="phone_number">Phone Number</label>
                <input
                    id="phone_number"
                    type="text"
                    value={phoneNumber || ""}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="address1stline">Address 1st line</label>
                <input
                    id="address1stline"
                    type="text"
                    value={address1stline || ""}
                    onChange={(e) => setAddress1stline(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="address2ndline">Address 2nd line</label>
                <input
                    id="address2ndline"
                    type="text"
                    value={address2ndline || ""}
                    onChange={(e) => setAddress2ndline(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="town">Town</label>
                <input
                    id="town"
                    type="text"
                    value={town || ""}
                    onChange={(e) => setTown(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text"
                    value={city || ""}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="postcode">Postcode</label>
                <input
                    id="address1stline"
                    type="text"
                    value={postcode || ""}
                    onChange={(e) => setPostcode(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="travelradius">Travel Radius (km)</label>
                <input
                    id="travelradius"
                    type="text"
                    value={travelradius || ""}
                    onChange={(e) => setTravelRadius(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="cash_minimum">Minimum booking rate</label>
                <input
                    id="cash_minimum"
                    type="text"
                    value={cashMinimum || ""}
                    onChange={(e) => setCashMinimum(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="instruments">Instruments played</label>
                <div className={styles.container}>
                <div className={boxchecked.Guitar ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="guitar" name="instruments" value="Guitar" checked={guitarChecked} onChange={(e)=> editInstruments(e)} />
                <label htmlFor="guitar">Guitar</label>
                </div>
                <div className={boxchecked.Bass ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="bass" name="instruments" value="Bass" checked={bassChecked} onChange={(e)=> editInstruments(e)}/>
                <label htmlFor="bass">Bass</label>
                </div>
                <div className={boxchecked.Drums ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="drums" name="instruments" value="Drums" checked={drumsChecked} onChange={(e)=> editInstruments(e)}/>
                <label htmlFor="drums">Drums</label>
                </div>
                <div className={boxchecked.Keys ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="keys" name="instruments" value="Keys" checked={keysChecked} onChange={(e)=> editInstruments(e)}/>
                <label htmlFor="keys">Keys</label>
                </div>
                <div className={boxchecked.Violin ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="violin" name="instruments" value="Violin" checked={violinChecked} onChange={(e)=> editInstruments(e)}/>
                <label htmlFor="violin">Violin</label>
                </div>
                <div className={boxchecked.Cello ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="cello" name="instruments" value="Cello" checked={celloChecked} onChange={(e)=> editInstruments(e)}/>
                <label htmlFor="cello">Cello</label>
                </div>
                <div className={boxchecked.Trumpet ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="trumpet" name="instruments" value="Trumpet" checked={trumpetChecked} onChange={(e)=> editInstruments(e)}/>
                <label htmlFor="trumpet">Trumpet</label>
                </div>
                <div className={boxchecked.Saxophone ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="saxophone" name="instruments" value="Saxophone" checked={saxophoneChecked} onChange={(e)=> editInstruments(e)}/>
                <label htmlFor="saxophone">Saxophone</label>
                </div>
                <div className={boxchecked.Flute ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="flute" name="instruments" value="Flute" checked={fluteChecked} onChange={(e)=> editInstruments(e)}/>
                <label htmlFor="flute">Flute</label>
                </div>
                <div className={boxchecked.Vocals ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="vocals" name="instruments" value="Vocals" checked={vocalsChecked} onChange={(e)=> editInstruments(e)}/>
                <label htmlFor="vocals">Vocals</label>
                </div>
                </div>
            </div>

            <div>
            <label htmlFor="genres">Genres played</label>
                <div className={styles.container}>
                <div className={boxchecked.Rock ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="rock" name="genres" value="Rock" checked={rockChecked} onChange={(e)=> editGenres(e)} />
                <label htmlFor="rock">Rock</label>
                </div>
                <div className={boxchecked["Standard Function"] ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="standard-function" name="genres" value="Standard Function" checked={standardFunctionChecked} onChange={(e)=> editGenres(e)}/>
                <label htmlFor="standard-function">Standard Function</label>
                </div>
                <div className={boxchecked.Pop ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="pop" name="genres" value="Pop" checked={popChecked} onChange={(e)=> editGenres(e)}/>
                <label htmlFor="pop">Pop</label>
                </div>
                <div className={boxchecked.Blues ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="blues" name="genres" value="Blues" checked={bluesChecked} onChange={(e)=> editGenres(e)}/>
                <label htmlFor="blues">Blues</label>
                </div>
                <div className={boxchecked.Jazz ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="jazz" name="genres" value="Jazz" checked={jazzChecked} onChange={(e)=> editGenres(e)}/>
                <label htmlFor="jazz">Jazz</label>
                </div>
                <div className={boxchecked.Acoustic ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="acoustic" name="genres" value="Acoustic" checked={acousticChecked} onChange={(e)=> editGenres(e)}/>
                <label htmlFor="acoustic">Acoustic</label>
                </div>
                <div className={boxchecked.Folk ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="folk" name="genres" value="Folk" checked={folkChecked} onChange={(e)=> editGenres(e)}/>
                <label htmlFor="folk">Folk</label>
                </div>
                <div className={boxchecked.Classical ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="classical" name="genres" value="Classical" checked={classicalChecked} onChange={(e)=> editGenres(e)}/>
                <label htmlFor="classical">Classical</label>
                </div>
                <div className={boxchecked.Country ? styles.checkedOption : styles.option}>
                <input type="checkbox" id="country" name="genres" value="Country" checked={countryChecked} onChange={(e)=> editGenres(e)}/>
                <label htmlFor="country">Country</label>
                </div>
                </div>
            </div>

            <div>
                <button
                    className="button primary block"
                    onClick={() =>
                        updateProfile({
                            username,
                            email,
                            fullname,
                            phoneNumber,
                            address1stline,
                            address2ndline,
                            town,
                            city,
                            postcode,
                            travelradius,
                            cashMinimum,
                            instruments,
                            genres,
                            avatar_url,
                        })
                    }
                    disabled={loading}
                >
                    {loading ? "Loading ..." : "Update"}
                </button>
            </div>

            <div>
                <button
                    className="button block"
                    onClick={() => supabase.auth.signOut()}
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}
