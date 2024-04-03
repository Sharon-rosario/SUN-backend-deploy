const asyncHandler = require("express-async-handler");
const Program = require("../models/ProgramModel");

// Get all programs
const getPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find({});
  res.status(200).json(programs);
});

// Get program by Id
const getProgramById = asyncHandler(async (req, res) => {
  const programId = req.params.id;

  const program = await Program.findById(programId);

  if (!program) {
    res.status(404).json({ error: "Program not found" });
  } else {
    res.status(200).json(program);
  }
});

// Add new program
const createProgram = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json(`"Program name is required!"`);
  }
  const existingProgram = await Program.findOne({
    program_name: name,
  });

  if (existingProgram) {
    res.status(400).json(`Program already exists!`);
  } else {
    const program = await Program.create({
      program_name: name,
    });

    res.status(201).json({
      message: `Program created successfully`,
      program: program,
    });
  }
});

// Update program_name
const updateProgramName = asyncHandler(async (req, res) => {
  const programId = req.params.id;
  const { name } = req.body;

  // Find the program by ID
  const program = await Program.findById(programId);

  if (!program) {
    res.status(404);
    throw new Error("Program not found");
  }

  if (!name) {
    res.status(400).json(`Program name is required`);
  }

  const existingProgram = await Program.findOne({
    program_name: name,
  });

  if (existingProgram && existingProgram._id.toString() !== programId) {
    res.status(400).json(`Program already exists!`);
  }

  // Update program_name
  const updatedProgram = await Program.findOneAndUpdate(
    {
      _id: programId,
    },
    {
      program_name: name,
    }
  );

  await updatedProgram.save();

  res.status(200).json({
    message: `Program name updated successfully`,
    program: program,
  });
});

// Delete program by ID
const deleteProgram = asyncHandler(async (req, res) => {
  const programId = req.params.id;

  const program = await Program.findById(programId);

  if (!program) {
    res.status(404);
    throw new Error("Program not found");
  }

  await Program.deleteOne({ _id: programId });

  res.status(200).json({
    message: `Program deleted successfully`,
  });
});

module.exports = {
  getPrograms,
  createProgram,
  deleteProgram,
  updateProgramName,
  getProgramById,
};
