import normalizeUrl from 'normalize-url';
import { customAlphabet } from 'nanoid';
import Url from '../models/urls.js';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7);

export const shortenUrl = async (req, res) => {
    try {
        const originalUrl = normalizeUrl(req.body.originalUrl);
        let shortCode;
        let isUnique = false
        let attempts = 0 
        const MAX_ATTEMPTS = 5

        while (!isUnique && attempts < MAX_ATTEMPTS) {
            shortCode =  nanoid();
            const existing = await Url.findOne({ shortCode });
            if (!existing) {
                isUnique = true;
            } else {
                attempts++;
            }

        }

        const newUrl = new Url({
            originalUrl : originalUrl,
            shortCode: shortCode,
            sessionId: req.sessionID,
            createdAt: new Date()
        })

        await newUrl.save();
        res.status(201).redirect('/')

    } catch (error) {
        console.error(error);
    }
}   