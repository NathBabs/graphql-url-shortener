require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
//connectDB();

module.exports = connectDB;

//mongodb+srv://taskapp:G6RedGLyRB8E7yi@cluster0-hv6k0.azure.mongodb.net/storybooks
//mongodb+srv://nathaniel:juventus@cluster0.hv6k0.azure.mongodb.net/url-shortener?retryWrites=true&w=majority