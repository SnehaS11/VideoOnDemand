const express = require('express');
const router = express.Router();
const Speaker = require('../../models/Speaker');
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

// @route   POST api/speakers
// @desc    Create a speaker
// @access  Private
router.post('/', [authMiddleware, upload.single('image'), [
    check('name', 'Name is required').notEmpty(),
    check('qualification', 'Qualification is required').notEmpty(),
    check('institute', 'Institute is required').notEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, qualification, institute } = req.body;
    const uploadedImage = req.file;
    if(!uploadedImage) {
        return res.status(400).json({ errors: [{ msg: "Image is required", param: "image" }]})
    }

    try {
        const speaker = new Speaker({
            name,
            image: {
                data: fs.readFileSync(path.join(__dirname, '../../' + 'uploads/' + req.file.filename)),
                contentType: 'image/png'
            },
            qualification,
            institute
        })

        await speaker.save();
        res.send(speaker)
    } catch(err) {
        console.log('error saving speaker', err)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/speakers
// @desc    Get all speakers
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        const speakers = await Speaker.find();
        res.json(speakers)
    } catch(err) {
        console.log('error fetching speakers', err)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/speakers/:id
// @desc    Get speaker by id
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const speaker = await Speaker.findById(req.params.id);

        if(!speaker) {
            return res.status(400).json({ msg: 'Speaker not found' })
        }

        res.json(speaker)
    } catch(err) {
        console.log('error fetching speaker', err)
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Speaker not found' })
        }

        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/speakers/:id
// @desc    Delete a speaker
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const speaker = await Speaker.findById(req.params.id);

        if(!speaker) {
            return res.status(400).json({ msg: 'Speaker not found' })
        }

        await speaker.remove()

        res.json({ msg: 'Speaker removed' })
    } catch(err) {
        console.log('error fetching speaker', err)
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Speaker not found' })
        }

        res.status(500).send('Server Error')
    }
})

module.exports = router;
