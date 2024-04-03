const asyncHandler = require("express-async-handler");
const EmergencyPhoneFormModel = require("../../models/NurseFormsModels/EmergencyPhoneModel");
const formatDate = require("../../utils/formatDate");

// Create Emergency phoneNumber Info
const createForm = asyncHandler(async (req, res) => {
  try {
    const formattedBody = { ...req.body };
    ["homeSafetyEvaluationDate"].forEach((field) => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });
    const emergencyPhoneInfo = new EmergencyPhoneFormModel(formattedBody);

    // const emergencyPhoneInfo = new EmergencyPhoneFormModel(req.body);
    const createdemergencyPhoneInfo = await emergencyPhoneInfo.save();
    res.status(200).json(createdemergencyPhoneInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Emergency phoneNumber Infos
const getAllForms = asyncHandler(async (req, res) => {
  try {
    const emergencyPhoneInfos = await EmergencyPhoneFormModel.find({});
    res.status(200).json(emergencyPhoneInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Emergency phoneNumber Info by ID
const getFormById = asyncHandler(async (req, res) => {
  const emergencyPhoneInfo = await EmergencyPhoneFormModel.findById(req.params.id);

  if (emergencyPhoneInfo) {
    res.status(200).json(emergencyPhoneInfo);
  } else {
    res.status(404).json({ message: "Emergency phoneNumber info not found" });
  }
});

// Update Emergency phoneNumber Info
const updateForm = asyncHandler(async (req, res) => {
  try {
    const patientEmergencyInfo = await EmergencyPhoneFormModel.findById(req.params.id);
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

// Delete Emergency phoneNumber Info
const deleteForm = asyncHandler(async (req, res) => {
  try {
    const emergencyPhoneInfo = await EmergencyPhoneFormModel.findById(req.params.id);

    if (emergencyPhoneInfo) {
      // await emergencyPhoneInfo.remove();
      await emergencyPhoneInfo.deleteOne({ _id: req.params.id });

      res.status(200).json({ message: "Emergency phoneNumber info removed" });
    } else {
      res.status(404).json({ message: "Emergency phoneNumber info not found" });
    }
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Emergency phoneNumber Info by assignmentId
const getFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const emergencyPhoneInfo = await EmergencyPhoneFormModel.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (emergencyPhoneInfo) {
      res.status(200).json(emergencyPhoneInfo);
    } else {
      res.status(404).json({
        message: "Emergency phoneNumber info with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Emergency phoneNumber Info by assignmentId
const updateFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    console.log(
      "updateFormByAssignmentId-confidential-info-Controller api hit"
    , assignmentId);
    console.log(req.body);

    const emergecyPhoneData = await EmergencyPhoneFormModel.findOne({ assignmentId });

    if (!emergecyPhoneData) {
      res.status(404);
      throw new Error("not form found on this assignment id");
    }
    // Make sure to use the $set operator to specify the fields to update
    const updatedemergencyPhoneInfo = await EmergencyPhoneFormModel.findOneAndUpdate(
      { assignmentId }, // Filter by assignmentId
      req.body, // Use $set to update the document fields with req.body
      { new: true } // Return the updated document and run validators
    );
    console.log(updatedemergencyPhoneInfo);
    res.status(200).json(updatedemergencyPhoneInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Emergency phoneNumber Info by assignmentId
const deleteFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const emergencyPhoneInfo = await EmergencyPhoneFormModel.findOne({
      assignmentId: req.params.assignmentId,
    });
    if (emergencyPhoneInfo) {
      await emergencyPhoneInfo.deleteOne({
        assignmentId: req.params.assignmentId,
      });
      // await emergencyPhoneInfo.remove();
      res
        .status(200)
        .json({ message: "Emergency phoneNumber info with given assignmentId removed" });
    } else {
      res.status(404).json({
        message: "Emergency phoneNumber info with given assignmentId not found",
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