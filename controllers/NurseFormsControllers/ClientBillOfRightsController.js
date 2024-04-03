const asyncHandler = require("express-async-handler");
const ClientBillOfRights = require("../../models/NurseFormsModels/ClientBillOfRightsModel");
const formatDate = require("../../utils/formatDate");

// Create Client Bill Of Rights
const createBillOfRights = asyncHandler(async (req, res) => {
  try {
    // const { assignmentId, signature, dateSigned } = req.body;

    const formattedBody = { ...req.body };
    ['dateSigned'].forEach(field => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });

    const billOfRights = new ClientBillOfRights(formattedBody);

    const createdBillOfRights = await billOfRights.save();
    res.status(201).json(createdBillOfRights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Client Bills Of Rights
const getAllBillsOfRights = asyncHandler(async (req, res) => {
  try {
    const billsOfRights = await ClientBillOfRights.find({});
    res.status(200).json(billsOfRights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Client Bill Of Rights by ID
const getBillOfRightsById = asyncHandler(async (req, res) => {
  try {
    const billOfRights = await ClientBillOfRights.findById(req.params.id);

    if (billOfRights) {
      res.status(200).json(billOfRights);
    } else {
      res.status(404).json({ message: "Bill of Rights not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Client Bill Of Rights
const updateBillOfRights = asyncHandler(async (req, res) => {
  try {
    const billOfRights = await ClientBillOfRights.findById(req.params.id);

    if (billOfRights) {
      billOfRights.signature = req.body.signature || billOfRights.signature;
      billOfRights.dateSigned = req.body.dateSigned || billOfRights.dateSigned;

      const updatedBillOfRights = await billOfRights.save();
      res.status(200).json(updatedBillOfRights);
    } else {
      res.status(404).json({ message: "Bill of Rights not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Client Bill Of Rights
const deleteBillOfRights = asyncHandler(async (req, res) => {
  try {
    const billOfRights = await ClientBillOfRights.findById(req.params.id);

    if (billOfRights) {
      // await billOfRights.remove();
      await billOfRights.deleteOne({_id: req.params.id});
      res.status(200).json({ message: "Bill of Rights removed" });
    } else {
      res.status(404).json({ message: "Bill of Rights not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Client Bill Of Rights by assignmentId
const getBillOfRightsByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const billOfRights = await ClientBillOfRights.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (billOfRights) {
      res.status(200).json(billOfRights);
    } else {
      res.status(404).json({
        message: "Bill of Rights with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Client Bill Of Rights by assignmentId
const updateBillOfRightsByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const assignmentId  = req.params.assignmentId;

    const billOfRights = await ClientBillOfRights.findOne({ assignmentId });

    if (!billOfRights) {
      res.status(404);
      throw new Error('Bill of Rights not found for this assignment id');
    }

    const updatedBillOfRights = await ClientBillOfRights.findOneAndUpdate(
      { assignmentId },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedBillOfRights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Client Bill Of Rights by assignmentId
const deleteBillOfRightsByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const billOfRights = await ClientBillOfRights.findOneAndDelete({
      assignmentId: req.params.assignmentId,
    });

    if (billOfRights) {
      res.status(200).json({ message: "Bill of Rights with given assignmentId removed" });
    } else {
      res.status(404).json({
        message: "Bill of Rights with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createBillOfRights,
  getAllBillsOfRights,
  getBillOfRightsById,
  updateBillOfRights,
  deleteBillOfRights,
  getBillOfRightsByAssignmentId,
  updateBillOfRightsByAssignmentId,
  deleteBillOfRightsByAssignmentId,
};
