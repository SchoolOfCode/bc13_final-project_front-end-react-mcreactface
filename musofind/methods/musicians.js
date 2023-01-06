import pool from "../db/index.js"
/**
 *
 * TODO: IMPLEMENT FUNCTIONALITY TO CLOSE MYSQL CONNECTIONS IN ALL FUNCTIONS
 */
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

export const createCustomer = async (customerId, firstName, lastName) => {
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

export const deleteCustomerById = async (customerId) => {
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

// const customers = {
//     getCustomers,
//     getCustomerById,
//     createCustomer,
//     deleteCustomerById,
// }

// module.exports = customers
