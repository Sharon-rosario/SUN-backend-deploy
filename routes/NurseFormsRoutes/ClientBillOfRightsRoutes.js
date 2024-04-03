const express = require('express');
const {
  createBillOfRights,
  getAllBillsOfRights,
  getBillOfRightsById,
  updateBillOfRights,
  deleteBillOfRights,
  getBillOfRightsByAssignmentId,
  updateBillOfRightsByAssignmentId,
  deleteBillOfRightsByAssignmentId
} = require('../../controllers/NurseFormsControllers/ClientBillOfRightsController'); // Adjust the path as necessary

const router = express.Router();

// Route to create a new Client Bill of Rights record
router.post('/', createBillOfRights);

// Route to get all Client Bill of Rights records
router.get('/', getAllBillsOfRights);

// Route to get a single Client Bill of Rights record by ID
router.get('/:id', getBillOfRightsById);

// Route to update a Client Bill of Rights record by ID
router.put('/:id', updateBillOfRights);

// Route to delete a Client Bill of Rights record by ID
router.delete('/:id', deleteBillOfRights);

// Route to get a Client Bill of Rights record by assignmentId
router.get('/assignment/:assignmentId', getBillOfRightsByAssignmentId);

// Route to update a Client Bill of Rights record by assignmentId
router.put('/assignment/:assignmentId', updateBillOfRightsByAssignmentId);

// Route to delete a Client Bill of Rights record by assignmentId
router.delete('/assignment/:assignmentId', deleteBillOfRightsByAssignmentId);

module.exports = router;
