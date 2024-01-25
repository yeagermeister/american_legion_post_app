const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const { formatDate } = require('../helpers/helpers');   
const reactionSchema = require('./Reaction');

const gallerySchema = new Schema(
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
            type: String,
            required: true,
        },
        pics: {
            type: Array,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);
reactionSchema
    .path('createdAt')
    .get(function (value) {
        return formatDate(value);
    });

const Gallery = model('Gallery', gallerySchema);

module.exports = Gallery;