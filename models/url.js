const { Schema, model } = require("mongoose");

const urlSchema = new Schema({
    count: {
        type: Number,
        default: 0
    },
    urlCode: {
        type: String
    },
    shortUrl: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toString()
    }
});

module.exports = model("Url", urlSchema);
