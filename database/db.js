import mysql from 'mysql2/promise';
import {DB_HOST, DB_NAME, DB_USER, DB_PWD} from '../config/index.js';

const pool = mysql.createPool({
    host:DB_HOST,
    database:DB_NAME,
    user:DB_USER,
    password:DB_PWD,
});

pool.getConnection().then(res=> console.log(`connected to '${res.config.database}' database`)).catch(err=> console.log(err))

export default pool;