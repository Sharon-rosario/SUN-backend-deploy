const mongoose = require('mongoose');

const PolicyOnConfidentialitySchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [false, "Assignment ID is required"],
  },
  name: {
    type: String,
    required: [false, "Patient name is required"],
  },
  address: {
    type: String,
    required: [false, "Patient address is required"],
  },
  date: {
    type: Date,
    required: [false, "Date of acknowledgment is required"],
  }
});

const PolicyOnConfidentiality = mongoose.model('PolicyOnConfidentiality', PolicyOnConfidentialitySchema);

module.exports = PolicyOnConfidentiality;
