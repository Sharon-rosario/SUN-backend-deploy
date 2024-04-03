const mongoose = require("mongoose");

const QuickAssessmentSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "Assignment ID is required"],
  },
  patientName: {
    type: String,
    required: false,
  },
  MRN: {
    type: String,
    required: false,
  },
  // Timed Up and Go Test
  TUGTestFirstTrial: Number,
  TUGTestSecondTrial: Number,
  TUGTestAverage: Number,

  stability: {
    type: String,
    enum: ["Good", "Fair", "Poor"],
    required: false,
  },
  endurance: {
    type: String,
    enum: ["Good", "Fair", "Poor"],
    required: false,
  },
  assistance: {
    type: String,
    enum: ["None", "Min", "Mod", "Max"],
    required: false,
  },
  addressRecallSuccess: Boolean,
  ageCorrect: Boolean,
  timeToNearestHourCorrect: Boolean,
  yearCorrect: Boolean,
  placeCorrect: Boolean,
  identifyObjectsSuccess: Boolean,
  birthDateCorrect: Boolean,
  yearWWIIStartedCorrect: Boolean,
  currentPresidentCorrect: Boolean,
  countBackwardsSuccess: Boolean,
  totalScore: {
    type: Number,
    min: 0,
    max: 10,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("QuickAssessment", QuickAssessmentSchema);
