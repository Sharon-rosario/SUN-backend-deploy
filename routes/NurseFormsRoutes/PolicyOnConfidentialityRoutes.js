const express = require('express');
const {
  createPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
  getPolicyByAssignmentId,
  updatePolicyByAssignmentId,
  deletePolicyByAssignmentId,
} = require('../../controllers/NurseFormsControllers/PolicyOnConfidentialityController'); // Adjust the path as necessary

const router = express.Router();

// Routes for PolicyOnConfidentiality
router.post('/', createPolicy);
router.get('/', getAllPolicies);
router.get('/:id', getPolicyById);
router.put('/:id', updatePolicy);
router.delete('/:id', deletePolicy);

// Routes for handling operations based on assignmentId
router.get('/assignment/:assignmentId', getPolicyByAssignmentId);
router.put('/assignment/:assignmentId', updatePolicyByAssignmentId);
router.delete('/assignment/:assignmentId', deletePolicyByAssignmentId);

module.exports = router;
