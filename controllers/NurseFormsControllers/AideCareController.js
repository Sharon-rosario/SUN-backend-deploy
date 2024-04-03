const asyncHandler = require("express-async-handler");
const AideCarePlan = require("../../models/NurseFormsModels/AideCareModel");
const formatDate = require("../../utils/formatDate");

// Create Confidential Info
const createForm = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const aidecareInfo = new AideCarePlan(req.body);
    const createdaidecareInfo = await aidecareInfo.save();
    res.status(200).json(createdaidecareInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Confidential Infos
const getAllForms = asyncHandler(async (req, res) => {
  try {
    const aidecareInfos = await AideCarePlan.find({});
    res.status(200).json(aidecareInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Confidential Info by ID
const getFormById = asyncHandler(async (req, res) => {
  const aidecareInfo = await AideCarePlan.findById(req.params.id);

  if (aidecareInfo) {
    res.status(200).json(aidecareInfo);
  } else {
    res.status(404).json({ message: "Passport supervisory info not found" });
  }
});

// Update Confidential Info
const updateForm = asyncHandler(async (req, res) => {
  try {
    const aidecareInfo = await AideCarePlan.findById(req.params.id);

    if (aidecareInfo) {
      // Update the entire homeEnvInfo object with req.body
      Object.assign(aidecareInfo, req.body);
      const aidecareInfoData = await aidecareInfo.save();
      res.status(200).json(aidecareInfoData);
    } else {
      res.status(404).json({ message: "Passport supervisory Info Data info not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Confidential Info
const deleteForm = asyncHandler(async (req, res) => {
  try {
    const aidecareInfo = await AideCarePlan.findById(req.params.id);

    if (aidecareInfo) {
      // await aidecareInfo.remove();
      await aidecareInfo.deleteOne({ _id: req.params.id });

      res.status(200).json({ message: "Passport supervisory info removed" });
    } else {
      res.status(404).json({ message: "Passport supervisory info not found" });
    }
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Confidential Info by assignmentId
const getFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const aidecareInfo = await AideCarePlan.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (aidecareInfo) {
      res.status(200).json(aidecareInfo);
    } else {
      res.status(404).json({
        message: "Passport Supervisory Info with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Confidential Info by assignmentId
const updateFormByAssignmentId = asyncHandler(async (req, res) => {
  console.log('hittt')
  try {
    const assignmentId = req.params.assignmentId;
    console.log(
      "updateFormByAssignmentId-passport supervisory api hit" , assignmentId
    );
    console.log(req.body);

    const confidentialForm = await AideCarePlan.findOne({ assignmentId });

    if (!confidentialForm) {
      res.status(404);
      throw new Error("not form found on this assignment id");
    }
    // Make sure to use the $set operator to specify the fields to update
    const updatedaidecareInfo = await AideCarePlan.findOneAndUpdate(
      { assignmentId }, // Filter by assignmentId
      req.body, // Use $set to update the document fields with req.body
      { new: true } // Return the updated document and run validators
    );
    res.status(200).json(updatedaidecareInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Confidential Info by assignmentId
const deleteFormByAssignmentId = asyncHandler(async (req, res) => {
  console.log('apihi');
  try {
    const aidecareInfo = await AideCarePlan.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (aidecareInfo) {
      await aidecareInfo.deleteOne({
        assignmentId: req.params.assignmentId,
      });
      // await aidecareInfo.remove();
      res
        .status(200)
        .json({ message: "Passport supervisory info with given assignmentId removed" });
    } else {
      res.status(404).json({
        message: "Passport supervisory info with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createForm,
  getAllForms,
  getFormByAssignmentId,
  updateFormByAssignmentId,
  deleteFormByAssignmentId,
  getFormById,
  updateForm,
  deleteForm,
};
