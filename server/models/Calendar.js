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
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    }
);

const Calendar = model('Calendar', calendarSchema);

module.exports = Calendar;

