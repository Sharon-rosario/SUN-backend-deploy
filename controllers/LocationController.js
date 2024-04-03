const asyncHandler = require("express-async-handler");
const Location = require("../models/LocationModel");
const Unit = require("../models/UnitModel");

// Get all locations
const getLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find({}).populate("units");
  res.status(200).json(locations);
});

// Get location by Id
const getLocationById = asyncHandler(async (req, res) => {
  const locationId = req.params.id;

  const location = await Location.findById(locationId).populate("units");

  if (!location) {
    res.status(404).json({ error: "Location not found" });
  } else {
    res.status(200).json(location);
  }
});

// Add new location
// const createLocation = asyncHandler(async (req, res) => {
//   console.log("The request body is :", req.body);
//   const { name } = req.body;
//   if (!name) {
//     res.status(400).json(`Location name is required!`);
//   }
//   const existingLocation = await Location.findOne({
//     location_name: name,
//   });

//   if (existingLocation) {
//     res.status(400).json(`Location already exists!`);
//   } else {
//     const location = await Location.create({
//       location_name: name,
//     });

//     res.status(201).json({
//       message: `Location created successfully`,
//       location: location,
//     });
//   }
// });

const createLocation = asyncHandler(async (req, res) => {
  const { name, unitIds } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).json({ message: "Location name is required!" });
  }
  if (!Array.isArray(unitIds) || !unitIds.length) {
    return res.status(400).json({ message: "Unit IDs are required and must be an array!" });
  }

  // Check if location already exists
  const existingLocation = await Location.findOne({ location_name: name });
  if (existingLocation) {
    return res.status(400).json({ message: "Location already exists!" });
  }

  // Verify units exist
  const units = await Unit.find({ _id: { $in: unitIds } });
  if (units.length !== unitIds.length) {
    return res.status(404).json({ message: "One or more units not found" });
  }

  // Create the location with units
  const location = new Location({
    location_name: name,
    units: unitIds,
  });

  await location.save();

  res.status(201).json({
    message: "Location created successfully with units",
    location,
  });
});


// Update location_name
const updateLocationName = asyncHandler(async (req, res) => {
  const locationId = req.params.id;
  const { name } = req.body;

  try {
    // Find the location by ID
    const location = await Location.findById(locationId);

    if (!location) {
      res.status(404);
      throw new Error("Location not found");
    }

    // Update location_name
    location.location_name = name;
    await location.save();

    res.status(200).json({
      message: `Location updated successfully`,
      location: location,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating location name",
      error: error.message,
    });
  }
});

// Delete location by ID
const deleteLocation = asyncHandler(async (req, res) => {
  const locationId = req.params.id;

  const location = await Location.findById(locationId);

  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }

  await Location.deleteOne({ _id: locationId });

  res.status(200).json({
    message: `Location deleted successfully`,
  });
});

// Update name & units of a location
const addUnitsToLocation = asyncHandler(async (req, res) => {
  const { locationId } = req.params;
  const { name, unitIds } = req.body;

  const location = await Location.findById(locationId);
  const units = await Unit.find({ _id: { $in: unitIds } });

  if (!location || !units) {
    res.status(404).json(`Location or Units not found`);
  }

  const existingLocation = await Location.findOne({
    location_name: name,
  });

  if (existingLocation && existingLocation._id.toString() !== locationId) {
    res.status(400).json(`Location already exists!`);
  }

  const locationToUpdate = await Location.findOneAndUpdate(
    {
      _id: locationId,
    },
    {
      location_name: name,
      units: unitIds,
    }
  );

  await locationToUpdate.save();

  res.status(200).json({
    message: `Location updated successfully`,
    location: location,
  });
});

// Remove multiple units from a location
const removeUnitsFromLocation = asyncHandler(async (req, res) => {
  const { locationId } = req.params;
  const { unitIds } = req.body;

  const location = await Location.findById(locationId);

  if (!location) {
    res.status(404);
    throw new Error(`Location not found`);
  }

  location.units = location.units.filter(
    (unit) => !unitIds.includes(unit.toString())
  );
  await location.save();

  res.status(200).json({
    message: `Units removed from location successfully`,
    location: location,
  });
});

module.exports = {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocationName,
  getLocationById,
  addUnitsToLocation,
  removeUnitsFromLocation,
};
