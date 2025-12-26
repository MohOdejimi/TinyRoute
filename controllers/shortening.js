import normalizeUrl from 'normalize-url';
import Url from '../models/urls.js';
import Counter from '../models/counters.js';
import base62 from 'base62'

export const shortenUrl = async (req, res) => {
    try {
        const originalUrl = normalizeUrl(req.body.originalUrl);
        console.log("Original URL:", originalUrl);

        const counter = await Counter.findOneAndUpdate(
            { name: 'url_counter' },
            { $inc: { currentCount: 1024 } },
            { new: true, upsert: true }
        );

        const uniqueNumber = counter.currentCount
        const encodedString = base62.encode(uniqueNumber)

        console.log("Unique Number for Short Code:", uniqueNumber);
        console.log("Encoded Short Code:", encodedString);

        const shortUrl = "http://tinyRoute.ly/" + encodedString;
        console.log("Generated Short URL:", shortUrl);
    } catch (error) {
        console.error(error);
    }
};
     