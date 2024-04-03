const mongoose = require("mongoose");

const patientEmergencySchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "assignment Id is requiered"],
  },
  patientName: {
    type: String,
    required: [false, "Patient name is required"],
  },
  socDate: {
    type: Date,
    required: [false, "Start of Care date is required"],
  },
  patientAddress: {
    type: String,
    required: [false, "Street address is required"],
  },
  city: {
    type: String,
    required: [false, "City is required"],
  },
  state: {
    type: String,
    required: [false, "State is required"],
  },
  zipCode: {
    type: String,
    required: [false, "ZIP code is required"],
  },
  patientPhone: {
    type: String,
    required: [false, "Patient phone number is required"],
  },
  physicianName: {
    type: String,
    required: [false, "Physician name is required"],
  },
  physicianPhone: {
    type: String,
    required: [false, "Physician phone number is required"],
  },
  physicianAddress: {
    type: String,
    required: [false, "Physician address is required"],
  },
  dailyorFrequentServices: {
    type: Boolean,
    required: [false, "Information on daily or more frequent agency services is required"],
  },
  ifYesForDailyorFrequentServices: {
    type: String,
  },
  oxygenFlowRate: {
    type: Number,
    required: [false, "Oxygen flow rate is required if patient is oxygen dependent"],
  },
  oxygenHoursOfUse: {
    type: Number,
    required: [false, "Hours of oxygen use is required if patient is oxygen dependent"],
  },
  oxygenDeliveryDevice: {
    type: String,
    required: [false, "Oxygen delivery device is required if patient is oxygen dependent"],
  },


  lifeSustainingInfusion: {
    type: Boolean,
    required: [false, "Information on life-sustaining infusion is required"],
  },
  ifYesForLifeSustainingInfusion: {
    type: String,
  },

  ivTherapy: {
    type: Boolean,
    required: [false, "Information on IV therapy is required"],
  },
  ifYesForIvTherapy: {
    type: String,
    required: [false, "IV therapy description is required if patient has IV therapy"],
  },

  patientIndependent: {
    type: Boolean
  },


  ventilatorDependent: {
    type: Boolean,
    required: [false, "Information on ventilator dependency is required"],
  },


  dialysis: {
    type: Boolean,
    required: [false, "Information on dialysis is required"],
  },
  ifYesForDialysis: {
    type: String
  },


  tubeFeeding: {
    type: Boolean,
    required: [false, "Information on tube feeding is required"],
  },
  ifYesForTubeFeeding: {
    type: String,
  },

  selfAdministeredMedications: {
    type: Boolean,
    required: [false, "Information on self-administered medications is required"],
  },

  walker: Boolean,
  wheelchair: Boolean,
  hearingImpairment: Boolean,
  visualImpairment: {
    type: Boolean,
    required: [false, "Information on visual impairment is required"],
  },
  mentalCognitiveImpairment: {
    type: Boolean,
    required: [false, "Information on mental/cognitive impairment is required"],
  },
  bedBound: {
    type: Boolean,
    required: [false, "Information on whether patient is bed bound is required"],
  },
  tremors: {
    type: Boolean,
    required: [false, "Information on tremors is required"],
  },

  personalEmergencyResponseSystem: {
    type: Boolean,
    required: [false, "Information on personal emergency response system is required"],
  },
  ifYesForPersonalEmergencyResponseSystem: {
    type: String,
    required: [false, "Emergency response system description is required if system is present"],
  },

  // page 2
  water: Boolean,
  foodSupplyFor3D: Boolean,
  batteryOperatedRadio: Boolean,
  flashLight: Boolean,
  other: Boolean,

  otherSpecify: String,
  recieptOfHomeSafety: Boolean,
  ifYesForRecieptOfHomeSafety: Date,
  SymtomsToReport: String,
  additionalEmergencyGuidelines:String,

  // emergency plan
  emergencyContactName: {
    type: String,
    required: [false, "Emergency contact name is required"],
  },
  emergencyContactPhone: {
    type: String,
    required: [false, "Emergency contact phone number is required"],
  },
  emergencyContactRelation: {
    type: String,
    required: [false, "Emergency contact relation is required"],
  },

  ifNecessaryPatientWillEvacuvateTo: {
    type:String,
    enum: ['Relative', 'Friend'] 
  },
  evacuationContactNameAndPhone: { // radio button relative/friend
    type: String,
    required: [false, "Evacuation contact name is required if evacuation is necessary"],
  },
  nextTOKinName: String,

  hospitalOfChoiceName: {
    type: String,
    required: [false, "Hospital of choice name is required"],
  },
  hospitalOfChoiceAddress: {
    type: String,
    required: [false, "Hospital of choice address is required"],
  },
  primaryNurseName: {
    type: String,
    required: [false, "Primary nurse name is required"],
  },
  pharmacyName: {
    type: String,
    required: [false, "Pharmacy name is required"],
  },
  pharmacyAddressAndPhone: {
    type: String,
    required: [false, "Pharmacy address is required"],
  },


  // -------
  // pharmacyPhone: { 
  //   type: String,
  //   required: [false, "Pharmacy phone number is required"],
  // },//------


  fireDepartmentPhone: {
    type: String,
    required: [false, "Fire department phone number is required"],
  },
  policeDepartmentPhone: {
    type: String,
    required: [false, "Police department phone number is required"],
  },
  ambulancePhone: {
    type: String,
    required: [false, "Ambulance phone number is required"],
  },
  onCallNumber: {
    type: String,
    required: [false, "On-call number is required"],
  },
  priorityLevel: {
    type: String,
    required: [false, "Priority/acuity level is required"],
  },
  clinicianSignature: {
    type: String,
    required: [false, "Clinician name is required"],
  },
  dateSigned: {
    type: Date,
    required: [false, "Date signed is required"],
  }
});

const patientEmergencyModel = mongoose.model(
  "patientEmergencyModel",
  patientEmergencySchema
);

module.exports = patientEmergencyModel;
