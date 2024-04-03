const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
  },
  patientId: String,
  clientName: String,
  weekStartingDate: Date,
  startTime:String,
  endTime: String,
  days: {
    sunday: { startTime: String, endTime: String },
    monday: { startTime: String, endTime: String },
    tuesday: { startTime: String, endTime: String },
    wednesday: { startTime: String, endTime: String },
    thursday: { startTime: String, endTime: String },
    friday: { startTime: String, endTime: String },
    saturday: { startTime: String, endTime: String },
  },
  totalHours: String,
});

const PCASchedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = PCASchedule;


// const mongoose = require('mongoose');

// const ScheduleSchema = new mongoose.Schema({
//   clientName: String,
//   weekStartingDate: Date, // Assuming you want to store the week starting date
//   days: {
//     sunday: { startTime: String, endTime: String },
//     monday: { startTime: String, endTime: String },
//     tuesday: { startTime: String, endTime: String },
//     wednesday: { startTime: String, endTime: String },
//     thursday: { startTime: String, endTime: String },
//     friday: { startTime: String, endTime: String },
//     saturday: { startTime: String, endTime: String }
//   },
//   totalHours: Number // Assuming you want to keep track of total hours
// });

// const PCASchedule = mongoose.model('Schedule', ScheduleSchema);

// module.exports = PCASchedule;


