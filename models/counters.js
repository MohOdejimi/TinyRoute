import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import mongoose from 'mongoose'

const counterSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    counter : {
        type: Number,
        required: true,
    }
})

const Counter = mongoose.model('Counter', counterSchema)


export default Counter