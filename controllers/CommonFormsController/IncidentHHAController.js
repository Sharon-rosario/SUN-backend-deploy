const IncidentHHAForm = require("../../models/CommonFormsModels/IncidentHHAModel");
const asyncHandler = require("express-async-handler");
const formatDate = require("../../utils/formatDate");
const formatTime = require("../../utils/formatTime");
const path = require('path');

const createForm = asyncHandler(async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    const formattedBody = { ...req.body };

    

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

const addImage = asyncHandler(async (req, res) => {
  console.log("image uplaod",req.file, req.params.assignmentId );
  try {
    if (req.file && req.params.assignmentId) {
      const assignmentId = req.params.assignmentId;
      const imagePath = req.file.path; 
      // Find the document by assignmentId (foreign key) and update it
      const updatedIncidentHHAForm = await IncidentHHAForm.findOneAndUpdate(
        { assignmentId: assignmentId }, 
        { diagramIndicatingInjury: imagePath }, 
        { new: true } 
      );

      if (!updatedIncidentHHAForm) {
        return res.status(404).json({ message: 'IncidentHHAForm not found for the given assignmentId' });
      }

      res.json({ message: 'Image uploaded successfully', updatedIncidentHHAForm });
    } else {
      res.status(400).json({ message: 'Image file or assignmentId is missing' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
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

const getIncidentHHAImage = async (req, res) => {
  console.log('API hit 1');
  try {
    const { imagePath } = req.params;
    console.log('API hit 2');
    const fileName = decodeURIComponent(imagePath);
    console.log('API hit 3');
    // Move up one directory to get out of 'controllers' and then into 'uploads'
    const filePath = path.join(__dirname, '..', '../uploads', fileName);
    console.log('File path:', filePath);
    console.log('API hit 4');
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error sending file.');
      }
    });
    console.log('API hit 5');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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

// Delete Incident Form form by assignmentId
const deleteFormByAssignmentId = asyncHandler(async (req, res) => {
  console.log('delete api incident hitt');
  try {
    const incidentInfo = await IncidentHHAForm.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (incidentInfo) {
      await incidentInfo.deleteOne({
        assignmentId: req.params.assignmentId,
      });
      // await homeEnvFormInfo.remove();
      res.status(200).json({
        message: "Incident Form form with given assignmentId removed",
      });
    } else {
      res.status(404).json({
        message: "Incident Form form with given assignmentId not found",
      });
    }
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
  deleteFormByAssignmentId,
  getIncidentHHAImage,
  addImage
};
