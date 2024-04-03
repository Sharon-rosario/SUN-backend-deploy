const mongoose = require("mongoose");

const dailyTimeSheetSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    // required: true,
  },
  employeeName: String,
  date: Date,
  day: String,
  totalHours: String,
  patientName: String,
  code: String,
  program: String,
  startTime: String,
  endTime: String,

  evvDoneStart: Boolean,
  ifNoReason1: String,
  evvDoneEnd: Boolean,
  ifNoReason2: String,

  // activities

  turnAndPosition: Boolean,
  mobilityAssist: Boolean,
  romExercises: Boolean,
  ambulationAssist: Boolean,

  // homemaking
  vacuuming: Boolean,
  dustDampMop: Boolean,
  kitchenCleaned: Boolean,
  dishes: Boolean,
  bathroom: Boolean,
  makeChangeBed: Boolean,
  emptyCommode: Boolean,
  emptyTrash: Boolean,
  laundryClientHome: Boolean,
  laundryLaundromat: Boolean,
  washStoveTop: Boolean,
  cleanRefrigerator: Boolean,
  dust: Boolean,
  mirrorsWindows: Boolean,
  errands: Boolean,
  shopping: Boolean,
  prescriptionPickup: Boolean,
  apptAccompany: Boolean,
  groceryShopping: Boolean,
  cashReceived: Boolean,
  cashReturned: Boolean,
  // clientRefusedClientNotHome: Boolean,
  other1: Boolean,
  // other2: Boolean,
  other3: Boolean,

  // personalCare:
  bathShower: Boolean,
  tubeBed: Boolean,
  hairCare: Boolean,
  shampoo: Boolean,
  shave: Boolean,
  mouthDentureCare: Boolean,
  oralCareSwabBrush: Boolean,
  assistWithDressing: Boolean,
  lotionSkinBarrier: Boolean,
  helpWithToileting: Boolean,
  nailCare: Boolean,
  washRubBack: Boolean,
  checkForSkinBreakdown: Boolean,
  catheterCare: Boolean,

  // checkSwelling:
  abdomenNone: Boolean,
  handsFeet: Boolean,
  legsRightLeft: Boolean,

  // nutrition
  dietOrder: Boolean,
  foodAllergies: Boolean,
  limitEncFluids: Boolean,
  mealsPreparation: Boolean,
  feedingServing: Boolean,
  bloodPressureBloodSugarCheckReminders: Boolean,
  medicationReminders: Boolean,
  // other: Boolean,

  //signatures
  employeesSignature: String,
  patientsSignature: String,
});

const DailyTimeSheet = mongoose.model("DailyTimeSheet", dailyTimeSheetSchema); //create model = collection

module.exports = DailyTimeSheet;
