const express = require('express');
const router = express.Router();

// @route GET api/users
// @desc: Test
// @access Public
router.get('/', (req,res) => res.send('User Route'));

//POST
router.post('/', (req,res) => {
    console.log(req.body)
    res.send('User Route')
});

module.exports = router;