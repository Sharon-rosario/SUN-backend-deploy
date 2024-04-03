const asyncHandler = require("express-async-handler");
const PrivacyPracticesReceipt = require("../../models/NurseFormsModels/ReceiptOfNoticeModel");
const formatDate = require("../../utils/formatDate");

// Create Privacy Practices Receipt
const createReceipt = asyncHandler(async (req, res) => {
  try {
    const formattedBody = { ...req.body };
    ['dateOfAdmission','patientSignatureDate','representativeSignatureDate','clinicianSignatureDate'].forEach(field => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });

    const receipt = new PrivacyPracticesReceipt(formattedBody);

    const createdReceipt = await receipt.save();
    res.status(201).json(createdReceipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Privacy Practices Receipts
const getAllReceipts = asyncHandler(async (req, res) => {
  try {
    const receipts = await PrivacyPracticesReceipt.find({});
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Privacy Practices Receipt by ID
const getReceiptById = asyncHandler(async (req, res) => {
  try {
    const receipt = await PrivacyPracticesReceipt.findById(req.params.id);

    if (receipt) {
      res.status(200).json(receipt);
    } else {
      res.status(404).json({ message: "Receipt not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Privacy Practices Receipt
const updateReceipt = asyncHandler(async (req, res) => {
  try {
    const receipt = await PrivacyPracticesReceipt.findById(req.params.id);

    if (receipt) {
      Object.assign(receipt, req.body);

      const updatedReceipt = await receipt.save();
      res.status(200).json(updatedReceipt);
    } else {
      res.status(404).json({ message: "Receipt not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Privacy Practices Receipt
const deleteReceipt = asyncHandler(async (req, res) => {
  try {
    const receipt = await PrivacyPracticesReceipt.findById(req.params.id);
    if (receipt) {
      // await receipt.remove();
      await receipt.deleteOne({_id: req.params._id});
      res.status(200).json({ message: "Receipt removed" });
    } else {
      res.status(404).json({ message: "Receipt not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Privacy Practices Receipt by Assignment ID
const getReceiptByAssignmentId = asyncHandler(async (req, res) => {
    try {
      const receipt = await PrivacyPracticesReceipt.findOne({
        assignmentId: req.params.assignmentId,
      });
      if (receipt) {
        res.status(200).json(receipt);
      } else {
        res.status(404).json({ message: "Receipt with given assignment ID not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update Privacy Practices Receipt by Assignment ID
  const updateReceiptByAssignmentId = asyncHandler(async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const updateData = req.body;
      console.log(req.body);
  
      const updatedReceipt = await PrivacyPracticesReceipt.findOneAndUpdate(
        { assignmentId },
        updateData,
        { new: true, runValidators: true }
      );
  
      if (updatedReceipt) {
        res.status(200).json(updatedReceipt);
      } else {
        res.status(404).json({ message: "Receipt with given assignment ID not found for update" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete Privacy Practices Receipt by Assignment ID
  const deleteReceiptByAssignmentId = asyncHandler(async (req, res) => {
    try {
      const { assignmentId } = req.params;
  
      const receipt = await PrivacyPracticesReceipt.findOneAndDelete({ assignmentId });
  
      if (receipt) {
        res.status(200).json({ message: "Receipt with given assignment ID removed" });
      } else {
        res.status(404).json({ message: "Receipt with given assignment ID not found for deletion" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = {
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceipt,
  deleteReceipt,
  getReceiptByAssignmentId,
  updateReceiptByAssignmentId,
  deleteReceiptByAssignmentId
};
