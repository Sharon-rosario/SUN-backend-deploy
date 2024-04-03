const express = require('express');
const router = express.Router();
const {
  createTimeSheet,
  getAllTimeSheets,
  getTimeSheetById,
  updateTimeSheet,
  deleteTimeSheet
} = require('../../controllers/CommonFormsController/DailyTimeSheetHHAController');

// Route to create a new time sheet
router.post('/', createTimeSheet);

// Route to get all time sheets
router.get('/', getAllTimeSheets);

// Route to get a single time sheet by ID
router.get('/:id', getTimeSheetById);

// Route to update a time sheet by ID
router.put('/:id', updateTimeSheet);

// Route to delete a time sheet by ID
router.delete('/:id', deleteTimeSheet);

module.exports = router;
