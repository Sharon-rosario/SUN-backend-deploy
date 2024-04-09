const MissedVisitForm = require('../../models/CommonFormsModels/MissedVisitHHAModel');
const asyncHandler = require("express-async-handler");
const formatDate = require('../../utils/formatDate');
const formatTime = require("../../utils/formatTime");

// const createForm = asyncHandler(async (req, res) => {
//   try {
//     const newForm = await MissedVisitForm.create(req.body);
//     res.status(200).json(newForm);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// })

const createForm = asyncHandler(async (req, res) => {
  try {
    // Format date fields in req.body
    const formattedBody = { ...req.body };
    [
      'physicianCaseManagerNotifiedDate', 
      'dateOfMissedVisit', 
      'visitShiftMissedDueDate', 
      'patientRefusedServicesForThisDate', 
      'shiftVisitRescheduledFor', 
      'careCoordinatorDate'
    ].forEach(field => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });

    // Format time fields in req.body
    [
      'patientNotifiedTime',
      'phonedTime',
      'visitShiftMissedDueTime',
      'homeHealthAideTime',
      // Add any other time fields here
    ].forEach(timeField => {
      if (formattedBody[timeField]) {
        formattedBody[timeField] = formatTime(formattedBody[timeField]);
      }
    });

    // Create new form with formatted date and time fields
    const newForm = await MissedVisitForm.create(formattedBody);
    res.status(200).json(newForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// const createForm = asyncHandler(async (req, res) => {
//   try {
//     // Format date fields in req.body
//     const formattedBody = { ...req.body };
//     ['physicianCaseManagerNotifiedDate', 'dateOfMissedVisit', 'visitShiftMissedDueDate', 'patientRefusedServicesForThisDate', 'shiftVisitRescheduledFor', 'careCoordinatorDate'].forEach(field => {
//       if (formattedBody[field]) {
//         formattedBody[field] = formatDate(formattedBody[field]);
//       }
//     });

//     // Create new form with formatted date fields
//     const newForm = await MissedVisitForm.create(formattedBody);
//     res.status(200).json(newForm);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

const getAllForms = asyncHandler(async (req, res) => {
  try {
    const forms = await MissedVisitForm.find()
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getFormById = asyncHandler(async (req, res) => {
  try {
    const form = await MissedVisitForm.findById(req.params.id);
    if (!form) {
      // Use return here to stop the function if the form is not found
      return res.status(404).json({ message: 'Form not found' });
    }
    // If the form is found, send it and stop the function here
    return res.status(200).json(form);
  } catch (error) {
    // If an error occurs, send an error response and stop the function here
    return res.status(500).json({ message: error.message });
  }
});


const updateFormById = asyncHandler(async (req, res) => {
  try {
    console.log('controller hit', req.body);
    const assignmentId = req.params.id;

    // Find the document using assignmentId
    const formToUpdate = await MissedVisitForm.findOne({ assignmentId});

    if (!formToUpdate) {
      res.status(404);
      throw new Error('Form not found');
    }

    // Update the found document
    const updatedForm = await MissedVisitForm.findOneAndUpdate(
      {assignmentId}, 
      req.body,
      { new: true }
    );

    console.log(updatedForm);
    res.status(200).json(updatedForm);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});


const deleteFormById = asyncHandler(async (req, res) => {
  try {
    await MissedVisitForm.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Form successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getMissedFormDataByPatientId = asyncHandler(async (req, res) => {
  try {
    const assignmentId = req.params.id;  // Assuming the patientId is passed in the URL parameter
    const missed = await MissedVisitForm.findOne({ assignmentId });

    if (!missed) {
      return res.status(404).json({ message: 'missed not found' });
    }

    res.status(200).json(missed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  console.log("error")
});


// Delete Missed visit form by assignmentId
const deleteFormByAssignmentId = asyncHandler(async (req, res) => {
  console.log('delete api missed visit hitt');
  try {
    const missedvisitInfo = await MissedVisitForm.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (missedvisitInfo) {
      await missedvisitInfo.deleteOne({
        assignmentId: req.params.assignmentId,
      });
      // await homeEnvFormInfo.remove();
      res.status(200).json({
        message: "Missed visit form with given assignmentId removed",
      });
    } else {
      res.status(404).json({
        message: "Missed visit form with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createForm,getAllForms,getFormById,updateFormById,deleteFormById, getMissedFormDataByPatientId, deleteFormByAssignmentId
}