const mongoose = require("mongoose");

const homeEnvSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "assignment Id is requiered"],
  },
  workingTelephone1: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  electricalCordsOutlets2: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  smokeAlarms3: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  fireExtinguisher4: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  outsideExitsAccessible5: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  alternateExitsAccessible6: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  walkingPathwaysLevel7: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  stairsGoodRepair8: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  lightingAdequate9: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  temperatureVentilationAdequate10: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  medicationsPoisonousSubstances11: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  bathroomSafe12: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  kitchenSafe13: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  environmentSafeOxygenUse14: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  overallEnvironmentSanitary15: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },

  other16: {
    type: String,
    enum: ["YES", "NO", "N/A"],
  },
  other: {
    type: String,
  },

  ifNoSpecifyDocument: [
    {
      itemNumber: {
        type: String,
      },
      dateInstructed: {
        type: Date, // Or Date, if you prefer to enforce date formatting
      },
      teachingMaterialsProvided: {
        type: String,
      },
      teachingMaterialsReviewed: {
        type: String,
      },
      actionPlan: {
        type: String,
      },
    },
  ],

  raisedToilet: Boolean,
  infantRub: Boolean,
  plugCovers: Boolean,
  CabinetLatches: Boolean,
  tubSeat: Boolean,
  windowLocks: Boolean,
  lpeaseSyrup: Boolean,
  grabBar: Boolean,
  smokeAlarm: Boolean,
  Wheelchair: Boolean,
  seatBedCushion: Boolean,
  nonSkidSurface: Boolean,
  FirstAidKit: Boolean,
  Lifeline: Boolean,
  Other: Boolean,
  otherSpecify: String,


  emergencyPreparedness: Boolean,
  explain: String,
  isThisPatientReceivingSkilledService: Boolean,
  ifNoDoesPatientHaveSkilledNeeds: Boolean,
  ifYesDoesPatientGivePermission: Boolean,

  signature: String,
  dateSigned: Date,
});

const HomeEnvFormModel = mongoose.model("HomeEnvFormModel", homeEnvSchema);

module.exports = HomeEnvFormModel;

// signature: String,
// signatureDate: Date,