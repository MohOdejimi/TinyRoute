import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING)
        console.log('MongoDB connected:', conn.connection.host)
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1)
    }
}

export default connectDB