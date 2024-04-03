const mongoose = require("mongoose");

// Define schema
const incidentHHAFormSchema = mongoose.Schema({
  // foreign key
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    // required: true,
  },

  //page 1
  reportedTo: {
    type: String,
    // required: [true, "Missing field patientName "],
  },
  incidentLocation: {
    type: String,
    // required: [true, "Missing field incidentLocation"],
  },
  incidentDate: {
    type: Date,
    // required: [true, "Missing field incidentDate"],
  },
  incidentTime: {
    type: String,
    // required: [true, "Missing field incidentTime"],
  },

  //section 1
  incidentDate1: {
    type: Date,
    // required: [true, "Missing field incidentDate1"],
  },
  incidentTime1: {
    type: String,
    // required: [true, "Missing field incidentTime1"],
  },
  //reported
  incidentReportedDate: {
    type: Date,
    // required: [true, "Missing field incidentReportedDate"],
  },
  incidentReportedToPerson: {
    type: String,
    // required: [true, "Missing field incidentReportedToPerson"],
  },
  incidentReportedTime: {
    type: String,
    // required: [true, "Missing field incidentReportedTime"],
  },
  streetAndTownOfIncidentOccurred: {
    type: String,
    // required: [true, "Missing field streetAndTownOfIncidentOccurred"],
  },
  ifEmployeeIncident: {
    type: String,
    // required: [true, "Missing field ifEmployeeIncident"],
  },
  employeeSentERMD: Boolean,
  detailsIfYes: String,

  // Section 2
  patientOrEmployeeName: {
    type: String,
    // required: [true, "Missing field: patientOrEmployeeName"],
  },
  telephone: {
    type: String, // Assuming telephone should be a string, update as needed
    // required: [true, "Missing field: telephone"],
  },
  diagnosis: {
    type: String, // Assuming diagnosis should be a string, update as needed
    // required: [true, "Missing field: diagnosis"],
  },

  //section 2
  patientOrStaffInjury: {
    type: Boolean,
    // required: [true, "Missing field: patientOrStaffInjury"],
  },
  unplannedAbsenceOfCaregiver: {
    type: Boolean,
    // required: [true, "Missing field: unplannedAbsenceOfCaregiver"],
  },
  damageToPersonalProperty: {
    type: Boolean,
    // required: [true, "Missing field: damageToPersonalProperty"],
  },
  powerFailure: {
    type: Boolean,
    // required: [true, "Missing field: powerFailure"],
  },
  patientOrStaffInfection: {
    type: Boolean,
    // required: [true, "Missing field: patientOrStaffInfection"],
  },
  damageFaultEquipmentOrMisuseOfEquipment: {
    type: Boolean,
    // required: [true, "Missing field: damageFaultEquipmentOrMisuseOfEquipment"],
  },
  adverseReaction: {
    type: Boolean,
    // required: [true, "Missing field: adverseReaction"],
  },
  exposureIncident: {
    type: Boolean,
    // required: [true, "Missing field: exposureIncident"],
  },
  medicationError: {
    type: Boolean,
    // required: [true, "Missing field: medicationError"],
  },
  failureOfStaffToReportAccident: {
    type: Boolean,
    // required: [true, "Missing field: failureOfStaffToReportAccident"],
  },
  harassment: {
    type: Boolean,
    // required: [true, "Missing field: harassment"],
  },
  environmentalSafetyIssues: {
    type: Boolean,
    // required: [true, "Missing field: environmentalSafetyIssues"],
  },
  

  describeInjury: {
    type: String,
    // required: [true, "missing field describeInjury"]
  },
  describeIncident: {
    type: String,
    // required: [true, "missing field describeIncident"]
  },
  listItemsPresent: {
    type: String,
    // required: [true, "missing field listItemsPresent"]
  },

  //page 2
  //Section 4
  describeIncidentWhatandWhy: {
    type: String,
    // required: [true, "missing field describeIncident "]
  },

  //vital signs
  temperaturesInitialIncidentSupine: String,
  temperaturesOneMinuteAfterStanding: String,
  temperaturesThreeMinuteAfterStanding: String,

  pulseInitialIncidentSupine: String,
  pulseOneMinuteAfterStanding: String,
  pulseThreeMinuteAfterStanding: String,

  respirationsInitialIncidentSupine: String,
  respirationsOneMinuteAfterStanding: String,
  respirationsThreeMinuteAfterStanding: String,

  bloodPressureInitialIncidentSupine: String,
  bloodPressureOneMinuteAfterStanding: String,
  bloodPressureThreeMinuteAfterStanding: String,

  //Type of injury
  NoneApparent: Boolean,
  abrasion: Boolean,
  skinTear: Boolean,
  laceration: Boolean,
  hematoma: Boolean,
  swelling: Boolean,
  burn: Boolean,
  sprain: Boolean,
  fracture: Boolean,
  bruise: Boolean,


  // digram
  diagramIndicatingInjury: String,


  injuredPersonName: String,
  Address: String,
  phoneNumber: String,

  //page 3
  //Body Substance
  faces: Boolean,
  blood: Boolean,
  urine: Boolean,
  sputum: Boolean,

  //Type of Accident
  needleStick: Boolean,
  bite: Boolean,
  splash: Boolean,
  spill: Boolean,


  //Source individual
  knownToBeHBVorHCVInfected: Boolean,
  legallyObtainedConsent: Boolean,
  knowHIVinfected: Boolean,
  resultsOfTestingMadeToEmployee: Boolean,

  //Employee
  informedOfApplicableLaws: Boolean,
  legallyObtainedConsentEmployee: Boolean,
  postExposureProphylactics: Boolean,
  referredForMedicalEvaluationAndBloodTesting: Boolean,

  //section 5
  //incidentAssesment
  unsafeWorkProcedure: Boolean,
  unsafeWorkCondition: Boolean,
  improperEquipment: Boolean,


  //staff injury only
  howInjuryMightBeenAvoided: String,

  //follow-up related to the incident
  physicianInformedImediately: Boolean,
  ifYesByWhom: String, //

  physicianInstructionsGiven: Boolean,
  ifYesComment: String, //

  familyInformed: Boolean,
  ifYesWhoWasAssigned: String, //

  otherInvolvedAgenciesInformed: Boolean,
  ifYesByWhom1: String, // 

  hrManagerNotified: {
    type: Boolean,
  },
  reviewOfAgencyPolicyWithStaff: {
    type: Boolean,
  },

  workersCompensationReportFiled: {
    type: Boolean,
  },
  reviewOfAgencyPolicyWithPatientFamilyMember: {
    type: Boolean,
  },

  exposureProtocolFollowUpInitiated: {
    type: Boolean,
  },

  
  interventionsToPreventRecurrence: String,

  //page 4
  personResponsibleToImplementation: String,
  DateCorrectiveActions: Date,

  //signatures
  signatureOfPersonCompletingForm: String,
  signatureDate1: Date,

  signatureOfManager: String,
  signatureDate2: Date,

  signatureOfDirector: String,
  signatureDate3: Date,

  signature1Time: String,
  signature2Time: String,
  signature3Time: String,

  // added fields
  employeeName:String,
    // infectiousStatusOfSourceIndividual: Boolean,

    levelOfConciousness: String,

    // other2: Boolean,
    other1desc: String,
    other2desc: String,
    other3desc: String,
    other4desc: String,
    other5desc: String,
    other6desc: String,

    other1: Boolean,
    other5: Boolean,
    other6: Boolean,
});

//create model and export
module.exports = mongoose.model("IncidentHHAForm", incidentHHAFormSchema);
