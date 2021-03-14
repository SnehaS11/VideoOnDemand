const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth')
const Tag = require('../../models/Tag')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User');

// @route   GET api/tags
// @desc    Get all tags
// @access  Public
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags)

    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST api/tags
// @desc    Create a tag
// @access  Public
router.post('/', [ authMiddleware, [
    check('name', 'Name is required').notEmpty()
] ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name } = req.body;
        let tag = new Tag({
            name
        })
        tag = await tag.save()
        res.json(tag)

    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/tags
// @desc    Delete a tag
// @access  Public
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if(!tag) {
            return res.status(400).send("Invalid tag")
        }
        tag.remove();
        return res.send("Tag removed")

    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router;
