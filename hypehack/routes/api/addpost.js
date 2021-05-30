
const { json } = require('express');
const express = require ('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const { post } = require('request');
const auth = require('../../middleware/auth');
const Post = require('../../models/Addpost');
const Profile = require('../../models/Profile');
const Learner = require('../../models/Learner');

// @route   POST api/addpost
// @desc    Create a post
// @access  Private

router.post('/',
    [
        auth, 
        [
            check('post', 'Text is required')
            .not()
            .isEmpty()
        ]
    ], 
    
    async (req, res) => {
        const errors = validationResult(req);
        console.log('i am here');
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        
        try {
            console.log('i am here too');
            const user = await Learner.findById(req.user.id).select('-password');
            console.log('i am here too');
            const newPost =  new Post({
                post: req.body.post,
                location: req.body.location,
                about_company: req.body.about_company,
                responsibility: req.body.responsibility,
                requirements: req.body.requirements,
                user: req.user.id

            });

            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    }
);


// @route   GET api/addpost
// @desc    Get all projects
// @access  Private

router.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


module.exports = router;