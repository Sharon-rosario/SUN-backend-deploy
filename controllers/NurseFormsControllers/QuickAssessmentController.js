const asyncHandler = require("express-async-handler");
const QuickAssessment = require("../../models/NurseFormsModels/QuickAssessmentModel");
const formatDate = require("../../utils/formatDate");

// Create Quick Assessment
// const createQuickAssessment = asyncHandler(async (req, res) => {
//   const quickAssessment = new QuickAssessment(req.body);
//   try {
//     const createdQuickAssessment = await quickAssessment.save();
//     res.status(201).json(createdQuickAssessment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

const createQuickAssessment = asyncHandler(async (req, res) => {
  // Check if date is provided and format it if necessary
  if (req.body.date) {
    req.body.date = formatDate(req.body.date);
  }

  const quickAssessment = new QuickAssessment(req.body);
  try {
    const createdQuickAssessment = await quickAssessment.save();
    res.status(201).json(createdQuickAssessment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Quick Assessments
const getAllQuickAssessments = asyncHandler(async (req, res) => {
  try {
    const quickAssessments = await QuickAssessment.find({});
    res.status(200).json(quickAssessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Quick Assessment by ID
const getQuickAssessmentById = asyncHandler(async (req, res) => {
  try {
    const quickAssessment = await QuickAssessment.findById(req.params.id);
    if (quickAssessment) {
      res.status(200).json(quickAssessment);
    } else {
      res.status(404).json({ message: "Quick Assessment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Quick Assessment
const updateQuickAssessment = asyncHandler(async (req, res) => {
  try {
    const quickAssessment = await QuickAssessment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (quickAssessment) {
      res.status(200).json(quickAssessment);
    } else {
      res.status(404).json({ message: "Quick Assessment not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Quick Assessment
const deleteQuickAssessment = asyncHandler(async (req, res) => {
  try {
    const quickAssessment = await QuickAssessment.findByIdAndDelete(req.params.id);
    if (quickAssessment) {
      res.status(200).json({ message: "Quick Assessment successfully deleted" });
    } else {
      res.status(404).json({ message: "Quick Assessment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Quick Assessment by Assignment ID
const getQuickAssessmentByAssignmentId = asyncHandler(async (req, res) => {
    try {
      const quickAssessment = await QuickAssessment.findOne({ assignmentId: req.params.assignmentId });
      if (quickAssessment) {
        res.status(200).json(quickAssessment);
      } else {
        res.status(404).json({ message: "Quick Assessment not found for the given assignment ID" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update Quick Assessment by Assignment ID
  const updateQuickAssessmentByAssignmentId = asyncHandler(async (req, res) => {
    try {
      const quickAssessment = await QuickAssessment.findOneAndUpdate(
        { assignmentId: req.params.assignmentId },
        req.body,
        { new: true, runValidators: true }
      );
      if (quickAssessment) {
        res.status(200).json(quickAssessment);
      } else {
        res.status(404).json({ message: "Quick Assessment not found for the given assignment ID" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete Quick Assessment by Assignment ID
  const deleteQuickAssessmentByAssignmentId = asyncHandler(async (req, res) => {
    try {
      const quickAssessment = await QuickAssessment.findOneAndDelete({ assignmentId: req.params.assignmentId });
      if (quickAssessment) {
        res.status(200).json({ message: "Quick Assessment successfully deleted for the given assignment ID" });
      } else {
        res.status(404).json({ message: "Quick Assessment not found for the given assignment ID" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = {
  createQuickAssessment,
  getAllQuickAssessments,
  getQuickAssessmentById,
  updateQuickAssessment,
  deleteQuickAssessment,
  getQuickAssessmentByAssignmentId,
  updateQuickAssessmentByAssignmentId,
  deleteQuickAssessmentByAssignmentId,
};
