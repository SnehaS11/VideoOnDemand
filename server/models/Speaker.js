const mongoose = require('mongoose')

const SpeakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    qualification: {
        type: String,
        required: true
    },
    institute: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Speaker = mongoose.model('speaker', SpeakerSchema);
