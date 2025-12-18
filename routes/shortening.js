import express from 'express';
const router =  express.Router()
import { shortenUrl } from '../controllers/shortening.js';

router.post('/', shortenUrl)

export default router;