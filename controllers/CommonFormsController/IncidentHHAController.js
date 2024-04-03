const IncidentHHAForm = require("../../models/CommonFormsModels/IncidentHHAModel");
const asyncHandler = require("express-async-handler");
const formatDate = require("../../utils/formatDate");
const formatTime = require("../../utils/formatTime");


const createForm = asyncHandler(async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    const formattedBody = { ...req.body };

    if (req.file) {
      formattedBody.diagramIndicatingInjury = req.file.path; // Store the file path as a string
    }

    // Format date fields
    [
      "incidentDate",
      "incidentDate1",
      "incidentReportedDate",
      "DateCorrectiveActions",
      "signatureDate1",
      "signatureDate2",
      "signatureDate3",
    ].forEach((field) => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });

    // Format time fields to 24-hour format
    [
      "incidentTime",
      "incidentTime1",
      "incidentReportedTime",
      "signature1Time",
      "signature2Time",
      "signature3Time",
    ].forEach((field) => {
      if (formattedBody[field]) {
        formattedBody[field] = formatTime(formattedBody[field]);
      }
    });

    const newIncidentHHAForm = await IncidentHHAForm.create(formattedBody);
    res.status(201).json(newIncidentHHAForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const getAllForms = asyncHandler(async (req, res) => {
  try {
    const forms = await IncidentHHAForm.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getFormById = asyncHandler(async (req, res) => {
  try {
    const form = await IncidentHHAForm.findById(req.params.id);
    if (!form) {
      // Use return here to stop the function if the form is not found
      return res.status(404).json({ message: "Form not found" });
    }
    // If the form is found, send it and stop the function here
    return res.status(200).json(form);
  } catch (error) {
    // If an error occurs, send an error response and stop the function here
    return res.status(500).json({ message: error.message });
  }
});

const getFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const form = await IncidentHHAForm.findOne({ assignmentId });
    if (!form) {
      // Use return here to stop the function if the form is not found
      return res.status(404).json({ message: "Form not found" });
    }
    // If the form is found, send it and stop the function here
    return res.status(200).json(form);
  } catch (error) {
    // If an error occurs, send an error response and stop the function here
    return res.status(500).json({ message: error.message });
  }
});

const updateFormById = asyncHandler(async (req, res) => {
  console.log("hitttttttttttttttttt");
  try {
    const assignmentId = req.params.id;
    const updatedForm = await IncidentHHAForm.findOneAndUpdate(
      { assignmentId },
      req.body,
      { new: true }
    );
    // const updatedForm = await IncidentHHAForm.(req.params.id, req.body, { new: true });
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteFormById = asyncHandler(async (req, res) => {
  try {
    await IncidentHHAForm.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Form successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createForm,
  getAllForms,
  getFormById,
  updateFormById,
  deleteFormById,
  getFormByAssignmentId,
};
