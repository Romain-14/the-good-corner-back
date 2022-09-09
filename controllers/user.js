import { v4 as uuidv4 } from 'uuid';
import {hash, compare} from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
const {TOKEN_SECRET} = process.env;

import Query from '../models/Query.js';

export const findAll = async (req, res, next) => {
    try {
        const query = "SELECT * FROM user";
        const users = await Query.getAllDatas(query);

        res.status(200).json({
            msg: "all users retrieved",
            result: users,
        });
        return;
    } catch (error) {
        return next(error);
    }
}

export const findOne = async (req, res, next) => {
    try {
        const query = "SELECT alias, uuid FROM user WHERE uuid = ?";
        const user = await Query.getDataByValue(query, req.params.uuid);

        res.status(200).json({
            msg: "user retrieved",
            result: user[0],
        });
        return;
    } catch (error) {
        return next(error);
    }
}

export const create = async (req, res, next) => {
    try {
        const datas ={
            alias: req.body.alias,
            password: await hash(req.body.password, saltRounds),
            uuid: uuidv4(),
        }
        const query1 = "SELECT * FROM user WHERE alias = ?";
        const user = await Query.getDataByValue(query1, req.body.alias)
        if(user.length){
            res.status(409).json({
                msg: 'user already existing',
            });
            return;
        }
        const query2 = "INSERT INTO user (alias, password, uuid) VALUES (?,?,?)";
        await Query.save(query2, datas);
        res.status(201).json({
            msg: "user created",
        })
        
    } catch (error) {
        return next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const {alias, password} = req.body;
        const query1 = "SELECT * FROM user WHERE alias = ?";
        const [user] = await Query.getDataByValue(query1, alias);
        if(!user || (user.alias !== req.body.alias)){
            res.status(404).json({
                msg: "user does not exist",
            });
            return;
        } 
        const isSame = await compare(password, user.password);        
        if(isSame){
            // signature du token, 2 arguments :
            // - le 1er le payload: qui est ici un objet qui permettra de transporter dans le token des données qu'on pourrait utiliser plus tard lors du décodage dans le middleware Auth
            // - le 2eme qui est le secret importé des variables d'environnement (ATTENTION ce secret doit ABSOLUMENT être dans ce fichier ou si déployé sur un cloud, doit se trouver dans les config vars d'heroku par exemple, avec ces copains variables des infos de la BDD !)
            const TOKEN = jwt.sign({uuid: user.uuid}, TOKEN_SECRET );
            res.status(200).json({
                msg: "all infos are correct",
                token: TOKEN,
                uuid: user.uuid,
            });
            return;
        } else {
            res.status(401).json({msg: "bad password"});
            return;            
        }
        
    } catch (error) {        
        return next(error);
    }
}

// mise à jour de tous ou quelques information ave la méthode patch
// cette fonction peut être adapté en fonction du design de votre composant de mise à jour de votre "front"
export const update = async (req,res,next) => {
    try {
        const query = "SELECT * FROM user WHERE uuid = ?";        
        const [user] = await Query.getDataByValue(query, req.params.uuid);
        const datas = {
            alias: !req.body.alias ? user.alias : req.body.alias,
            city: !req.body.city ? user.city : req.body.city,
            uuid: req.params.uuid
        }
        const query2 = "UPDATE user SET alias = ?, city = ? WHERE uuid = ?";
        await Query.save(query2, datas);
        res.status(200).json({
            msg: "User updated",
        });
        return;
    } catch (error) {
        return next(error)
    }
}

export const remove = async (req,res,next) => {
    try {
        const query = "DELETE FROM user WHERE uuid = ?";
        await Query.remove(query, datas);
        res.status(200).json({
            msg: "user deleted",
        });
        return;
    } catch (error) {
        return next(error)
    }
}