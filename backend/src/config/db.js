//database configuration
const pgp = require('pg-promise')();
require('dotenv').config();
const connection = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
}

const db = pgp(connection)

module.exports = db
