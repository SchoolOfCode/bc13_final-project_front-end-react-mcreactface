import pool from "../db/index.js"

export const getMusicians = async () => {
    try {
        const allGigs = pool.query("SELECT * FROM musicians")
        console.log("worked")
        return allGigs
    } catch (e) {
        console.error(e)
    }
}

export const getMusician = async (musicianId) => {
    try {
        const musicianById = pool.query(
            "SELECT * FROM musicians WHERE id = $1",
            [musicianId]
        )
        return musicianById
    } catch (e) {
        console.error(e)
    }
}

export const createMusician = async (customerId, firstName, lastName) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig)
        const [rows, fields] = await connection.execute(
            `INSERT INTO your_table (id, first_name, last_name) VALUES (${customerId},"${firstName}", "${lastName}");`
        )
        return rows
    } catch (e) {
        console.error(e)
    }
}

export const updateMusician = async () => {
    try {
    } catch (e) {
        console.error(e)
    }
}

export const deleteMusicianById = async (customerId) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig)
        const [rows, fields] = await connection.execute(
            `DELETE FROM your_table WHERE id = ${customerId};`
        )
        return rows
    } catch (e) {
        console.error(e)
    }
}
