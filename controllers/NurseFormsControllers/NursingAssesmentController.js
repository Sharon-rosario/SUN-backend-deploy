const asyncHandler = require("express-async-handler");
const NursingAssesmentModel = require("../../models/NurseFormsModels/NursingAssesmentModel.js");
const formatDate = require("../../utils/formatDate.js");

// Create Emergency phoneNumber Info
const createForm = asyncHandler(async (req, res) => {
  try {
    const formattedBody = { ...req.body };
    ["dateOfSignature", "hospitalizedFrom", "hospitalizedTo"].forEach((field) => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });
    const nursingAssesmentFormInfo = new NursingAssesmentModel(formattedBody);

    // const nursingAssesmentFormInfo = new NursingAssesmentModel(req.body);

    const createdFormData = await nursingAssesmentFormInfo.save();
    res.status(200).json(createdFormData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Emergency phoneNumber Infos
const getAllForms = asyncHandler(async (req, res) => {
  try {
    const nursingAssesmentInfo = await NursingAssesmentModel.find({});
    res.status(200).json(nursingAssesmentInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Emergency phoneNumber Info by ID
const getFormById = asyncHandler(async (req, res) => {
  const nursingAssesmentFormInfo = await NursingAssesmentModel.findById(req.params.id);

  if (nursingAssesmentFormInfo) {
    res.status(200).json(nursingAssesmentFormInfo);
  } else {
    res.status(404).json({ message: "Emergency phoneNumber info not found" });
  }
});

// Update Emergency phoneNumber Info
const updateForm = asyncHandler(async (req, res) => {
  try {
    const nursingAssesmentFormInfo = await NursingAssesmentModel.findById(req.params.id);
    if (nursingAssesmentFormInfo) {
      // Update the entire nursingAssesmentFormInfo object with req.body
      Object.assign(nursingAssesmentFormInfo, req.body);
      const updatedPatientEmergencyFormData = await nursingAssesmentFormInfo.save();
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
    const nursingAssesmentFormInfo = await NursingAssesmentModel.findById(req.params.id);

    if (nursingAssesmentFormInfo) {
      // await nursingAssesmentFormInfo.remove();
      await nursingAssesmentFormInfo.deleteOne({ _id: req.params.id });

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
    const nursingAssesmentFormInfo = await NursingAssesmentModel.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (nursingAssesmentFormInfo) {
      res.status(200).json(nursingAssesmentFormInfo);
    } else {
      res.status(404).json({
        message: "Nursing Assesment form info with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Emergency phoneNumber Info by assignmentId
const updateFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const assignmentId = req.params.id;
    console.log(
      "Nursing Assesment Controller api hit"
    );
    console.log(req.body);

    const emergecyPhoneData = await NursingAssesmentModel.findOne({ assignmentId });

    if (!emergecyPhoneData) {
      res.status(404);
      throw new Error("not form found on this assignment id");
    }
    // Make sure to use the $set operator to specify the fields to update
    const updatedemergencyPhoneInfo = await NursingAssesmentModel.findOneAndUpdate(
      { assignmentId }, // Filter by assignmentId
      req.body, // Use $set to update the document fields with req.body
      { new: true } // Return the updated document and run validators
    );
    res.status(200).json(updatedemergencyPhoneInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Emergency phoneNumber Info by assignmentId
const deleteFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const nursingAssesmentFormInfo = await NursingAssesmentModel.findOne({
      assignmentId: req.params.assignmentId,
    });
    if (nursingAssesmentFormInfo) {
      await nursingAssesmentFormInfo.deleteOne({
        assignmentId: req.params.assignmentId,
      });
      // await nursingAssesmentFormInfo.remove();
      res
        .status(200)
        .json({ message: "Nursing Assesment info with given assignmentId removed" });
    } else {
      res.status(404).json({
        message: "Nursing Assesment info with given assignmentId not found",
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