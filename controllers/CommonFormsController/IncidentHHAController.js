const IncidentHHAForm = require("../../models/CommonFormsModels/IncidentHHAModel");
const asyncHandler = require("express-async-handler");
const formatDate = require("../../utils/formatDate");
const formatTime = require("../../utils/formatTime");
const path = require('path');
const { deleteImage } = require("../../utils/imageDeleteHelper");

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

const AddIncidentImage = asyncHandler(async (req, res) => {
  console.log("incident image uploaded", req.file, req.params.assignmentId);
  try {
    const { assignmentId } = req.params;
    if (req.file && assignmentId) {
      // First check if the incident form exists by using assignmentId as a filter
      const existingIncidentFormData = await IncidentHHAForm.findOne({
        assignmentId: assignmentId,
      });
      if (!existingIncidentFormData) {
        // If no incident form found, send a 404 error
        return res.status(404).json({ message: "IncidentHHAForm data does not exist" });
      }
      // If incident form exists, update with the new image path
      const imagePath = req.file.filename;
      console.log("incident imagePath", imagePath);
      const updatedIncidentFormData = await IncidentHHAForm.findOneAndUpdate(
        { assignmentId: assignmentId },
        { $set: { diagramIndicatingInjury: imagePath } }, // Update the correct field
        { new: true }
      );
      // If there was an existing image, delete it
      if (
        existingIncidentFormData.diagramIndicatingInjury &&
        existingIncidentFormData.diagramIndicatingInjury !== ""
      ) {
        await deleteImage(
          existingIncidentFormData.diagramIndicatingInjury,
          "incidentImageUploads"
        );
      }
      res.json({ message: "Image uploaded successfully", updatedIncidentFormData });
    } else {
      res.status(400).json({ message: "Image file or assignmentId is missing" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload image", error: error.message });
  }
});



const getIncidentHHAImage = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    // Find the incidentData in the database using assignmentId as a filter
    const incidentData = await IncidentHHAForm.findOne({ assignmentId: assignmentId });
    if (!incidentData) {
      return res.status(404).json({ message: 'IncidentHHAForm not found' });
    }
    // Check if the incidentData has an image
    if (!incidentData.diagramIndicatingInjury) {
      return res.status(404).json({ message: 'IncidentHHAForm has no image' });
    }
    // Construct the full file path
    const uploadsDir = path.join(__dirname, '..', '../uploads/incidentImageUploads');
    const filename = incidentData.diagramIndicatingInjury;
    const filePath = path.join(uploadsDir, filename);
    // Send the file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error sending file.');
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createForm,
  getAllForms,
  getFormById,
  updateFormById,
  deleteFormById,
  getFormByAssignmentId,
  deleteFormByAssignmentId,

  //image controllers
  getIncidentHHAImage,
  AddIncidentImage
};
