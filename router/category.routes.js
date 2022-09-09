import express from 'express';
import { create, findAll } from '../controllers/category.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// GET
router.get("/all", findAll);

//POST
router.post("/create", auth, create);

export default router;