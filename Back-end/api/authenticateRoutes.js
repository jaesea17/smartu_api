const express = require('express');
const verify = require('../../verifyToken');
const router = express.Router();


router.get('/authenticate', verify, async (req, res) => {
    let customerId = req.user.id;
    res.send(customerId);
});

module.exports = router;