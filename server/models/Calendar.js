const {Schema, model} = require('mongoose');
const {formatDate} = require('../helpers/helpers');

const calendarSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
    }
);

const Calendar = model('Calendar', calendarSchema);

module.exports = Calendar;

