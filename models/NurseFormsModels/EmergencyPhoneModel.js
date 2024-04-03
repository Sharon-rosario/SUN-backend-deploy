const mongoose = require("mongoose");

const emergencyPhoneSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "assignment Id is requiered"],
  },
  hospitalOfChoiceName: String,
  hospitalOfChoicePhone: String,
  physicianToCallName: String,
  physicianToCallPhone: String,
  physicianBackupName: String,
  physicianBackupPhone: String,
  nextOfKinName: String,
  nextOfKinPhone: String,
  alternateContactName: String,
  alternateContactPhone: String,
  localEmergencyResponseName: String,
  localEmergencyResponseNumber: String,
  fireDepartmentName: String,
  fireDepartmentNumber: String,
  policeDepartmentName: String,
  policeDepartmentNumber: String,
  ambulanceServiceName: String,
  ambulanceServiceNumber: String,
  onCallPhoneName: String,
  onCallPhoneNumber: String,
  primaryNurseName: String,
  primaryNursePhone: String,
  equipmentCompanyRepName: String,
  equipmentCompanyRepPhone: String,
  pharmacyContactName: String,
  pharmacyContactPhone: String,
  spiritualCounselorName: String,
  spiritualCounselorPhone: String,

  //emergecy guidlines intructions

//symptomsToReport: String,
  call911: String,
  physician: String,
  onCallPersonnel: String,
  personalEmergencyResponseSystemHas: Boolean,
  personalEmergencyResponseSystemDetails: String,

  water: Boolean,
  foodSupply3Days: Boolean,
  radioBatteryOperated: Boolean,
  flashlightAndBatteries: Boolean,
  other: Boolean,
  otherSpecify: String,

  homeSafetyEvaluationHas: Boolean,
  homeSafetyEvaluationDate: Date,
  additionalGuidelinesInstructions: String
});

const EmergencyPhoneFormModel = mongoose.model(
  "EmergencyPhoneFormModel",
  emergencyPhoneSchema
);

module.exports = EmergencyPhoneFormModel;
