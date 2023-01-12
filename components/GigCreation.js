import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import styles from "./GigCreation.module.css";

export default function GigCreation ({ closeModal, id }) {
    const supabase = useSupabaseClient()
    const [address1stline, setAddress1stline] = useState('')
    const [address2ndline, setAddress2ndline] = useState('')
    const [town, setTown] = useState('')
    const [city, setCity] = useState('')
    const [postcode, setPostcode] = useState('')
    const [region, setRegion] = useState('')
    const [instrumentsReq, setInstrumentsReq] = useState('')
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [foodProvided, setFoodProvided] = useState(false)
    const [veggieOption, setVeggieOption] = useState(false)
    const [pa, setPa] = useState(false)
    const [payment, setPayment] = useState('')
    const [numberOfSets, setNumberOfSets] = useState('')
    const [setLength, setSetLength] = useState('')
    const [genres, setGenres] = useState('')
    const [eventType, setEventType] = useState('')
    async function createGig({ address1stline, address2ndline, town, city, postcode, region, instrumentsReq, id, startTime, endTime, foodProvided, veggieOption, pa, payment, numberOfSets, setLength, genres, eventType }) {
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
    let { error } = await supabase.from('gigs').insert(gig)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
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
            value={ address1stline || ''}
            onChange={(e) => {setAddress1stline(e.target.value); console.log(address1stline)}}
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
            id="postcode"
            type="text"
            value={ postcode || ''}
            onChange={(e) => setPostcode(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="region">Region</label>
            <input
            id="region"
            type="text"
            value={ region || ''}
            onChange={(e) => setRegion(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="instrumentsReq">Instruments Required</label>
            <input
            id="instrumentsReq"
            type="text"
            value={ instrumentsReq || ''}
            onChange={(e) => setInstrumentsReq(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="startTime">Start Time</label>
            <input
            id="startTime"
            type="text"
            value={ startTime || ''}
            onChange={(e) => setStartTime(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="endTime">End Time</label>
            <input
            id="endTime"
            type="text"
            value={ endTime || ''}
            onChange={(e) => setEndTime(e.target.value)}
            />
        </div>
        <div className={styles.empty}></div>
        <div>
            <label htmlFor="foodProvided">Food Provided</label>
            <div className={styles.boolean}>
            <div className={styles.options}>
            <input type="radio" id="true" name="foodProvided" value="true"  onChange={(e) => setFoodProvided(e.target.value)}/>
            <label htmlFor="true">True</label>
            </div>
            <div className={styles.options}>
            <input type="radio" id="false" name="foodProvided" value="false"  onChange={(e) => setFoodProvided(e.target.value)}/>
            <label htmlFor="false">False</label>
            </div>
            </div>
        </div>
        <div className={styles.empty}></div>
        <div>
            <label htmlFor="veggieOption">Veggie Option available</label>
            <div className={styles.boolean}>
            <div className={styles.options}>
            <input type="radio" id="true" name="veggieOption" value="true"  onChange={(e) => setVeggieOption(e.target.value)}/>
            <label htmlFor="true">True</label>
            </div>
            <div className={styles.options}>
            <input type="radio" id="false" name="veggieOption" value="false"  onChange={(e) => setVeggieOption(e.target.value)}/>
            <label htmlFor="false">False</label>
            </div>
            </div>
        </div>
        <div className={styles.empty}></div>
        <div>
            <label htmlFor="pa">Pa required</label>
            <div className={styles.boolean}>
            <div className={styles.options}>
            <input type="radio" id="true" name="pa" value="true"  onChange={(e) => setPa(e.target.value)}/>
            <label htmlFor="true">True</label>
            </div>
            <div className={styles.options}>
            <input type="radio" id="false" name="pa" value="false"  onChange={(e) => setPa(e.target.value)}/>
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
            value={ payment || ''}
            onChange={(e) => setPayment(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="numberOfSets">Number of Sets</label>
            <input
            id="numberOfSets"
            type="number"
            value={ numberOfSets || ''}
            onChange={(e) => setNumberOfSets(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="setLength">Set Length</label>
            <input
            id="setLength"
            type="number"
            value={ setLength || ''}
            onChange={(e) => setSetLength(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="eventType">Event Type</label>
            <input
            id="eventType"
            type="text"
            value={ eventType || ''}
            onChange={(e) => setEventType(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="genres">Genres</label>
            <input
            id="genres"
            type="text"
            value={ genres || ''}
            onChange={(e) => setGenres(e.target.value)}
            />
        </div>
        <button onClick={() => createGig({ address1stline, address2ndline, town, city, postcode, region, instrumentsReq, id, startTime, endTime, foodProvided, veggieOption, pa, payment, numberOfSets, setLength, genres, eventType })}>Create Gig</button>
        <button onClick={closeModal}>Close</button>
    </div>
    )
}