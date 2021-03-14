const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    bannerImage: {
        data: Buffer,
        contentType: String
    },
    desc: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    speakers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'speaker'
        }
    ],
    tags: [ String ],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Video = mongoose.model('video', VideoSchema);
