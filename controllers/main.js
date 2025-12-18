export function getIndex(req, res) {
    res.render('index.ejs', {
        user: req.user || null,
        shortUrl: null
    })
}
