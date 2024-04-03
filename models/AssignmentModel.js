const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true  
    },
    patientStatus: {
      type: String,
      default: 'pending',
      enum: ['pending', 'accepted', 'rejected']
    },
    commentForRejection: String,
    formattedAssignmentDate : String,
    employee: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Employee',
      required: true
    },
    timeSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TimeSlot',
      required: true
    },
    assignmentDate: {
      type: Date, 
      default: Date.now
    },
    skillLevel: { 
      type: String,
      enum: ['Nurse', 'HHA'],
      required: true
    }  
  }, { timestamps: true });
  
  AssignmentSchema.index({ 
    patient: 1,
    employee: 1,
    assignmentDate: 1,
    timeSlot: 1,
    skillLevel: 1
  }, { unique: true });
  
  module.exports = mongoose.model('Assignment', AssignmentSchema);
  