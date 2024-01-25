const { Schema, model } = require('mongoose');
const { formatDate } = require('../helpers/helpers');

const newsSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        summary: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        pic1: {
            type: String,
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

const News = model('News', newsSchema);

module.exports = News;