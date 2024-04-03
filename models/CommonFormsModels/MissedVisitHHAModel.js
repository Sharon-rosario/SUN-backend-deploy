const mongoose = require("mongoose");

// Define schema
const missedVisitFormSchema = mongoose.Schema({
  // patientId: String,
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    // required: true,
  },
  patientName: String,
  patientTelephone: String,
  dateOfMissedVisit: Date,
  patientNotifiedTime: String,

  // physicianCaseManagerNotified
  physicianCaseManagerNotifiedName: String,
  physicianCaseManagerNotifiedDate: Date,

  // notificationMethod
  faxed: String,
  // phoned
  phonedNumber: String,
  phonedTime: String,
  email: String,
  lvm: Boolean,

  // services
  skilledNursing: Boolean,
  physicalTherapy: Boolean,

  //missed visit due to 
  visitShiftMissedDueDate: Date,
  visitShiftMissedDueTime: String,

  // homeHealthAide
  homeHealthAideTelephone: String,
  homeHealthAideTime: String,
  occupationalTherapy: Boolean,

  // visitShiftMissedDueTo: {
  patientRefusedServices: Boolean,
  patientInHospital: Boolean,
  patientTakenOutOfTownByFamily: Boolean,
  noAnswer: Boolean,
  dueToWeather: Boolean,
  patientHasDoctorAppointmentToday: Boolean,
  staffCancellationNoOtherAvailableResources: Boolean,
  other: String,

  // howWerePatientNeedsMet
  message: String,
  familyOtherCaregiver: Boolean,
  patientRefusedServicesForThisDate: Date,
  shiftVisitRescheduledFor: Date,
  careCoordinatorName: String,
  careCoordinatorDate: Date,

  faxedCheck: Boolean,
  patientTelCheck: Boolean,
  emailCheck: Boolean,
  homeHealthAideCheck: Boolean,
  shiftVisitRescheduledToCheck: Boolean,
  shiftVisitRescheduledForCheck: Boolean

});

// Create model
const MissedVisitForm = mongoose.model(
  "MissedVisitForm",
  missedVisitFormSchema
);

module.exports = MissedVisitForm;
