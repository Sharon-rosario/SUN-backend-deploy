const asyncHandler = require('express-async-handler');
const DailyTimeSheet = require('../../models/CommonFormsModels/DailyTimeSheetHHAModel.js');
const formatDate = require('../../utils/formatDate.js');
const formatTime = require('../../utils/formatTime.js');

const createTimeSheet = asyncHandler(async (req, res) => {
  try {
    // Create a copy of the request body to manipulate
    const formattedBody = { ...req.body };

    // Format date fields
    ['date'].forEach((field) => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });

    // Convert startTime and endTime to 24-hour format if they exist
    if (formattedBody.startTime) {
      formattedBody.startTime = formatTime(formattedBody.startTime);
    }
    if (formattedBody.endTime) {
      formattedBody.endTime = formatTime(formattedBody.endTime);
    }

    // Create the DailyTimeSheet with the formatted body
    const timeSheet = new DailyTimeSheet(formattedBody);

    const createdTimeSheet = await timeSheet.save();
    res.status(201).json(createdTimeSheet);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the time sheet.' });
    console.error('Error creating time sheet:', error);
  }
});

const getAllTimeSheets = asyncHandler(async (req, res) => {
  const timeSheets = await DailyTimeSheet.find({});
  res.status(200).json(timeSheets);
});

// Get a single time sheet by ID
const getTimeSheetById = asyncHandler(async (req, res) => {
  const assignmentId = req.params.id;
  const timeSheet = await DailyTimeSheet.findOne({assignmentId});
  if (!timeSheet) {
    res.status(404);
    throw new Error('Time sheet not found');
  }
  res.status(200).json(timeSheet);
});

// Update a time sheet by ID
// const updateTimeSheet = asyncHandler(async (req, res) => {
//   // console.log('update hitt');
//   try {
//     const assignmentId = req.params.id;
//     const timeSheet = await DailyTimeSheet.findOne({ assignmentId });

//     if (!timeSheet) {
//       res.status(404);
//       throw new Error('Time sheet not found');
//     }

//     const updatedTimeSheet = await DailyTimeSheet.findOneAndUpdate({assignmentId}, req.body, { new: true });
//     res.status(200).json(updatedTimeSheet);
//   } catch (error) {
//     // Handle the error appropriately
//     res.status(500).json({ error: error.message || 'Internal Server Error' });
//   }
// });

const updateTimeSheet = asyncHandler(async (req, res) => {
  const assignmentId = req.params.id;
  const timeSheet = await DailyTimeSheet.findOne({ assignmentId });

  if (!timeSheet) {
    res.status(404);
    throw new Error('Time sheet not found');
  }

  const updatedTimeSheet = await DailyTimeSheet.findOneAndUpdate({assignmentId}, req.body, { new: true });
  res.status(200).json(updatedTimeSheet);
});

// Delete a time sheet by ID
const deleteTimeSheet = asyncHandler(async (req, res) => {
  const timeSheetId = req.params.id;
  const timeSheet = await DailyTimeSheet.findById(timeSheetId);

  if (!timeSheet) {
    res.status(404);
    throw new Error('Time sheet not found');
  }

  await DailyTimeSheet.deleteOne({ _id: timeSheetId });
  res.status(200).json({ message: 'Time sheet deleted successfully' });
});

module.exports = {
  createTimeSheet,
  getAllTimeSheets,
  getTimeSheetById,
  updateTimeSheet,
  deleteTimeSheet
};
