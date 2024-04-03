const express = require('express');
const {
  createPatientPrioritization,
  getAllPatientPrioritizations,
  getPatientPrioritizationById,
  updatePatientPrioritization,
  deletePatientPrioritization,
  getPatientPrioritizationByAssignmentId,
  updatePatientPrioritizationByAssignmentId,
  deletePatientPrioritizationByAssignmentId
} = require('../../controllers/NurseFormsControllers/PatientPrioritizationController');

const router = express.Router();

// Define the routes for Patient Prioritization
router.post('/', createPatientPrioritization);
router.get('/', getAllPatientPrioritizations);
router.get('/:id', getPatientPrioritizationById);
router.put('/:id', updatePatientPrioritization);
router.delete('/:id', deletePatientPrioritization);
router.get('/assignment/:assignmentId', getPatientPrioritizationByAssignmentId);
router.put('/assignment/:assignmentId', updatePatientPrioritizationByAssignmentId);
router.delete('/assignment/:assignmentId', deletePatientPrioritizationByAssignmentId);

module.exports = router;
