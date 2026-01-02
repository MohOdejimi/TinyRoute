import Url from '../models/urls.js';

export const redirectToOriginalUrl = async (req, res) => {
    try {
        const shortCode = req.baseUrl.replace('/', '');
        console.log(req.baseUrl);
        console.log("Short Code:", shortCode);
        const originalUrlEntry =  await Url.findOne({ shortCode });
        if (originalUrlEntry) {
            res.redirect(originalUrlEntry.originalUrl);
        } else {
            return res.status(404).render('error', { 
                shortCode,
                errorType: '404',
                errorTitle: '404 Not Found',
                errorMessage: 'This TinyRoute link does not exist.'
            });
        }
    } catch (error) {
        res.status(500).render('error', {
        shortCode: req.params.shortCode,
        errorType: '500',
        errorTitle: 'Server Error',
        errorMessage: 'Something went wrong. Please try again later.'
    });
  }
}