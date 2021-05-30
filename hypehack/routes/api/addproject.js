const { json } = require('express');
const express = require ('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const { post } = require('request');
const auth = require('../../middleware/auth');
const Projectt = require('../../models/Addproject');
const Profile = require('../../models/Profile');
const Learner = require('../../models/Learner');

// @route   POST api/addproject
// @desc    Create a project
// @access  Private

router.post('/',
    [
        auth, 
        [
            check('project_name', 'Text is required')
            .not()
            .isEmpty()
        ]
    ], 
    
    async (req, res) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        
        try {
            const user = await Learner.findById(req.user.id).select('-password');
            const newPost =  new Projectt({
                project_name: req.body.project_name,
                tech_skill: req.body.tech_skill,
                project_description: req.body.project_description,
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


// @route   GET api/addproject
// @desc    Get all projects
// @access  Private

router.get('/', auth, async(req, res) => {
    try {
        const posts = await Projectt.find();
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;