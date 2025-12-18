import express from 'express';
import { getIndex } from '../controllers/main.js';
import { ensureAuth } from '../middleware/auth.js';
import { ensureGuest } from '../middleware/ensureGuest.js';

const router = express.Router() 

router.get("/", getIndex)


export default router;