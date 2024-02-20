const router = require('express').Router();
const {
  getSingleCalendar,
  createCalendar,
  updateCalendar,
  deleteCalendar,
  getAllCalendars
} = require('../../controllers/calendarController');

// /api/calendar
router.route('/')
.get(getAllCalendars)
.post(createCalendar);

// /api/calendar/:calendarId
router
  .route('/:calendarId')
  .get(getSingleCalendar)
  .put(updateCalendar)
  .delete(deleteCalendar);

  module.exports = router;