const mongoose = require('mongoose');

const patientPrioritizationSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "assignment Id is required"],
  },
  patientName: {
    type: String,
    required: [false, "Patient's name is required"],
  },
  patientId: {
    type: String,
    required: [false, "Patient's ID is required"],
  },
  nurse: {
    type: String,
    required: [false, "Nurse's name is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  priorityLevel: {
    type: String,
    required: [false, "Priority level is required"],
    enum: ['LEVEL 1', 'LEVEL 2', 'LEVEL 3'],
  }
});

const PatientPrioritization = mongoose.model('PatientPrioritization', patientPrioritizationSchema);

module.exports = PatientPrioritization;
