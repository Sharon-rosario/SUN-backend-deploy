const asyncHandler = require("express-async-handler");
const Unit = require("../models/UnitModel");
const Program = require("../models/ProgramModel");

// Get all units
const getUnits = asyncHandler(async (req, res) => {
  const units = await Unit.find({}).populate("programs").populate("unit_name");
  res.status(200).json(units);
});

// Get unit by Id
const getUnitById = asyncHandler(async (req, res) => {
  const unitId = req.params.id;

  const unit = await Unit.findById(unitId).populate("programs").populate("unit_name")
  // .populate("Company");

  if (!unit) {
    res.status(404).json({ error: "Unit not found" });
  } else {
    res.status(200).json(unit);
  }
});

// Add new unit
const createUnit = asyncHandler(async (req, res) => {
  const { name, programIds } = req.body;
  if (!name) {
    res.status(400).json(`Unit name is required!`);
  }
  const existingUnit = await Unit.findOne({
    unit_name: name,
  });

  if (existingUnit) {
    res.status(400).json("Unit already exists!");
  } else {
    const unit = await Unit.create({
      unit_name: name,
      programs: programIds
    });

    res.status(201).json({
      message: `Unit created successfully`,
      unit: unit,
    });
  }
});

// Update unit_name
const updateUnitName = asyncHandler(async (req, res) => {
  console.log(req.body)
  const unitId = req.params.id;
  const { name } = req.body;

  try {
    // Find the unit by ID
    const unit = await Unit.findById(unitId);

    if (!unit) {
      res.status(404);
      throw new Error("Unit not found");
    }

    // Update unit_name
    unit.unit_name = name;
    await unit.save();

    res.status(200).json({
      message: `Unit name updated successfully`,
      unit: unit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating unit name",
      error: error.message,
    });
  }
});

// const updateUnit = async (req, res) => {
//   console.log(req.body, 'sdfsdfsdf')
//   const { id } = req.params; // Extract unit ID from URL params
//   const { unit_name, programs } = req.body; // Extract updated data from request body

//   try {
//     // Use Mongoose to find the unit by its ID and update its fields
//     const updatedUnit = await Unit.findByIdAndUpdate(
//       id,
//       { unit_name, programs },
//       { new: true } // Return the updated unit
//     );

//     if (!updatedUnit) {
//       return res.status(404).json({ message: "Unit not found" });
//     }

//     res.status(200).json({ message: "Unit updated successfully", unit: updatedUnit });
//   } catch (error) {
//     console.error("Error updating unit:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }


const updateUnit = async (req, res) => {
  console.log(req.body, 'sdfsdfsdf');
  const { id } = req.params; // Extract unit ID from URL params
  const { name, programIds } = req.body; // Extract updated data from request body

  try {
    // Use Mongoose to find the unit by its ID and update its fields
    const updatedUnit = await Unit.findByIdAndUpdate(
      id,
      {
        unit_name: { _id: name, company_name: name }, // Update unit_name field
        programs: programIds.map((programId) => ({ _id: programId })), // Update programs field
      },
      { new: true }
    );

    if (!updatedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    res.status(200).json({ message: "Unit updated successfully", unit: updatedUnit });
  } catch (error) {
    console.error("Error updating unit:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete unit by ID
const deleteUnit = asyncHandler(async (req, res) => {
  const unitId = req.params.id;

  const unit = await Unit.findById(unitId);

  if (!unit) {
    res.status(404);
    throw new Error("Unit not found");
  }

  await Unit.deleteOne({ _id: unitId });

  res.status(200).json({
    message: `Unit deleted successfully`,
  });
});

// Add multiple programs to a location
const addProgramsToLocation = asyncHandler(async (req, res) => {
  const { unitId } = req.params;
  const { name, programIds } = req.body;

  const unit = await Unit.findById(unitId);
  const programs = await Program.find({ _id: { $in: programIds } });

  if (!unit || !programs) {
    res.status(404).json(`Unit or Programs not found`);
  }

  const existingUnit = await Unit.findOne({
    unit_name: name,
  });

  if (existingUnit && existingUnit._id.toString() !== unitId) {
    res.status(400).json(`Unit already exists!`);
  }

  const unitToUpdate = await Unit.findOneAndUpdate(
    {
      _id: unitId,
    },
    {
      unit_name: name,
      programs: programIds,
    }
  );

  await unitToUpdate.save();

  res.status(200).json({
    message: `Unit updated successfully`,
    unit: unit,
  });
});

module.exports = {
  getUnits,
  createUnit,
  deleteUnit,
  updateUnitName,
  getUnitById,
  addProgramsToLocation,
  updateUnit
};
