const mongoose = require('mongoose');
const nanoid = require('nanoid');
const ShortUrl = require('../../src/models/short');

const urlOneID = new mongoose.Types.ObjectId();
const urlOne = {
    _id: urlOneID,
    full: "http://igg-games.com",
    slug: 'vh_Hti'
};
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_TEST_URI, {
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

const setupDatabase = async () => {
    await ShortUrl.deleteMany();
    await new ShortUrl(urlOne).save();
};

module.exports = {
    connectDB,
    urlOne,
    setupDatabase
};