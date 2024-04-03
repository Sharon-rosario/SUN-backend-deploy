const express = require('express');
const {
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceipt,
  deleteReceipt,
  getReceiptByAssignmentId,
  updateReceiptByAssignmentId,
  deleteReceiptByAssignmentId
} = require('../../controllers/NurseFormsControllers/RecieptOfNoticeController'); // Adjust the path as necessary

const router = express.Router();

// Route to create a new Privacy Practices Receipt
router.post('/', createReceipt);

// Route to get all Privacy Practices Receipts
router.get('/', getAllReceipts);

// Route to get a Privacy Practices Receipt by its ID
router.get('/:id', getReceiptById);

// Route to update a Privacy Practices Receipt by its ID
router.put('/:id', updateReceipt);

// Route to delete a Privacy Practices Receipt by its ID
router.delete('/:id', deleteReceipt);

// Route to get a Privacy Practices Receipt by Assignment ID
router.get('/assignment/:assignmentId', getReceiptByAssignmentId);

// Route to update a Privacy Practices Receipt by Assignment ID
router.put('/assignment/:assignmentId', updateReceiptByAssignmentId);

// Route to delete a Privacy Practices Receipt by Assignment ID
router.delete('/assignment/:assignmentId', deleteReceiptByAssignmentId);

module.exports = router;
