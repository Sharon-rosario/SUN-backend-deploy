const express = require('express');
const router = express.Router();
const {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getScheduleByAssignmentId,
} = require('../../controllers/CommonFormsController/ScheduleHHAController'); // Adjust the path according to your project structure

router.get("/assignment/:id", getScheduleByAssignmentId)
// Route to create a new PCA schedule
router.post('/', createSchedule);

// Route to get all PCA schedules
router.get('/', getAllSchedules);

// Route to get a single PCA schedule by ID
router.get('/:id', getScheduleById);

// Route to update a PCA schedule by ID
router.put('/:id', updateSchedule);

// Route to delete a PCA schedule by ID
router.delete('/:id', deleteSchedule);

// Route to get form data based on patientId

module.exports = router;
