import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import express from 'express';
const app = express()



// Middleware
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Routes
import mainRoutes from './routes/main.js'
import shorteningRoutes from './routes/shortening.js'



// Routes Implementation
app.use("/", mainRoutes)
app.use('/shorten', shorteningRoutes)

app.listen(process.env.PORT || 5050, () => {
    console.log(`Server is running at port ${process.env.PORT || 5050}`)
}) 