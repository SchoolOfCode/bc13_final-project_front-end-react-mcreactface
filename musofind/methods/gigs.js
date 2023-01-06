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

export const createGig = async () => {
    try {
        
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
       return rows
    } catch (e) {
        console.error(e)
    }
}