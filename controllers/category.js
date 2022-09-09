import Query from '../models/Query.js'


// on a placé le middleware Auth sur cette route, impliquant que seul un utilisateur connecté qui a donc eu son TOKEN de généré peut accéder
export const create = async (req, res) => {
    console.log(req.params);
    try {
        const query1 = "SELECT * FROM category WHERE title = ?";
        const result = await Query.getDataByValue(query1, req.body.title);
        if(result.length){
            res.status(409).json({
                msg: 'category already existing',
            });
            return;
        }
        const query2 = "INSERT INTO category (title) VALUES (?)";
            await Query.save(query2, req.body);
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
        const result = await Query.getAllDatas(query);
        res.status(200).json({
            result: result,
        })
    } catch (error) {
        return next(error);
    }
}