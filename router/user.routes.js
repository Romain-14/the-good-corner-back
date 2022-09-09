import express from 'express'
import { findAll, findOne, create, signin, update, remove } from '../controllers/user.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();

router.get("/checktoken", auth, findOne)

router.get("/all", findAll);
router.get("/:uuid", findOne);

router.post("/create", create);
router.post("/signin", signin);

// mise à jour des données 
router.patch("/:uuid", update);

router.delete("/:uuid", remove)

export default router;