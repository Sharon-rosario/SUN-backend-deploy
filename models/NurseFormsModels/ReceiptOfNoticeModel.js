const mongoose = require('mongoose');

const privacyPracticesReceiptSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "Assignment ID is required"],
  },
  patientName: {
    type: String,
    required: [false, "Patient name is required"],
  },
  medicalRecordNumber: {
    type: String,
    required: [false, "Medical record number is required"],
  },
  dateOfAdmission: {
    type: Date,
    required: [false, "Date of admission is required"],
  },
  patientSignature: {
    type: String,
    required: [false, "Patient's signature is required"],
  },
  patientSignatureDate: {
    type: Date,
    required: [false, "Date of patient's signature is required"],
  },
  representativeSignature: String,
  representativeSignatureDate: Date,
  wasPrivacyNoticeProvided: {
    type: Boolean,
    required: [false, "This field is required to indicate if the privacy notice was provided"],
  },
  effortsToObtainAcknowledgement: String,
  clinicianSignature: String,
  clinicianSignatureDate: Date
});

const PrivacyPracticesReceipt = mongoose.model('PrivacyPracticesReceipt', privacyPracticesReceiptSchema);

module.exports = PrivacyPracticesReceipt;
