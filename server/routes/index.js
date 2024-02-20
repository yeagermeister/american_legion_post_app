const router = require('express').Router();
const apiRoutes = require('./api');
const express = require('express');
const path = require('path');

router.use('/api', apiRoutes);

// Serve static files from the /public/images directory
router.use('/images', express.static(path.join(__dirname, 'images')));

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
