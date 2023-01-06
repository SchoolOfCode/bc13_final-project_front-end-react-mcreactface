import pool from "../db/index.js"

export const getGigs = async () => {
    try {
        const allGigs = pool.query("SELECT * FROM gigs")
        console.log("worked")
        return allGigs
    } catch (e) {
        console.error(e)
    }
}

export const getGig = async (gigId) => {
    try {
        const gigById = pool.query("SELECT * FROM gigs WHERE id = $1", [gigId])
        console.log("worked")
        return gigById
    } catch (e) {
        console.error(e)
    }
}

export const createGig = async (newGig) => {
    try {
        parameterValues = [newGig.starttime, newGig.endtime, newGig.address1stline, newGig.address2ndline, newGig.town, newGig.city, newGig.postcode, newGig.region, newGig.instrumentreq, newGig.bookee, newGig.foodprovided, newGig.veggieoption, newGig.pa, newGig.payment, newGig.80s, newGig.90s, newGig.oldies, newGig.standardfunction, newGig.starttime, newGig.motownfunksoul, newGig.pop, newGig.numberofsets, newGig.setlength, newGig.eventtype]
        const createdGig = pool.query ("INSERT INTO gigs (starttime, endtime, address1stline, address2ndline, town, city, postcode, region, instrumentreq, bookee, foodprovided, veggieoption, pa, payment, “80s”, “90s”, oldies, standardfunction, motownfunksoul, pop, numberofsets, setlength, eventtype)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *;", parameterValues)
        return createdGig
    } catch (e) {
        console.error(e)
    }
}

export const updateGig = async () => {
    try {
        
    } catch (e) {
        console.error(e)
    }
}

export const deleteGig = async (gigId) => {
    try {
        const deletedGig = pool.query("DELETE * FROM gigs WHERE id = $1", [gigId])
        console.log("worked")
        return deletedGig
    } catch (e) {
        console.error(e)
    }
}