const router = require('express').Router();
const userRoutes = require('./users');
const membersRoutes = require('./members');
const menuRoutes = require('./menu');
const calendarRoutes = require('./calendar');
const adminRoutes = require('./admin');
const galleryRoutes = require('./gallery');
const newsRoutes = require('./news');


router.use('/users', userRoutes);
router.use('/members', membersRoutes),
router.use('/menu', menuRoutes);
router.use('/calendar', calendarRoutes);
router.use('/admin', adminRoutes);
router.use('/gallery', galleryRoutes);
router.use('/news', newsRoutes);

module.exports = router;
