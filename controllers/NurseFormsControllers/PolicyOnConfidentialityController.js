const asyncHandler = require("express-async-handler")
const PolicyOnConfidentiality = require("../../models/NurseFormsModels/PolicyOnConfidentialityModel");
const formatDate = require("../../utils/formatDate");

// Create Policy On Confidentiality
const createPolicy = asyncHandler(async (req, res) => {
    try {
      // const { assignmentId, name, address, date } = req.body;
      

      const formattedBody = { ...req.body };
    ['date'].forEach(field => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });

    const policy = new PolicyOnConfidentiality(formattedBody);
  
      const createdPolicy = await policy.save();
      res.status(201).json(createdPolicy);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get All Policies On Confidentiality
  const getAllPolicies = asyncHandler(async (req, res) => {
    try {
      const policies = await PolicyOnConfidentiality.find({});
      res.status(200).json(policies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get Policy On Confidentiality by ID
  const getPolicyById = asyncHandler(async (req, res) => {
    try {
      const policy = await PolicyOnConfidentiality.findById(req.params.id);
  
      if (policy) {
        res.status(200).json(policy);
      } else {
        res.status(404).json({ message: "Policy on confidentiality not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update Policy On Confidentiality
  const updatePolicy = asyncHandler(async (req, res) => {
    try {
      const policy = await PolicyOnConfidentiality.findById(req.params.id);
  
      if (policy) {
        policy.name = req.body.name || policy.name;
        policy.address = req.body.address || policy.address;
        policy.date = req.body.date || policy.date;
  
        const updatedPolicy = await policy.save();
        res.status(200).json(updatedPolicy);
      } else {
        res.status(404).json({ message: "Policy on confidentiality not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete Policy On Confidentiality
  const deletePolicy = asyncHandler(async (req, res) => {
    try {
      const policy = await PolicyOnConfidentiality.findById(req.params.id);

  // await Patient.deleteOne({ _id: patientId });
      if (policy) {
        await policy.deleteOne({_id: req.params.id});
        res.status(200).json({ message: "Policy on confidentiality removed" });
      } else {
        res.status(404).json({ message: "Policy on confidentiality not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// Get Policy On Confidentiality by assignmentId
const getPolicyByAssignmentId = asyncHandler(async (req, res) => {
    try {
      const policy = await PolicyOnConfidentiality.findOne({
        assignmentId: req.params.assignmentId,
      });
  
      if (policy) {
        res.status(200).json(policy);
      } else {
        res.status(404).json({
          message: "Policy on confidentiality with given assignmentId not found",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update Policy On Confidentiality by assignmentId
  const updatePolicyByAssignmentId = asyncHandler(async (req, res) => {
    try {
      const assignmentId = req.params.assignmentId;
  
      const policy = await PolicyOnConfidentiality.findOne({ assignmentId });
  
      if (!policy) {
        res.status(404);
        throw new Error('Policy on confidentiality not found for this assignment id');
      }
  
      const updatedPolicy = await PolicyOnConfidentiality.findOneAndUpdate(
        { assignmentId },
        req.body,
        { new: true, runValidators: true }
      );
  
      res.status(200).json(updatedPolicy);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete Policy On Confidentiality by assignmentId
  const deletePolicyByAssignmentId = asyncHandler(async (req, res) => {
    try {
      const policy = await PolicyOnConfidentiality.findOneAndDelete({
        assignmentId: req.params.assignmentId,
      });
  
      if (policy) {
        res.status(200).json({ message: "Policy on confidentiality with given assignmentId removed" });
      } else {
        res.status(404).json({
          message: "Policy on confidentiality with given assignmentId not found",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = {
    createPolicy,
    getAllPolicies,
    getPolicyById,
    updatePolicy,
    deletePolicy,
    getPolicyByAssignmentId,
    updatePolicyByAssignmentId,
    deletePolicyByAssignmentId,
  };
  