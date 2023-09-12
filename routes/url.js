//Routes for handling requests 

const express = require('express');
const router = express.Router();
const {handleShortUrl,handleGetAnalytics} = require('../controllers/url')

router.post("/", handleShortUrl);

router.get("/analytics/:shortUrl", handleGetAnalytics);

module.exports = router;