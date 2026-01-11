import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo'; 
const app = express()

// Middleware
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const store = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    collectionName: 'sessions'
})

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,   
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 100, 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'  
  }
}));

//session middlewarre 
app.use((req, res, next) => {
  if (!req.session.initialized) {
    req.session.initialized = true;
    req.session.createdAt = new Date()
  }
  req.session.lastAccessed = new Date()
  next()
})

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - SessionID: ${req.sessionID || 'none'}`);
  next();
});

// Database
import connectDB from './config/db.js'
connectDB()

// Routes
import mainRoutes from './routes/main.js'
import shorteningRoutes from './routes/shortening.js'
import urlRoutes from './routes/urlRoutes.js'


// Routes Implementation
app.use("/", mainRoutes)
app.use('/shorten', shorteningRoutes)
app.use('/:shortCode', urlRoutes)

app.listen(process.env.PORT || 5050, () => {
    console.log(`Server is running at port ${process.env.PORT || 5050}`)
}) 