import { v4 as uuidv4 } from 'uuid';
import {hash} from 'bcrypt';
import User from '../models/user.js';
const saltRounds = 10;

export const findAll = (req,res) => {

    res.status(200).json({
        msg: "good"
    })

}
export const findOne = (req,res) => {

    res.status(200).json({
        msg: "good"
    })

}

export const create = async (req, res) => {

    try {
        const datas ={
            alias: req.body.alias,
            password: await hash(req.body.password, saltRounds),
            uuid: uuidv4(),
        }
        const query1 = "SELECT * FROM user WHERE alias = ?";
        const result = await User.getData(query1, req.body.alias)
        if(result.length){
            res.status(409).json({
                msg: 'user already existing',
            })
            return;
        }
        const query2 = "INSERT INTO user (alias, password, uuid) VALUES (?,?,?)";
        await User.save(query2, datas);
        res.status(201).json({
            msg: "user created",
        })
        
    } catch (error) {
        console.log(error)
    }
}