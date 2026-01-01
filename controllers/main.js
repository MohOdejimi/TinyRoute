import Urls from '../models/urls.js';

export async function getIndex(req, res) {
    try {
        const sessionId = req.sessionID;
        const urls = await Urls.find({ sessionId });
        if(!urls) {
            res.render('index.ejs', {
                user: req.user || null,
                shortUrls: null
            })
        } else {
            res.render('index.ejs', {
                user: req.user || null,
                shortUrls: urls
            })
        }
     } catch (error) {
        res.status(500).send('Server Error');
    }
}
