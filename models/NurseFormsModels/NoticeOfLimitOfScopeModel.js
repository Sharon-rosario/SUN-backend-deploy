const mongoose = require("mongoose");

const noticeOfLimitOfScopeSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "assignment Id is requiered"],
  },
  patientSignature: {
    type: String,
    required: [false, "Patient signature is required"],
  },
  date: {
    type: Date,
    required: [false, "Date of patient signature is required"],
  },
});

const noticeOfLimitOfScope = mongoose.model(
  "noticeOfLimitOfScope",
  noticeOfLimitOfScopeSchema
);

module.exports = noticeOfLimitOfScope;
