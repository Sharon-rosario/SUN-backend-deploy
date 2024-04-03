const asyncHandler = require("express-async-handler");
const patientEmergencyModel = require("../../models/NurseFormsModels/PatientEmergencyModel");
const formatDate = require("../../utils/formatDate");

// Create Patient Emergency Info
const createForm = asyncHandler(async (req, res) => {
  try {
    const formattedBody = { ...req.body };
    ["socDate", "dateSigned","ifYesForRecieptOfHomeSafety"].forEach((field) => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });
    const patientEmergencyInfo = new patientEmergencyModel(formattedBody);

    // const patientEmergencyInfo = new patientEmergencyModel(req.body);
    const createdpatientEmergencyInfo = await patientEmergencyInfo.save();
    res.status(200).json(createdpatientEmergencyInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Patient Emergency Infos
const getAllForms = asyncHandler(async (req, res) => {
  try {
    const patientEmergencyInfos = await patientEmergencyModel.find({});
    res.status(200).json(patientEmergencyInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Patient Emergency Info by ID
const getFormById = asyncHandler(async (req, res) => {
  const patientEmergencyInfo = await patientEmergencyModel.findById(req.params.id);
  if (patientEmergencyInfo) {
    res.status(200).json(patientEmergencyInfo);
  } else {
    res.status(404).json({ message: "Patient Emergency info not found" });
  }
});

// Delete Patient Emergency Info
const deleteForm = asyncHandler(async (req, res) => {
  try {
    const patientEmergencyInfo = await patientEmergencyModel.findById(req.params.id);
    if (patientEmergencyInfo) {
      // await patientEmergencyInfo.remove();
      await patientEmergencyInfo.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Patient Emergency info removed" });
    } else {
      res.status(404).json({ message: "Patient Emergency info not found" });
    }
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Patient Emergency Info by assignmentId
const getFormByAssignmentId = asyncHandler(async (req, res) => {
  console.log('id httt');
  try {
    const patientEmergencyInfo = await patientEmergencyModel.findOne({
      assignmentId: req.params.assignmentId,
    });
    if (patientEmergencyInfo) {
      res.status(200).json(patientEmergencyInfo);
    } else {
      res.status(404).json({
        message: "Patient Emergency info with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE BY ID
const updateForm = asyncHandler(async (req, res) => {
  try {
    const patientEmergencyInfo = await patientEmergencyModel.findById(req.params.id);
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

// Update Patient Emergency Info by assignmentId
const updateFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const assignmentId = req.params.id;
    // console.log(
    //   "updateFormByAssignmentId-Patient Emergency-info-Controller api hit"
    // );
    // console.log(req.body);
    const patientEmergencyFormData = await patientEmergencyModel.findOne({ assignmentId });
    if (!patientEmergencyFormData) {
      res.status(404);
      throw new Error("not form found on this assignment id");
    }
    // Make sure to use the $set operator to specify the fields to update
    const updatedpatientEmergencyInfo = await patientEmergencyModel.findOneAndUpdate(
      { assignmentId }, // Filter by assignmentId
      req.body, // Use $set to update the document fields with req.body
      { new: true } // Return the updated document and run validators
    );
    res.status(200).json(updatedpatientEmergencyInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Patient Emergency Info by assignmentId
const deleteFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const patientEmergencyInfo = await patientEmergencyModel.findOne({
      assignmentId: req.params.assignmentId,
    });
    if (patientEmergencyInfo) {
      await patientEmergencyInfo.deleteOne({
        assignmentId: req.params.assignmentId,
      });
      // await patientEmergencyInfo.remove();
      res
        .status(200)
        .json({ message: "Patient Emergency info with given assignmentId removed" });
    } else {
      res.status(404).json({
        message: "Patient Emergency info with given assignmentId not found",
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
