const asyncHandler = require("express-async-handler");
const PatientPrioritization = require("../../models/NurseFormsModels/PatientPrioritizationModal");
const formatDate = require("../../utils/formatDate");

// Create Patient Prioritization
const createPatientPrioritization = asyncHandler(async (req, res) => {
  try {
    
    const formattedBody = { ...req.body };
    ['date'].forEach(field => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });
    
    const patientPrioritization = new PatientPrioritization(formattedBody);

    const createdPatientPrioritization = await patientPrioritization.save();
    res.status(200).json(createdPatientPrioritization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Patient Prioritizations
const getAllPatientPrioritizations = asyncHandler(async (req, res) => {
  try {
    const patientPrioritizations = await PatientPrioritization.find({});
    res.status(200).json(patientPrioritizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Patient Prioritization by ID
const getPatientPrioritizationById = asyncHandler(async (req, res) => {
  try {
    const patientPrioritization = await PatientPrioritization.findById(req.params.id);

    if (patientPrioritization) {
      res.status(200).json(patientPrioritization);
    } else {
      res.status(404).json({ message: "Patient prioritization not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Patient Prioritization
const updatePatientPrioritization = asyncHandler(async (req, res) => {
  try {
    const patientPrioritization = await PatientPrioritization.findById(req.params.id);

    if (patientPrioritization) {
      patientPrioritization.patientName = req.body.patientName || patientPrioritization.patientName;
      patientPrioritization.patientId = req.body.patientId || patientPrioritization.patientId;
      patientPrioritization.nurse = req.body.nurse || patientPrioritization.nurse;
      patientPrioritization.priorityLevel = req.body.priorityLevel || patientPrioritization.priorityLevel;
      patientPrioritization.date = req.body.priorityLevel || patientPrioritization.date

      const updatedPatientPrioritization = await patientPrioritization.save();
      res.status(200).json(updatedPatientPrioritization);
    } else {
      res.status(404).json({ message: "Patient prioritization not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Patient Prioritization
const deletePatientPrioritization = asyncHandler(async (req, res) => {
  try {
    const patientPrioritization = await PatientPrioritization.findById(req.params.id);

    if (patientPrioritization) {
      // await patientPrioritization.remove();
      await patientPrioritization.deleteOne({_id: req.params.id});
      res.status(200).json({ message: "Patient prioritization removed" });
    } else {
      res.status(404).json({ message: "Patient prioritization not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Patient Prioritization by assignmentId
const getPatientPrioritizationByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const patientPrioritization = await PatientPrioritization.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (patientPrioritization) {
      res.status(200).json(patientPrioritization);
    } else {
      res.status(404).json({
        message: "Patient prioritization with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Patient Prioritization by assignmentId
const updatePatientPrioritizationByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    const patientPrioritization = await PatientPrioritization.findOne({ assignmentId });

    if (!patientPrioritization) {
      res.status(404);
      throw new Error('Patient prioritization not found for this assignment id');
    }

    const updatedPatientPrioritization = await PatientPrioritization.findOneAndUpdate(
      { assignmentId },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedPatientPrioritization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Patient Prioritization by assignmentId
const deletePatientPrioritizationByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const patientPrioritization = await PatientPrioritization.findOneAndDelete({
      assignmentId: req.params.assignmentId,
    });

    if (patientPrioritization) {
      res.status(200).json({ message: "Patient prioritization with given assignmentId removed" });
    } else {
      res.status(404).json({
        message: "Patient prioritization with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createPatientPrioritization,
  getAllPatientPrioritizations,
  getPatientPrioritizationById,
  updatePatientPrioritization,
  deletePatientPrioritization,
  getPatientPrioritizationByAssignmentId,
  updatePatientPrioritizationByAssignmentId,
  deletePatientPrioritizationByAssignmentId,
};
