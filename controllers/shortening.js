import normalizeUrl from 'normalize-url';
import Url from '../models/urls.js';
import Counter from '../models/counters.js';
import base62 from 'base62'



async function updateOrCreateeCounter() {
    let doc = await Counter.findOne()
    return doc
}

export const shortenUrl = async (req, res) => {
    try {
        const originalUrl = normalizeUrl(req.body.originalUrl);
        console.log("Original URL:", originalUrl);
        let counter;
        let encodedString

        const singleTon = await updateOrCreateeCounter();
        console.log("Counter Document:", singleTon);
        if(singleTon) {
            singleTon.counter += process.env.INCREMENT_BY 
            await singleTon.save()
            counter = singleTon.counter
            encodedString = base62.encode(counter);
            console.log("Counter Updated to:", singleTon.counter);
        } else {
            const newCounter = new Counter({ 
                name: 'url_counter', 
                counter: (parseInt(process.env.DEFAULT_COUNTER) + parseInt(process.env.INCREMENT_BY))
            });
            await newCounter.save()
            counter = newCounter.counter
            encodedString = base62.encode(counter);
            console.log("Counter Created with value:", newCounter.counter);
        }

        console.log("Encoded String:", encodedString);
        const newURLdocument = new Url({
            originalUrl: originalUrl,
            shortCode: encodedString
        })
        await newURLdocument.save()
        console.log("New URL Document Saved:", newURLdocument);

    } catch (error) {
        console.error(error);
    }
};
     