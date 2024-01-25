const { News } = require('../models');
const { trimId } = require('../helpers/helpers');

module.exports = {
    //Get All News
    getNews(req, res) {
        News.find()
            .then(async (news) => {
                const newsObj = {
                    news
                };
                return res.json(newsObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //Get a Single Article
    getSingleNews(req, res) {
        News.findOne({ _id: req.params.newsId })
            .lean()
            .then(async (news) =>
                !news
                    ? res.status(404).json({ message: 'No news with that ID' })
                    : res.json({
                        news
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //Create an Article
    createNews(req, res) {
        News.create(req.body)
            .then((news) => res.json(news))
            .catch((err) => res.status(500).json(err));
    },
    //Delete an Article
    deleteNews(req, res) {
        News.findOneAndRemove({ _id: req.params.newsId })
            .then((news) =>
                res.json(news))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //Update an Article
    updateNews(req, res) {
        News.findOneAndUpdate({ _id: req.params.newsId }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((news) =>
                !news
                    ? res.status(404).json({ message: 'No such news exists' })
                    : res.json(news)
            )
            .catch((err) => res.status(500).json(err));
    },

};