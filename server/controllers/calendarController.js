const { Calendar } = require('../models');
const { trimId } = require('../helpers/helpers');

module.exports = {
    // Get all calendars
    getAllCalendars(req, res) {
        console.log('getAllCalendars');
        Calendar.find()
            .then(async (calendar) => {
                const calendarObj = {
                    calendar
                };
                return res.json(calendarObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //Get a single calendar 
    getSingleCalendar(req, res) {
        Calendar.findOne({ _id: req.params.calendarId })
            .lean()
            .then(async (calendar) =>
                !calendar
                    ? res.status(404).json({ message: 'No calendar with that ID' })
                    : res.json({
                        calendar
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new calendar
    createCalendar(req, res) {
        Calendar.create(req.body)
            .then((calendar) => res.json(calendar))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a calendar
    deleteCalendar(req, res) {
        Calendar.findOneAndRemove({ _id: req.params.calendarId })
            .then((calendar) =>{
                return res.json(calendar);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //Update the text of a calendar
    updateCalendar(req, res) {
        Calendar.findOneAndUpdate({ _id: req.params.calendarId }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((calendar) =>
                !calendar
                    ? res.status(404).json({ message: 'No such calendar exists' })
                    : res.json(calendar)
            )
            .catch((err) => res.status(500).json(err));
    },
};
