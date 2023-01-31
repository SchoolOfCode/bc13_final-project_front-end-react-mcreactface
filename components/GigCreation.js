import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import styles from "./GigCreation.module.css"

export default function GigCreation({ closeModal, id }) {
    const supabase = useSupabaseClient()
    const [address1stline, setAddress1stline] = useState("")
    const [address2ndline, setAddress2ndline] = useState("")
    const [town, setTown] = useState("")
    const [city, setCity] = useState("")
    const [postcode, setPostcode] = useState("")
    const [region, setRegion] = useState("")
    const [instrumentsReq, setInstrumentsReq] = useState("")
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [foodProvided, setFoodProvided] = useState(false)
    const [veggieOption, setVeggieOption] = useState(false)
    const [pa, setPa] = useState(false)
    const [payment, setPayment] = useState("")
    const [numberOfSets, setNumberOfSets] = useState("")
    const [setLength, setSetLength] = useState("")
    const [genres, setGenres] = useState("")
    const [eventType, setEventType] = useState("")
    const [boxChecked, setBoxChecked] = useState({
        Drums: false,
        Guitar: false,
        Bass: false,
        Keys: false,
        Vocal: false,
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
    async function createGig({
        address1stline,
        address2ndline,
        town,
        city,
        postcode,
        region,
        instrumentsReq,
        id,
        startTime,
        endTime,
        foodProvided,
        veggieOption,
        pa,
        payment,
        numberOfSets,
        setLength,
        genres,
        eventType,
    }) {
        try {
            const gig = {
                address1stline,
                address2ndline,
                town,
                city,
                postcode,
                region,
                instrumentreq: instrumentsReq,
                bookee: id,
                starttime: startTime,
                endtime: endTime,
                foodprovided: foodProvided,
                veggieoption: veggieOption,
                pa,
                payment,
                numberofsets: numberOfSets,
                setlength: setLength,
                eventtype: eventType,
                genres,
            }
            console.log(gig)
            let { error } = await supabase.from("gigs").insert(gig)
            if (error) throw error
            alert("Profile updated!")
        } catch (error) {
            alert("Error updating the data!")
            console.log(error)
        }
    }

    function editInstruments(e) {
        if (e.currentTarget.checked) {
            setInstrumentsReq([...instrumentsReq, e.target.value])
            setBoxChecked({ ...boxChecked, [e.target.value]: true })
            console.log(instrumentsReq)
        } else if (!e.currentTarget.checked) {
            setInstrumentsReq(
                instrumentsReq.filter(
                    (instrument) => instrument !== e.target.value
                )
            )
            setBoxChecked({ ...boxChecked, [e.target.value]: false })
            console.log(instrumentsReq)
        }
    }

    function editGenres(e) {
        if (e.currentTarget.checked) {
            setGenres([...genres, e.target.value])
            setBoxChecked({ ...boxChecked, [e.target.value]: true })
            console.log(genres)
        } else if (!e.currentTarget.checked) {
            setGenres(genres.filter((genre) => genre !== e.target.value))
            setBoxChecked({ ...boxChecked, [e.target.value]: false })
            console.log(genres)
        }
    }

    return (
        <div className="form-widget">
            <h1>Create a Gig</h1>
            <div>
                <label htmlFor="address1stline">Address 1st line</label>
                <input
                    id="address1stline"
                    type="text"
                    value={address1stline || ""}
                    onChange={(e) => {
                        setAddress1stline(e.target.value)
                        console.log(address1stline)
                    }}
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
                    id="postcode"
                    type="text"
                    value={postcode || ""}
                    onChange={(e) => setPostcode(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="region">Region</label>
                <input
                    id="region"
                    type="text"
                    value={region || ""}
                    onChange={(e) => setRegion(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="instruments">Instruments required</label>
                <div className={styles.container}>
                    <div
                        className={
                            boxChecked.Guitar
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="guitar"
                            name="instruments"
                            value="Guitar"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="guitar">Guitar</label>
                    </div>
                    <div
                        className={
                            boxChecked.Bass
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="bass"
                            name="instruments"
                            value="Bass"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="bass">Bass</label>
                    </div>
                    <div
                        className={
                            boxChecked.Drums
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="drums"
                            name="instruments"
                            value="Drums"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="drums">Drums</label>
                    </div>
                    <div
                        className={
                            boxChecked.Keys
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="keys"
                            name="instruments"
                            value="Keys"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="keys">Keys</label>
                    </div>
                    <div
                        className={
                            boxChecked.Violin
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="violin"
                            name="instruments"
                            value="Violin"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="violin">Violin</label>
                    </div>
                    <div
                        className={
                            boxChecked.Cello
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="cello"
                            name="instruments"
                            value="Cello"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="cello">Cello</label>
                    </div>
                    <div
                        className={
                            boxChecked.Trumpet
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="trumpet"
                            name="instruments"
                            value="Trumpet"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="trumpet">Trumpet</label>
                    </div>
                    <div
                        className={
                            boxChecked.Saxophone
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="saxophone"
                            name="instruments"
                            value="Saxophone"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="saxophone">Saxophone</label>
                    </div>
                    <div
                        className={
                            boxChecked.Flute
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="flute"
                            name="instruments"
                            value="Flute"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="flute">Flute</label>
                    </div>
                    <div
                        className={
                            boxChecked.Vocal
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="vocal"
                            name="instruments"
                            value="Vocal"
                            onChange={(e) => editInstruments(e)}
                        />
                        <label htmlFor="vocal">Vocal</label>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="startTime">Start Time</label>
                <input
                    className={styles.calendar}
                    id="startTime"
                    type="datetime-local"
                    value={startTime || ""}
                    onChange={(e) => {
                        setStartTime(e.target.value + ":00")
                        console.log(startTime)
                    }}
                />
            </div>
            <div>
                <label htmlFor="endTime">End Time</label>
                <input
                    className={styles.calendar}
                    id="endTime"
                    type="datetime-local"
                    value={endTime || ""}
                    onChange={(e) => {
                        setEndTime(e.target.value)
                        console.log(endTime)
                    }}
                />
            </div>
            <div className={styles.empty}></div>
            <div>
                <label htmlFor="foodProvided">Food Provided</label>
                <div className={styles.boolean}>
                    <div className={styles.options}>
                        <input
                            type="radio"
                            id="true"
                            name="foodProvided"
                            value="true"
                            onChange={(e) => setFoodProvided(e.target.value)}
                        />
                        <label htmlFor="true">True</label>
                    </div>
                    <div className={styles.options}>
                        <input
                            type="radio"
                            id="false"
                            name="foodProvided"
                            value="false"
                            onChange={(e) => setFoodProvided(e.target.value)}
                        />
                        <label htmlFor="false">False</label>
                    </div>
                </div>
            </div>
            <div className={styles.empty}></div>
            <div>
                <label htmlFor="veggieOption">Veggie Option available</label>
                <div className={styles.boolean}>
                    <div className={styles.options}>
                        <input
                            type="radio"
                            id="true"
                            name="veggieOption"
                            value="true"
                            onChange={(e) => setVeggieOption(e.target.value)}
                        />
                        <label htmlFor="true">True</label>
                    </div>
                    <div className={styles.options}>
                        <input
                            type="radio"
                            id="false"
                            name="veggieOption"
                            value="false"
                            onChange={(e) => setVeggieOption(e.target.value)}
                        />
                        <label htmlFor="false">False</label>
                    </div>
                </div>
            </div>
            <div className={styles.empty}></div>
            <div>
                <label htmlFor="pa">Pa required</label>
                <div className={styles.boolean}>
                    <div className={styles.options}>
                        <input
                            type="radio"
                            id="true"
                            name="pa"
                            value="true"
                            onChange={(e) => setPa(e.target.value)}
                        />
                        <label htmlFor="true">True</label>
                    </div>
                    <div className={styles.options}>
                        <input
                            type="radio"
                            id="false"
                            name="pa"
                            value="false"
                            onChange={(e) => setPa(e.target.value)}
                        />
                        <label htmlFor="false">False</label>
                    </div>
                </div>
            </div>
            <div className={styles.empty}></div>
            <div>
                <label htmlFor="payment">Payment</label>
                <input
                    id="payment"
                    type="number"
                    value={payment || ""}
                    onChange={(e) => setPayment(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="numberOfSets">Number of Sets</label>
                <input
                    id="numberOfSets"
                    type="number"
                    value={numberOfSets || ""}
                    onChange={(e) => setNumberOfSets(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="setLength">Set Length</label>
                <input
                    id="setLength"
                    type="number"
                    value={setLength || ""}
                    onChange={(e) => setSetLength(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="eventType">Event Type</label>
                <input
                    id="eventType"
                    type="text"
                    value={eventType || ""}
                    onChange={(e) => setEventType(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="genres">Genres played</label>
                <div className={styles.container}>
                    <div
                        className={
                            boxChecked.Rock
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="rock"
                            name="genres"
                            value="Rock"
                            onChange={(e) => editGenres(e)}
                        />
                        <label htmlFor="rock">Rock</label>
                    </div>
                    <div
                        className={
                            boxChecked["Standard Function"]
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="standard-function"
                            name="genres"
                            value="Standard Function"
                            onChange={(e) => editGenres(e)}
                        />
                        <label htmlFor="standard-function">
                            Standard Function
                        </label>
                    </div>
                    <div
                        className={
                            boxChecked.Pop
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="pop"
                            name="genres"
                            value="Pop"
                            onChange={(e) => editGenres(e)}
                        />
                        <label htmlFor="pop">Pop</label>
                    </div>
                    <div
                        className={
                            boxChecked.Blues
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="blues"
                            name="genres"
                            value="Blues"
                            onChange={(e) => editGenres(e)}
                        />
                        <label htmlFor="blues">Blues</label>
                    </div>
                    <div
                        className={
                            boxChecked.Jazz
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="jazz"
                            name="genres"
                            value="Jazz"
                            onChange={(e) => editGenres(e)}
                        />
                        <label htmlFor="jazz">Jazz</label>
                    </div>
                    <div
                        className={
                            boxChecked.Acoustic
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="acoustic"
                            name="genres"
                            value="Acoustic"
                            onChange={(e) => editGenres(e)}
                        />
                        <label htmlFor="acoustic">Acoustic</label>
                    </div>
                    <div
                        className={
                            boxChecked.Folk
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="folk"
                            name="genres"
                            value="Folk"
                            onChange={(e) => editGenres(e)}
                        />
                        <label htmlFor="folk">Folk</label>
                    </div>
                    <div
                        className={
                            boxChecked.Classical
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="classical"
                            name="genres"
                            value="Classical"
                            onChange={(e) => editGenres(e)}
                        />
                        <label htmlFor="classical">Classical</label>
                    </div>
                    <div
                        className={
                            boxChecked.Country
                                ? styles.checkedOption
                                : styles.option
                        }
                    >
                        <input
                            type="checkbox"
                            id="country"
                            name="genres"
                            value="Country"
                            onChange={(e) => editGenres(e)}
                        />
                        <label htmlFor="country">Country</label>
                    </div>
                </div>
            </div>
            <button
                onClick={() =>
                    createGig({
                        address1stline,
                        address2ndline,
                        town,
                        city,
                        postcode,
                        region,
                        instrumentsReq,
                        id,
                        startTime,
                        endTime,
                        foodProvided,
                        veggieOption,
                        pa,
                        payment,
                        numberOfSets,
                        setLength,
                        genres,
                        eventType,
                    })
                }
            >
                Create Gig
            </button>
            <button onClick={closeModal}>Close</button>
        </div>
    )
}
