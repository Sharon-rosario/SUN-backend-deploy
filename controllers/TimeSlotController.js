const asyncHandler = require("express-async-handler");
const TimeSlot = require("../models/TimeSlotModel");

// Get all timeSlots
const getTimeSlots = asyncHandler(async (req, res) => {
  const timeSlots = await TimeSlot.find({});
  res.status(200).json(timeSlots);
});

// Get timeSlot by Id
const getTimeSlotById = asyncHandler(async (req, res) => {
  const timeSlotId = req.params.id;

  const timeSlot = await TimeSlot.findById(timeSlotId);

  if (!timeSlot) {
    res.status(404).json({ error: "TimeSlot not found" });
  } else {
    res.status(200).json(timeSlot);
  }
});

// Add new timeSlot
const createTimeSlot = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json(`"Please select both fields!"`);
  }
  const existingTimeSlot = await TimeSlot.findOne({
    timeSlot_name: name,
  });

  if (existingTimeSlot) {
    res.status(400).json(`Time slot already exists!`);
  } else {
    const timeSlot = await TimeSlot.create({
      timeSlot_name: name,
    });

    res.status(201).json({
      message: `Time slot created successfully`,
      timeSlot: timeSlot,
    });
  }
});

// Update timeSlot_name
const updateTimeSlotName = asyncHandler(async (req, res) => {
  const timeSlotId = req.params.id;
  const { name } = req.body;

  console.log(timeSlotId, name);

  // Find the timeSlot by ID
  const timeSlot = await TimeSlot.findById(timeSlotId);

  if (!timeSlot) {
    res.status(404);
    throw new Error("Time slot not found");
  }

  if (!name) {
    res.status(400).json(`Please select both fields!`);
  }

  const existingTimeSlot = await TimeSlot.findOne({
    timeSlot_name: name,
  });

  if (existingTimeSlot && existingTimeSlot._id.toString() !== timeSlotId) {
    res.status(400).json(`Time slot already exists!`);
  }

  // Update timeSlot_name
  const updatedTimeSlot = await TimeSlot.findOneAndUpdate(
    {
      _id: timeSlotId,
    },
    {
      timeSlot_name: name,
    }
  );

  await updatedTimeSlot.save();

  res.status(200).json({
    message: `Time slot updated successfully`,
    timeSlot: timeSlot,
  });

  return;
});

// Delete timeSlot by ID
const deleteTimeSlot = asyncHandler(async (req, res) => {
  const timeSlotId = req.params.id;

  const timeSlot = await TimeSlot.findById(timeSlotId);

  if (!timeSlot) {
    res.status(404);
    throw new Error("TimeSlot not found");
  }

  await TimeSlot.deleteOne({ _id: timeSlotId });

  res.status(200).json({
    message: `TimeSlot deleted successfully`,
  });
});

module.exports = {
  getTimeSlots,
  createTimeSlot,
  deleteTimeSlot,
  updateTimeSlotName,
  getTimeSlotById,
};
