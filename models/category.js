import pool from '../database/db.js';

// q --> query
// d --> data

class Category {

    static async save(q,d){
        await pool.execute(q,[...Object.values(d)]);
    }

    static async getData(q, d){
        const [result] = await pool.execute(q, [d]);
        return result;
    }

    static async getDatas(q){
        const [result] = await pool.execute(q);
        return result;
    }

}

export default Category;