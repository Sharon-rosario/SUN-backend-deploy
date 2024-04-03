const mongoose = require("mongoose");

const passportSupervisoryReportSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "assignment Id is requiered"],
  },
  clientName: String,
  date: Date,
  primaryDiagnosis: String,

  adherenceToCarePlan: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: false,
  },
  adherenceToCarePlanComment: String,

  recordingReporting: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: false,
  },
  recordingReportingComment: String,

  problemsChanges: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: false,
  },
  problemsChangesComment: String,

  dressCode: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: false,
  },
  dressCodeComment: String,

  promptness: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: false,
  },
  promptnessComment: String,

  attendance: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: false,
  },
  attendanceComment: String,

  personalCare: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: false,
  },
  personalCareComment: String,

  qualityOfService: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: false,
  },
  qualityOfServiceComment: String,

  medicalStatus: {
    type: String,
    enum: ["Unchanged", "Improved", "Changed"],
    required: false,
  },
  medicalStatusComment: String,

  mentalStatus: {
    type: String,
    enum: ["Unchanged", "Improved", "Changed"],
    required: false,
  },
  mentalStatusComment: String,

  mobility: {
    type: String,
    enum: ["Unchanged", "Improved", "Changed"],
    required: false,
  },
  mobilityComment: String,

  nutrition: {
    type: String,
    enum: ["Unchanged", "Improved", "Changed"],
    required: false,
  },
  nutritionComment: String,

  skin: {
    type: String,
    enum: ["Unchanged", "Improved", "Changed"],
    required: false,
  },
  skinComment: String,
  nursingCarePlanReviewedWithClientCaregiver: String,
  serviceCarePlanReviewedWithClientCaregiver: String,
  hhaPresent: String,
  listTypeOfService: String,
  hhaHmName: String,
  hhaHmTitle: String,
  comments: String,
  clientSignature: String,
  supervisorSignature: String,
});

const PassportSupervisoryReport = mongoose.model(
  "PassportSupervisoryReport",
  passportSupervisoryReportSchema
);

module.exports = PassportSupervisoryReport;