const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    }
});

const shortUrl = mongoose.model('shortUrl', shortUrlSchema);

module.exports = shortUrl;