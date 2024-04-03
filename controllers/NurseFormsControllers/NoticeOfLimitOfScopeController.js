const asyncHandler = require("express-async-handler");
const noticeOfLimitOfScope = require("../../models/NurseFormsModels/NoticeOfLimitOfScopeModel");
const { parseISO, formatISO } = require('date-fns');
// Create Confidential Info
// const createForm = asyncHandler(async (req, res) => {
//     try {
//       const { assignmentId, patientSignature, date } = req.body;
//       const notice = new noticeOfLimitOfScope({
//         assignmentId,
//         patientSignature,
//         date,
//       });
  
//       const createdNotice = await notice.save();
//       res.status(200).json(createdNotice);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

const createForm = asyncHandler(async (req, res) => {
  try {
    const { assignmentId, patientSignature, date } = req.body;

    // Parse the date to handle different formats
    let formattedDate;
    if (date.includes('/')) {
      // Assuming the input format is DD/MM/YYYY
      const [day, month, year] = date.split('/');
      formattedDate = formatISO(new Date(year, month - 1, day));
    } else if (date.includes('T') && date.endsWith('Z')) {
      // If the date is already in ISO format
      formattedDate = date;
    } else {
      // For any other format, attempt to parse directly (might need adjustments based on expected inputs)
      formattedDate = formatISO(parseISO(date));
    }

    const notice = new noticeOfLimitOfScope({
      assignmentId,
      patientSignature,
      date: formattedDate, // Use the formatted date
    });

    const createdNotice = await notice.save();
    res.status(200).json(createdNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get All Confidential Infos
const getAllForms = asyncHandler(async (req, res) => {
  try {
    const noticeInfo = await noticeOfLimitOfScope.find({});
    res.status(200).json(noticeInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Confidential Info by ID
const getFormById = asyncHandler(async (req, res) => {
  const noticeFormInfo = await noticeOfLimitOfScope.findById(req.params.id);

  if (noticeFormInfo) {
    res.status(200).json(noticeFormInfo);
  } else {
    res.status(404).json({ message: "Confidential info not found" });
  }
});

// Update Confidential Info
const updateForm = asyncHandler(async (req, res) => {
    try {
      const notice = await noticeOfLimitOfScope.findById(req.params.id);
  
      if (notice) {
        notice.patientSignature = req.body.patientSignature || notice.patientSignature;
        notice.date = req.body.date || notice.date;
  
        const updatedNotice = await notice.save();
        res.status(200).json(updatedNotice);
      } else {
        res.status(404).json({ message: "Notice of Limit of Scope not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// Delete Confidential Info
const deleteForm = asyncHandler(async (req, res) => {
  try {
    const noticeFormInfo = await noticeOfLimitOfScope.findById(req.params.id);

    if (noticeFormInfo) {
      await noticeFormInfo.deleteOne({_id: req.params._id});
      res.status(200).json({ message: "Confidential info removed" });
    } else {
      res.status(404).json({ message: "Confidential info not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Confidential Info by assignmentId
const getFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const noticeFormInfo = await noticeOfLimitOfScope.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (noticeFormInfo) {
      res.status(200).json(noticeFormInfo);
    } else {
      res.status(404).json({
        message: "Confidential info with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Confidential Info by assignmentId
const updateFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const assignmentId  = req.params.assignmentId;
    console.log("api hit");
    console.log(req.body);

    const confidentialForm = await noticeOfLimitOfScope.findOne({assignmentId})

    if(!confidentialForm){
      res.status(404);
      throw new Error('not form found on this assignment id');
    }
    // Make sure to use the $set operator to specify the fields to update
    const updatedConfidentialInfo = await noticeOfLimitOfScope.findOneAndUpdate(
      { assignmentId }, // Filter by assignmentId
      req.body, // Use $set to update the document fields with req.body
      { new: true} // Return the updated document and run validators
    );
    res.status(200).json(updatedConfidentialInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Confidential Info by assignmentId
const deleteFormByAssignmentId = asyncHandler(async (req, res) => {
  try {
    const noticeFormInfo = await noticeOfLimitOfScope.findOne({
      assignmentId: req.params.assignmentId,
    });

    if (noticeFormInfo) {
      await noticeFormInfo.deleteOne({assignmentId: req.params.assignmentId});
      res
        .status(200)
        .json({ message: "Confidential info with given assignmentId removed" });
    } else {
      res.status(404).json({
        message: "Confidential info with given assignmentId not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createForm,
  getAllForms,
  getFormByAssignmentId,
  updateFormByAssignmentId,
  deleteFormByAssignmentId,
  getFormById,
  updateForm,
  deleteForm,
};
