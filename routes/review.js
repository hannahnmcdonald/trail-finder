const express = require('express');
const router = express.Router();

// @route GET api/reviews
// @desc: Test
// @access Public
router.get('/', (req,res) => res.send('Reviews Route'));

module.exports = router;