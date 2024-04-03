const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel.js");
const jwt = require('jsonwebtoken');

const signInAdmin = asyncHandler(async (req, res) => {
    try {
        console.log("api hit");
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Direct comparison of passwords, to be replaced with bcrypt comparison
      if (password !== admin.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Assuming the secret key is 'your-secret-key', replace with your actual secret key
      const token = jwt.sign({ adminId: admin._id }, 'your-secret-key', { expiresIn: '1h' });
  
      res.status(200).json({
        message: "Success, Admin signed in successfully",
        token,
        admin: {
          id: admin._id,
          email: admin.email,
        },
      });
    } catch (error) {
      console.error("SignIn Admin Error:", error);
      res.status(500).json({ message: "Server error during admin sign-in" });
    }
  });
  

const createAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingEmail = await Admin.findOne({ email });
  if (existingEmail) {
    res.status(400).json({ message: "email already exist" });
  }

  const admin = await Admin.create(req.body);

  try {
    const newAdmin = await admin.save();
    res.status(200).json({
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create admin", error: error.message });
  }
});


module.exports = {
  createAdmin,
  signInAdmin,
};
