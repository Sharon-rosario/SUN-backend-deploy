const mongoose = require("mongoose");

const Enum2 = [
  "Without Help",
  "With Cane",
  "With Walker",
  "With Wheelchair",
  "With Personal Assistance",
  "Unable",
];

const Enum1 = ["None", "Partial", "Total"];

const Enum3 = ["Independent", "Partial Assist", "Total Assist"];

const nursingAssesmentSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "assignment Id is requiered"],
  },
  lastName: { type: String },
  firstName: { type: String },
  middleInitial: { type: String },
  contactPersonName: { type: String },
  contactPhoneDayTime: { type: String },

  //Living Situation
  dwellingType: { type: String, enum: ["Apartment", "House", "Other"] },
  dwellingTypeOther: String,

  floorNumberOfRooms: { type: Number },
  dwellingElevator: { type: Boolean },
  livesAlone: { type: Boolean },
  individualsInHome: { type: String },
  serviceAvailability: { type: String },

  //Hospitalization
  hospitalName: { type: String },
  hospitalizedFrom: { type: Date },
  hospitalizedTo: { type: Date },
  diagnoses: { type: String },
  hospitalContactName: { type: String },
  hospitalContactPhone: { type: String },

  //Impairments
  speechImpairment: { type: String, enum: Enum1 },
  sightImpairment: { type: String, enum: Enum1 },
  hearingImpairment: { type: String, enum: Enum1 },
  handArmImpairment: { type: String, enum: Enum1 },
  upperExtremitiesImpairment: { type: String, enum: Enum1 },
  lowerExtremitiesImpairment: { type: String, enum: Enum1 },
  // Cardiovascular / Respiratory
  respiratoryImpairment: { type: String, enum: Enum1 },
  cardiacImpairment: { type: String, enum: Enum1 },
  circulatoryImpairment: { type: String, enum: Enum1 },

  //describe
  DescribeImpactOnFunctionalAbility: { type: String },
  // -----
  historyOfTuberculosis: {
    type: String,
    enum: ["Yes", "No", "Pulmonary", "Extra pulmonary"],
  },
  completedTherapy: { type: Boolean },
  currentlyHasTuberculosis: {
    type: String,
    enum: ["Yes", "No", "Pulmonary", "Extra pulmonary"],
  },
  onTuberculosisProphylaxis: { type: Boolean},
  hxTbProphylaxis: { type: Boolean},

  // - Identification of Service Needs
  ambulateInside: {
    type: String,
    enum: Enum2,
  },
  ambulateOutside: {
    type: String,
    enum: Enum2,
  },
  getUpFromSeatedPosition: {
    type: String,
    enum: Enum2,
  },
  getUpFromBed: {
    type: String,
    enum: Enum2,
  },
  transferToCommode: {
    type: String,
    enum: Enum2,
  },
  transferToWheelchair: {
    type: String,
    enum: Enum2,
  },

  //- 24 rows columns * 3 || column 1

  activities: {
    type: String,
    enum: Enum3,
  },
  turnAndPosition: {
    type: String,
    enum: Enum3,
  },
  mobilityAssist: {
    type: String,
    enum: Enum3,
  },
  romExercises: {
    type: String,
    enum: Enum3,
  },
  ambulationAssist: {
    type: String,
    enum: Enum3,
  },
  homeMaking: {
    type: String,
    enum: Enum3,
  },
  vacuuming: {
    type: String,
    enum: Enum3,
  },
  dustDampMop: {
    type: String,
    enum: Enum3,
  },
  kitchenCleaned: {
    type: String,
    enum: Enum3,
  },
  dishes: {
    type: String,
    enum: Enum3,
  },
  bathroom: {
    type: String,
    enum: Enum3,
  },
  makeChangeBed: {
    type: String,
    enum: Enum3,
  },
  emptyCommode: {
    type: String,
    enum: Enum3,
  },
  emptyTrash: {
    type: String,
    enum: Enum3,
  },
  laundryClientHome: {
    type: String,
    enum: Enum3,
  },
  laundryLaundromat: {
    type: String,
    enum: Enum3,
  },
  washStoveTop: {
    type: String,
    enum: Enum3,
  },
  cleanRefrigerator: {
    type: String,
    enum: Enum3,
  },
  dust: {
    type: String,
    enum: Enum3,
  },
  mirrorsWindows: {
    type: String,
    enum: Enum3,
  },
//   otherSpecify: { type: String },
  other1: {
    type: String,
    enum: Enum3,
  },
  errands: {
    type: String,
    enum: Enum3,
  },
  shopping: {
    type: String,
    enum: Enum3,
  },
  prescriptionPickup: {
    type: String,
    enum: Enum3,
  },

  //-- column 2
  apptAccompany: {
    type: String,
    enum: Enum3,
  },
  groceryShopping: {
    type: String,
    enum: Enum3,
  },
  cashReceived: {
    type: String,
    enum: Enum3,
  },
  cashReturned: {
    type: String,
    enum: Enum3,
  },
  clientRefused: {
    type: String,
    enum: Enum3,
  },
  personalCare: {
    type: String,
    enum: Enum3,
  },
  bathShower: {
    type: String,
    enum: Enum3,
  },
  tubeBed: {
    type: String,
    enum: Enum3,
  },
  hairCare: {
    type: String,
    enum: Enum3,
  },
  shampoo: {
    type: String,
    enum: Enum3,
  },
  shave: {
    type: String,
    enum: Enum3,
  },
  mouthDentureCare: {
    type: String,
    enum: Enum3,
  },
  oralCareSwabBrush: {
    type: String,
    enum: Enum3,
  },
  assistWithDressing: {
    type: String,
    enum: Enum3,
  },
  lotionSkinBarrier: {
    type: String,
    enum: Enum3,
  },
  helpWithToileting: {
    type: String,
    enum: Enum3,
  },
  nailCare: {
    type: String,
    enum: Enum3,
  },
  washRubBack: {
    type: String,
    enum: Enum3,
  },
  checkForSkinBreakdown: {
    type: String,
    enum: Enum3,
  },
  catheterCare: {
    type: String,
    enum: Enum3,
  },
  eliminationAssist: {
    type: String,
    enum: Enum3,
  },
  equipmentCare: {
    type: String,
    enum: Enum3,
  },

  // - column 3
  checkSwelling: {
    type: String,
    enum: Enum3,
  },
  abdomenNone: {
    type: String,
    enum: Enum3,
  },
  handsFeet: {
    type: String,
    enum: Enum3,
  },
  legsRL: {
    type: String,
    enum: Enum3,
  },
  nutrition: {
    type: String,
    enum: Enum3,
  },
  dietOrder: {
    type: String,
    enum: Enum3,
  },
  foodAllergies: {
    type: String,
    enum: Enum3,
  },
  limitEncFluids: {
    type: String,
    enum: Enum3,
  },
  mealsPrep: {
    type: String,
    enum: Enum3,
  },
  feedingServing: {
    type: String,
    enum: Enum3,
  },
  bpBsCheckReminders: {
    type: String,
    enum: Enum3,
  },
  medicationReminders: {
    type: String,
    enum: Enum3,
  },

  // - last section page - 3
  basedOnPersonalObservation: { type: Boolean },
  informationRelayedBy: { type: String },
  nurseName: { type: String },
  nurseSignature: { type: String },
  dateOfSignature: { type: Date },
  otherAgencyProvidingServices: { type: Boolean },
  ifYesAgencyName: { type: String },
  services: { type: String },
  haveHomeCareInsuranceBenefitsExhausted: { type: Boolean },
});

const NursingAssesmentModel = mongoose.model(
  "NursingAssesmentModel",
  nursingAssesmentSchema
);

module.exports = NursingAssesmentModel;


