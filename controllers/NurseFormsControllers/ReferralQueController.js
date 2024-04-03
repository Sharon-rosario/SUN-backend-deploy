const asyncHandler = require("express-async-handler");
const ReferralQuestionnaire = require("../../models/NurseFormsModels/referralQueModel.js");
const formatDate = require("../../utils/formatDate.js");

// Create referral Quetioannaire Info
const createForm = asyncHandler(async (req, res) => {
  try {
    const formattedBody = { ...req.body };
    ["referralDate", "dob"].forEach((field) => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });
    const referralFormInfo = new ReferralQuestionnaire(formattedBody);

    // const referralFormInfo = new ReferralQuestionnaire(req.body);
    const createdreferralFormInfo = await referralFormInfo.save();
    res.status(200).json(createdreferralFormInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All referral Quetioannaire Infos
const getAllForms = asyncHandler(async (req, res) => {
  try {
    const referralFormInfos = await ReferralQuestionnaire.find({});
    res.status(200).json(referralFormInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get referral Quetioannaire Info by ID
const getFormById = asyncHandler(async (req, res) => {
  const referralFormInfo = await ReferralQuestionnaire.findById(req.params.id);

  if (referralFormInfo) {
    res.status(200).json(referralFormInfo);
  } else {
    res.status(404).json({ message: "referral Quetioannaire info not found" });
  }
});

// Update referral Quetioannaire Info
const updateForm = asyncHandler(async (req, res) => {
  try {
    const patientEmergencyInfo = await ReferralQuestionnaire.findById(req.params.id);
    if (patientEmergencyInfo) {
      // Update the entire patientEmergencyInfo object with req.body
      Object.assign(patientEmergencyInfo, req.body);
      const updatedPatientEmergencyFormData = await patientEmergencyInfo.save();
      res.status(200).json(updatedPatientEmergencyFormData);
    } else {
      res.status(404).json({ message: "Home environmental info not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete referral Quetioannaire Info
const deleteForm = asyncHandler(async (req, res) => {
  try {
    const referralFormInfo = await ReferralQuestionnaire.findById(req.params.id);

    if (referralFormInfo) {
      // await referralFormInfo.remove();
      await referralFormInfo.deleteOne({ _id: req.params.id });

      res.status(200).json({ message: "referral Quetioannaire info removed" });
    } else {
      res.status(404).json({ message: "referral Quetioannaire info not found" });
    }
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
});

// Get referral Quetioannaire Info by assignmentId
const getFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const referralFormInfo = await ReferralQuestionnaire.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (referralFormInfo) {
      res.status(200).json(referralFormInfo);
    } else {
      res.status(404).json({
        message: "referral Quetioannaire info with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update referral Quetioannaire Info by assignmentId
const updateFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const assignmentId = req.params.id;
    console.log(
      "updateFormByAssignmentId-confidential-info-Controller api hit"
    , assignmentId);
    console.log(req.body);

    const emergecyPhoneData = await ReferralQuestionnaire.findOne({ assignmentId });

    if (!emergecyPhoneData) {
      res.status(404);
      throw new Error("not form found on this assignment id");
    }
    // Make sure to use the $set operator to specify the fields to update
    const updatedreferralFormInfo = await ReferralQuestionnaire.findOneAndUpdate(
      { assignmentId }, // Filter by assignmentId
      req.body, // Use $set to update the document fields with req.body
      { new: true } // Return the updated document and run validators
    );
    console.log(updatedreferralFormInfo);
    res.status(200).json(updatedreferralFormInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete referral Quetioannaire Info by assignmentId
const deleteFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const referralFormInfo = await ReferralQuestionnaire.findOne({
      assignmentId: req.params.assignmentId,
    });
    if (referralFormInfo) {
      await referralFormInfo.deleteOne({
        assignmentId: req.params.assignmentId,
      });
      // await referralFormInfo.remove();
      res
        .status(200)
        .json({ message: "referral Quetioannaire info with given assignmentId removed" });
    } else {
      res.status(404).json({
        message: "referral Quetioannaire info with given assignmentId not found",
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