const express = require('express');
const router = express.Router();
const { createForm, getAllForms, getFormById, getFormByAssignmentId, updateFormById, deleteFormById } = require('../../controllers/CommonFormsController/IncidentHHAController');
const { upload, errorHandler } = require('../../utils/uploadMiddleware');

router.post('/', upload.single('diagramIndicatingInjury'), createForm, errorHandler);
router.get('/', getAllForms);
router.get('/assignmentId/:id', getFormByAssignmentId);
router.get('/:id', getFormById);
router.put('/:id', updateFormById);
router.delete('/:id', deleteFormById);

module.exports = router;