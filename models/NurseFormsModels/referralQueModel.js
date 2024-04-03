const mongoose = require("mongoose");

const referralQuestionnaireSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "Assignment ID is required"],
  },
  servicesNeeded: { type: String, required: false },
  referralDate: { type: Date, required: false },
  patientName: { type: String, required: false },
  patientAddress: { type: String, required: false },

  city: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false },

  patientPhone: { type: String, required: false },
  dob: { type: Date, required: false },

  emergencyName: { type: String, required: false },
  emergencyPhone: { type: String, required: false },
  emergencyRelation: { type: String, required: false },

  diagnosis: { type: String, required: false },
  socialSecurityNumber: { type: String, required: false },
  caseManagerName: { type: String, required: false },
  caseManagerPhone: { type: String, required: false },

  medicaidRecipientId: { type: String, required: false },
  medicaidId: { type: String, required: false },

  
  physicianName: { type: String, required: false },
  physicianNpi: { type: String, required: false },
  physicianAddress: { type: String, required: false },
  physicianCity: { type: String, required: false },
  physicianState: { type: String, required: false },
  physicianZip: { type: String, required: false },
  physicianPhone: { type: String, required: false },
  physicianaFx: { type: String, required: false },

  personCallingName: { type: String, required: false },
  personCallingPhone: { type: String, required: false },
});

const ReferralQuestionnaire = mongoose.model(
  "ReferralQuestionnaire",
  referralQuestionnaireSchema
);

module.exports = ReferralQuestionnaire;
