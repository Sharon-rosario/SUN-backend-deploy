const mongoose = require("mongoose");

const confidentialInfoSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "assignment Id is requiered"],
  },
  patientSignature: {
    type: String,
    required: [false, "Patient signature is required"],
  },
  patientName: {
    type: String,
    required: [false, "Patient name is required"],
  },
  patientDate: {
    type: Date,
    required: [false, "Date of patient signature is required"],
  },
  clinicianSignature: {
    type: String,
    required: [false, "Clinician signature is required"],
  },
  clinicianName: {
    type: String,
    required: [false, "Clinician name is required"],
  },
  clinicianDate: {
    type: Date,
    required: [false, "Date of clinician signature is required"],
  },
});

const ConfidentialInfo = mongoose.model(
  "ConfidentialInfo",
  confidentialInfoSchema
);

module.exports = ConfidentialInfo;
