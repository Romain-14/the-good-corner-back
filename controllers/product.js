import Product from "../models/product.js"

export const findAll = async (req,res) => {
    const query = "SELECT * FROM product";
    try {
        const result = await Product.getAllDatas(query);
        res.status(200).json({
            msg: "products retrieved",
            result: result
        });
        
    } catch (error) {
        return next(error);
    }

}
export const find = async (req, res, next) => {
    const query = `SELECT * FROM product WHERE ${req.params.col_name} = ?`;

    try {
        const result = await Product.getDatas(query, req.params.value);
        if(result.length){
            res.status(200).json({
                msg: "product(s) retrieved",
                result: result,
            });
            return;
        }
        res.status(404).json({
            msg: "produit inconnu au bataillon !",
        })
    } catch (error) {
        return next(error);
    }
}

export const create = async (req, res) => {
    const datas = {
        title: req.body.title,
        content: req.body.content,
        img_url: req.body.img_url,
        user_id: req.body.user_id,
        category_id: req.body.category_id,
    }
    const query = "INSERT INTO product (title, content, img_url, user_id, category_id) VALUES (?,?,?,?,?)";
    try {
        await Product.save(query, datas);
        res.status(201).json({
            msg: "product created",
        })
        
    } catch (error) {
        return next(error)
    }
}

export const addImg = async (req, res) => {
    console.log(req.params.uuid)
    try {
        await req.files.image.mv(`public/images/${req.params.uuid}/${req.files.image.name}`);
        res.json({
            msg: `it's good for UR pict' ${req.files.image.name} !!`,
            url: req.files.image.name,
        })
    } catch (error) {        
        res.status(500).json({ msg: "photo can't be recover", error: error  });
    }    
}