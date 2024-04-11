const express = require('express');
const router = express.Router();
const { createForm, getAllForms, addImage, getFormById,getIncidentHHAImage, getFormByAssignmentId, updateFormById, deleteFormById, deleteFormByAssignmentId } = require('../../controllers/CommonFormsController/IncidentHHAController');
const { upload, errorHandler } = require('../../utils/uploadMiddleware');

router.post('/image/:assignmentId', upload.single('diagramIndicatingInjury'), addImage, errorHandler);
router.post('/', createForm);

router.get('/', getAllForms);
router.get('/assignmentId/:id', getFormByAssignmentId);
router.get('/:id', getFormById);

router.put('/:id', updateFormById);

router.delete('/assignment/:assignmentId', deleteFormByAssignmentId);
router.delete('/:id', deleteFormById);

router.get('/image/:imagePath', getIncidentHHAImage);

module.exports = router;