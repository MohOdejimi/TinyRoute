import normalizeUrl from 'normalize-url';

export const shortenUrl = async (req, res) => {
    try {
        const originalUrl = normalizeUrl(req.body.originalUrl);
        console.log("Original URL:", originalUrl);
        // Logic to generate short URL goes here
        r
        const shortUrl = "http://short.ly/abc123"; // Placeholder
    } catch (error) {
        console.error(error);
    }
};
     