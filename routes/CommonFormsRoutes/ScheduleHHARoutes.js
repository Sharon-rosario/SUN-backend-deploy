const express = require('express');
const router = express.Router();
const {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getScheduleByAssignmentId,
  deleteFormByAssignmentId
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

// Route to delete form based on assignment ID
router.delete('/assignment/:assignmentId', deleteFormByAssignmentId);

// error handler indicating if we hit a non existant api
router.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

module.exports = router;
