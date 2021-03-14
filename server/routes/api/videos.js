const express = require('express');
const router = express.Router();
const Video = require('../../models/Video');
const Tag = require('../../models/Tag');
const authMiddleware = require('../../middleware/auth');
const fs = require('fs');
const path = require('path');
const { check, validationResult } = require('express-validator');

// Set up multer for storing uploaded files
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });


// @route   POST api/videos
// @desc    Create a video
// @access  Private
router.post('/', [authMiddleware, upload.single('bannerImage'), [
    check('title', 'Title is required').notEmpty(),
    check('desc', 'Video description is required').notEmpty(),
    check('link', 'Video link is required').notEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let { title, desc, link, speakers, tags } = req.body;
    const uploadedImage = req.file;
    if (!uploadedImage) {
        return res.status(400).json({ errors: [{ msg: "Video banner image is required", param: "bannerImage" }] })
    }

    try {
        //Save the tags entered to tags collection if they're already not present
        if(tags) {
            if(typeof tags === "string") {
                tags = tags.split(",")
            }
            tags.forEach(async (tag) => {
                let isTag = await Tag.findOne({ name: tag })
                if (!isTag) {
                    await Tag.create({ name: tag })
                }
            })
        }

        //Add video to database
        if(speakers && typeof speakers === "string") {
            speakers = speakers.split(",")
        }

        const video = new Video({
            title,
            desc,
            bannerImage: {
                data: fs.readFileSync(path.join(__dirname, '../../' + 'uploads/' + req.file.filename)),
                contentType: 'image/png'
            },
            link,
            speakers,
            tags
        })

        await video.save();
        res.send(video);
    } catch (err) {
        console.log('error saving video', err)
        res.status(500).send('Server Error')
    }
})


// @route   GET api/videos
// @desc    Get all videos and with queries
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        let tags = req.query.tags;
        let speakers = req.query.speakers;
        let videos = [];

        if(!speakers && !tags) {
            videos = await Video.find()
            .populate('speakers');
        } else if(tags) {
            //Query for videos with given tags
            tags = tags.split(',');
            videos = await Video.find({
                tags: { "$in": tags }
            })
            .populate('speakers')
        } else if(speakers) {
            //Query for videos with given speakers
            speakers = speakers.split(',');
            videos = await Video.find({
                speakers: { "$in": speakers }
            })
            .populate('speakers')
        }
        res.json(videos)
    } catch (err) {
        console.log('error fetching videos', err)
        res.status(500).send('Server Error')
    }
})


// @route   GET api/videos/:id
// @desc    Get video by id
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('speakers');

        if (!video) {
            return res.status(400).json({ msg: 'Video not found' })
        }

        res.json(video)
    } catch (err) {
        console.log('error fetching video', err)
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Video not found' })
        }

        res.status(500).send('Server Error')
    }
})


// @route   GET api/videos/:id
// @desc    Update video by id
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        let video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(400).json({ msg: 'Video not found' })
        }

        const { title, desc, speakers, tags, link } = req.body;
        let change = {}
        if (title) change.title = title;
        if (desc) change.desc = title;
        if (speakers) change.speakers = speakers.split(",");
        if (tags) change.tags = tags.split(",");
        if (link) change.link = link;

        //Update
        let newVideo = await Video.findByIdAndUpdate(req.params.id, change, { new: true })

        res.json(newVideo)
    } catch (err) {
        console.log('error fetching video', err)
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Video not found' })
        }

        res.status(500).send('Server Error')
    }
})


// @route   DELETE api/videos/:id
// @desc    Delete a video
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(400).json({ msg: 'Video not found' })
        }

        await video.remove()

        res.json({ msg: 'Video removed' })
    } catch (err) {
        console.log('error fetching video', err)
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Video not found' })
        }

        res.status(500).send('Server Error')
    }
})

module.exports = router;
