const router = require('express').Router();
const express = require('express');
const path = require('path');

const userRoutes = require('./users');
const membersRoutes = require('./members');
const menuRoutes = require('./menu');
const calendarRoutes = require('./calendar');
const adminRoutes = require('./admin');
const galleryRoutes = require('./gallery');
const newsRoutes = require('./news');

// Serve static files from the /public/images directory
router.use('/images', express.static(path.join(__dirname, 'public', 'images')));

router.use((req, res) => res.send('Wrong route!'));

router.use('/users', userRoutes);
router.use('/members', membersRoutes),
router.use('/menu', menuRoutes);
router.use('/calendar', calendarRoutes);
router.use('/admin', adminRoutes);
router.use('/gallery', galleryRoutes);
router.use('/news', newsRoutes);

module.exports = router;
