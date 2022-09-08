import Category from '../models/category.js'

export const create = async (req, res) => {
    const {title} = req.body;
    try {
        const query1 = "SELECT * FROM category WHERE title = ?";
        const result = await Category.getData(query1, title);
        if(result.length){
            res.status(409).json({
                msg: 'category already existing',
            });
            return;
        }
        const query2 = "INSERT INTO category (title) VALUES (?)";
            await Category.save(query2, title);
            res.status(201).json({
                msg: "category added",
            });        
    } catch (error) {
        return next(error);
    }
}

export const findAll = async (req,res)=>{
    try {
        const query = "SELECT * FROM category"
        const result = await Category.getDatas(query);
        res.status(200).json({
            result: result,
        })
    } catch (error) {
        return next(error);
    }
}