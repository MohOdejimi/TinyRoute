import mongoose from 'mongoose'

const counterSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    currentCount : {
        type: Number,
        required: true,
        default: 1024
    }
})

const Counter = mongoose.model('Counter', counterSchema)


export default Counter