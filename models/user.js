import pool from '../database/db.js'

class User {

    static async save(q,d){
        await pool.execute(q,[...Object.values(d)]);
    }

    static async getData(q, d){
        console.log(q ,d)
        const [result] = await pool.execute(q, [d]);
        return result;
    }

    static async getDatas(q){
        console.log(q)
        const [result] = await pool.execute(q);
        return result;
    }

}

export default User;