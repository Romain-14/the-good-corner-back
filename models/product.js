import pool from '../database/db.js'

class Product {

    static async save(q, d){
        await pool.execute(q, [...Object.values(d)]);
    }

    static async getDatas(q, d){
        const [result] = await pool.execute(q, [d]);
        return result;
    }

    static async getAllDatas(q){
        const [result] = await pool.execute(q);
        return result;
    }

}

export default Product;