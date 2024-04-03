const asyncHandler = require("express-async-handler");
const patientEmergencyModel = require("../../models/NurseFormsModels/PassportSupervisoryReportModel");
const formatDate = require("../../utils/formatDate");

// Create Confidential Info
const createForm = asyncHandler(async (req, res) => {
  try {
    const formattedBody = { ...req.body };
    ["date"].forEach((field) => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });
    const passportSupervisoryInfo = new patientEmergencyModel(formattedBody);


    // const passportSupervisoryInfo = new patientEmergencyModel(req.body);
    const createdPassportSupervisoryInfo = await passportSupervisoryInfo.save();
    res.status(200).json(createdPassportSupervisoryInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Confidential Infos
const getAllForms = asyncHandler(async (req, res) => {
  try {
    const passportSupervisoryInfos = await patientEmergencyModel.find({});
    res.status(200).json(passportSupervisoryInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Confidential Info by ID
const getFormById = asyncHandler(async (req, res) => {
  const passportSupervisoryInfo = await patientEmergencyModel.findById(req.params.id);

  if (passportSupervisoryInfo) {
    res.status(200).json(passportSupervisoryInfo);
  } else {
    res.status(404).json({ message: "Passport supervisory info not found" });
  }
});

// Update Confidential Info
const updateForm = asyncHandler(async (req, res) => {
  try {
    const passportSupervisoryInfo = await patientEmergencyModel.findById(req.params.id);

    if (passportSupervisoryInfo) {
      // Update the entire homeEnvInfo object with req.body
      Object.assign(passportSupervisoryInfo, req.body);
      const passportSupervisoryInfoData = await passportSupervisoryInfo.save();
      res.status(200).json(passportSupervisoryInfoData);
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
    const passportSupervisoryInfo = await patientEmergencyModel.findById(req.params.id);

    if (passportSupervisoryInfo) {
      // await passportSupervisoryInfo.remove();
      await passportSupervisoryInfo.deleteOne({ _id: req.params.id });

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
    const passportSupervisoryInfo = await patientEmergencyModel.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (passportSupervisoryInfo) {
      res.status(200).json(passportSupervisoryInfo);
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

    const confidentialForm = await patientEmergencyModel.findOne({ assignmentId });

    if (!confidentialForm) {
      res.status(404);
      throw new Error("not form found on this assignment id");
    }
    // Make sure to use the $set operator to specify the fields to update
    const updatedPassportSupervisoryInfo = await patientEmergencyModel.findOneAndUpdate(
      { assignmentId }, // Filter by assignmentId
      req.body, // Use $set to update the document fields with req.body
      { new: true } // Return the updated document and run validators
    );
    res.status(200).json(updatedPassportSupervisoryInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Confidential Info by assignmentId
const deleteFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const passportSupervisoryInfo = await patientEmergencyModel.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (passportSupervisoryInfo) {
      await passportSupervisoryInfo.deleteOne({
        assignmentId: req.params.assignmentId,
      });
      // await passportSupervisoryInfo.remove();
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
