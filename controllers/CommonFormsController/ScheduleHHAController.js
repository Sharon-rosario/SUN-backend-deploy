const asyncHandler = require('express-async-handler');
const Schedule = require('../../models/CommonFormsModels/ScheduleHHAModel');
const formatDate = require('../../utils/formatDate');
const formatTime = require('../../utils/formatTime')

// Create a new PCA schedule
// const createSchedule = asyncHandler(async (req, res) => {
//   try {
//     const formattedBody = { ...req.body };
//     ['weekStartingDate'].forEach(field => {
//       if (formattedBody[field]) {
//         formattedBody[field] = formatDate(formattedBody[field]);
//       }
//     });
//     const schedule = new Schedule(formattedBody);
//     const createdSchedule = await schedule.save();
//     res.status(200).json(createdSchedule);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

const createSchedule = asyncHandler(async (req, res) => {
  try {
    const formattedBody = { ...req.body };

    // Format weekStartingDate
    ['weekStartingDate'].forEach(field => {
      if (formattedBody[field]) {
        formattedBody[field] = formatDate(formattedBody[field]);
      }
    });

    // Format start and end times for each day
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    daysOfWeek.forEach(day => {
      if (formattedBody.days && formattedBody.days[day]) {
        const { startTime, endTime } = formattedBody.days[day];
        if (startTime) {
          formattedBody.days[day].startTime = formatTime(startTime);
        }
        if (endTime) {
          formattedBody.days[day].endTime = formatTime(endTime);
        }
      }
    });

    // Create and save the schedule
    const schedule = new Schedule(formattedBody);
    const createdSchedule = await schedule.save();
    res.status(200).json(createdSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// weekStartingDate

// Get all PCA schedules
const getAllSchedules = asyncHandler(async (req, res) => {
  try {
    const schedules = await Schedule.find({});
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single PCA schedule by ID
const getScheduleById = asyncHandler(async (req, res) => {
  try {
    const assesmentID = req.params.id;
    const schedule = await Schedule.findOne({assesmentID});

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a PCA schedule by ID
const updateSchedule = asyncHandler(async (req, res) => {
  try {
    const assignmentId = req.params.id;
    console.log('assignmentId:', assignmentId);
    // const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, req.body, { new: true });
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { assignmentId }, // Specify the condition to find the document
      req.body,                          // The update to be applied
      { new: true }
    );
    console.log(updatedSchedule, "id");
    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    console.log(updatedSchedule);

    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message });
  }
});

// const updateSchedule = asyncHandler(async (req, res) => {
//   try {
//     const scheduleId = req.params.id;
//     console.log('scheduleId:', scheduleId);

//     // If you want to use scheduleId directly
//     const updatedSchedule = await Schedule.findByIdAndUpdate(
//       scheduleId,
//       req.body,
//       { new: true }
//     );

//     // If you want to use assignmentId from req.body
//     // const updatedSchedule = await Schedule.findOneAndUpdate(
//     //   { assignmentId: req.body.assignmentId },
//     //   req.body,
//     //   { new: true }
//     // );

//     console.log(updatedSchedule, "id");

//     if (!updatedSchedule) {
//       return res.status(404).json({ message: 'Schedule not found' });
//     }

//     console.log(updatedSchedule);
//     res.status(200).json(updatedSchedule);
//   } catch (error) {
//     console.error(error)
//     res.status(400).json({ message: error.message });
//   }
// });

// Delete a PCA schedule by ID
const deleteSchedule = asyncHandler(async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const schedule = await Schedule.findById(scheduleId); // we can use this if we are sending assesmentID
    // const schedule = await Schedule.findOne({ patientId }); // because im sending patientID for updating 

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    await Schedule.deleteOne({ _id: scheduleId });
    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// get schedule form data by assignmentId
const getScheduleByAssignmentId = asyncHandler(async (req, res) => {
  try {
    console.log("hitttt");
    const assignmentId = req.params.id;  // Assuming the assignmentId is passed in the URL parameter
    const schedule = await Schedule.findOne({ assignmentId });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getScheduleByAssignmentId,
};
