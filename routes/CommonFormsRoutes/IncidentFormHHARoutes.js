const express = require('express');
const router = express.Router();
const { createForm, getAllForms, AddIncidentImage, getFormById,getIncidentHHAImage, getFormByAssignmentId, updateFormById, deleteFormById, deleteFormByAssignmentId } = require('../../controllers/CommonFormsController/IncidentHHAController');
const { upload, errorHandler } = require('../../utils/IncidentUploadMiddleware');

router.post('/image/:assignmentId', upload.single('diagramIndicatingInjury'), AddIncidentImage, errorHandler);
router.get('/image/:assignmentId', getIncidentHHAImage);

router.post('/', createForm);

router.get('/', getAllForms);
router.get('/assignmentId/:id', getFormByAssignmentId);
router.get('/:id', getFormById);

router.put('/:id', updateFormById);

router.delete('/assignment/:assignmentId', deleteFormByAssignmentId);
router.delete('/:id', deleteFormById);


module.exports = router;