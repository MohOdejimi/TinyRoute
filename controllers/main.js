import Urls from '../models/urls.js';

export async function getIndex(req, res) {
    try {
        const sessionId = req.sessionID;
        const urls = await Urls.find({ sessionId })
            .sort({ createdAt: -1 })
            .limit(50)
            .lean();
 
        res.render('index.ejs', {
            user: req.user || null,
            shortUrls: urls, 
            req: req 
        });

     } catch (error) {
        console.error('Error fetching URLs:', error);
        
        res.status(500).render('index.ejs', {
            user: req.user || null,
            shortUrls: [],
            req: req,
            error: 'Failed to load your URLs'
        });
    }
}
