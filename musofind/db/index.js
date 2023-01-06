// const { Pool } = require('pg')
// const pool = new Pool({
//     connectionString: process.env.POSTGRES_CONNECTION_URL,
// });
// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback)
//   }
// }
import pg from "pg";

const databaseUrl = process.env.POSTGRES_CONNECTION_URL;

if (undefined === databaseUrl) {
  throw new Error(
    "Your database URL is undefined. Please fix this bug before continuing"
  );
}
const pool = new pg.Pool({
  connectionString: databaseUrl,
});

export default pool