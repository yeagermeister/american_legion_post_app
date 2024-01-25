const router = require('express').Router();

const {
    getNews,
    getSingleNews,
    createNews,
    updateNews,
    deleteNews,
} = require('../../controllers/newsController');

// /api/news
router.route('/').get(getNews).post(createNews);

// /api/news/newsId
router.route('/:newsId')
.get(getSingleNews)
.delete(deleteNews)
.put(updateNews);

module.exports = router;