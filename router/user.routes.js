import express from 'express'
import { findAll, findOne, create } from '../controllers/user.js';

const router = express.Router();

router.get("/all", findAll);
router.get("/:uuid", findOne);

router.post("/create", create)

export default router;