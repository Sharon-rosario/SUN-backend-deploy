const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Employee = require("../models/EmployeeModel");
// const TimeSlotModel = require("../models/TimeSlotModel");
const AssignmentModel = require("../models/AssignmentModel");
const EmployeeModel = require("../models/EmployeeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const CompanyModel = require("../models/CompanyModel");
const Company = require("../models/CompanyModel");
const ObjectId = mongoose.Types.ObjectId;
const TimeSlot = require("../models/TimeSlotModel");
const nodemailer = require('nodemailer');


// Get all employee
const getEmployees = asyncHandler(async (req, res) => {
  try {
    // const employees = await Employee.find({}, { password: 0 }).populate("timeSlots");
    const employees = await Employee.find({}).populate("timeSlots")
      .populate("company");

    // const employees = await Employee.find({})
    // Exclude the password field from the response
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});


// Get employee by Id
const getEmployeeById = asyncHandler(async (req, res) => {
  try {
    const employeeId = req.params.id;

    // const employee = await Employee.findById(employeeId).select({ password: 0 }).populate("timeSlots")
      // .populate("company");
;
    const employee = await Employee.findById(employeeId).populate("timeSlots")
      .populate("company");
;
    // Exclude the password field from the response
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json(employee);
    }
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    res.status(500).json({ message: "Failed to fetch employee" });
  }
});

// Add new employee
const createEmployee = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      password,
      evv,
      role,
      phoneNumber,
      email,
      address,
      relativeNameFirst,
      relativeContactFirst,
      relativeNameSecond,
      relativeContactSecond,
      availability,
      timeSlots,
      image,
      units,
      company,
    } = req.body;

    if (
      !name ||
      !evv ||
      !password ||
      !role ||
      !phoneNumber ||
      !email ||
      !address ||
      !relativeContactFirst ||
      !relativeNameFirst ||
      !availability ||
      !timeSlots
    ) {
      res.status(400).json({ message: "Required fields are missing" });
      return;
    }

    // Hash the password using bcrypt
    // const hashedPassword = await bcrypt.hash(password, 10);

    const existingContactNo = await Employee.findOne({ phoneNumber });
    const existingEmail = await Employee.findOne({ email });

    if (existingContactNo) {
      res.status(422).json({
        message:
          "Contact Number already in use. Please enter a new number and try again",
      });
      return;
    } else if (existingEmail) {
      res.status(422).json({
        message: "Email already in use. Please enter a new email and try again",
      });
      return;
    }

    const employee = await Employee.create({
      name,
      // password: hashedPassword,
      password: password,
      evv,
      role,
      phoneNumber,
      email,
      address,
      relativeNameFirst,
      relativeContactFirst,
      relativeNameSecond: relativeNameSecond || "NA",
      relativeContactSecond: relativeContactSecond || "NA",
      availability,
      timeSlots,
      image,
      units,
      company
    });

    res.status(201).json({
      message: "Entry added successfully",
      employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete employee by ID
const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    await Employee.deleteOne({ _id: employeeId });

    res.status(200).json({
      message: `Employee deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Failed to delete employee" });
  }
});

// Update fields of employee
const updateEmployeeInfo = asyncHandler(async (req, res) => {
  console.log("skdfjkshdfsdfjhsdfshdfsgdfsdf")
  try {
    const { employeeId } = req.params;
    const {
      name,
      password,
      evv,
      role,
      phoneNumber,
      email,
      address,
      relativeNameFirst,
      relativeContactFirst,
      relativeNameSecond,
      relativeContactSecond,
      availability,
      timeSlots,
      units,
      image,
    } = req.body;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    // if (password) {
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   employee.password = hashedPassword;
    // }

    employee.password = password;
    employee.name = name;
    employee.evv = evv;
    employee.role = role;
    employee.phoneNumber = phoneNumber;
    employee.email = email;
    employee.address = address;
    employee.relativeNameFirst = relativeNameFirst;
    employee.relativeContactFirst = relativeContactFirst;
    employee.relativeNameSecond = relativeNameSecond
      ? relativeNameSecond
      : "NA";
    employee.relativeContactSecond = relativeContactSecond
      ? relativeContactSecond
      : "NA";
    employee.availability = availability;
    employee.timeSlots = timeSlots;
    employee.image = image;
    employee.units = units;
    await employee.save();

    res.status(200).json({
      message: `Employee data updated successfully`,
      employee: employee,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// const getEmployeeByTimeSlot = async (req, res) => {
//   const { timeSlotId } = req.query; // Assuming time slot ID is passed as a query parameter

//   try {
//       const employee = await Employee.find({
//           'timeSlots._id': timeSlotId // Use the dot notation to query inside an array of subdocuments
//       });

//       if (employee.length === 0) {
//           return res.status(404).send({ message: 'No employee found for the specified time slot.' });
//       }

//       res.status(200).json(employee);
//   } catch (error) {
//       res.status(500).send({ message: 'Error fetching employee by time slot', error });
//   }
// };

const getEmployeeByTimeSlot = async (req, res) => {
  try {
    const timeSlotId = req.query.timeSlot;

    if (!timeSlotId) {
      return res.status(400).json({ message: "TimeSlot ID is required" });
    }

    const employee = await Employee.aggregate([
      {
        $lookup: {
          from: "timeslots", // Ensure this matches your time slots collection name
          localField: "timeSlots", // Assuming this is the correct field name in Employee schema
          foreignField: "_id", // Field in time slots collection to match on
          as: "timeSlotDetails",
        },
      },
      {
        $unwind: "$timeSlotDetails", // Unwind the array to filter each employee document
      },
      {
        $match: {
          "timeSlotDetails._id": new mongoose.Types.ObjectId(timeSlotId), // Correctly matching against ObjectId
        },
      },
    ]);

    res.json(employee);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching employee by time slot",
      error: error.message,
    });
  }
};

// const getAvailableEmployees = async (req, res) => {
//   try {
//     const { date, timeSlotId, role } = req.query;

//     console.log(req.query);

//     // Find all employees with the specified role
//     let employees = await EmployeeModel.find({ role: role });

//     // Filter employees who are not assigned to any tasks at the given time slot on the specified date
//     const availableEmployees = [];
//     for (let emp of employees) {
//       const assignments = await AssignmentModel.find({
//         employee: emp._id,
//         timeSlot: timeSlotId,
//         assignmentDate: new Date(date), // Make sure to adjust date format if necessary
//       });

//       if (assignments.length === 0) {
//         // This employee is available
//         availableEmployees.push(emp);
//       }
//     }

//     res.json(availableEmployees);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

const getAvailableEmployees = async (req, res) => {
  const { date, role } = req.query;
  console.log(date, role);
  try {
    // Find employees who have availability on the given date and match the provided role
    const availableEmployees = await EmployeeModel.find({
      role: role, // Match the provided role
      availability: date, // Check if the provided date matches any day in the availability array
    });

    // Return the list of available employees
    res.json(availableEmployees);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Failed to fetch available employees." });
  }
};

// const getAvailableEmployees = async (req, res) => {
//   try {
//     const { date, timeSlotId, role } = req.query;
//     const dayOfWeek = new Date(date)
//       .toLocaleString("en-US", { weekday: "long" })
//       .toLowerCase();

//     // Assuming your timeSlotId and role are correctly passed and exist
//     let query = {
//       role: role,
//       availability: dayOfWeek, // Ensure employees are available on this day
//       // You might need to adjust the availability check based on your data
//     };

//     // First, find employees who are potentially available based on role and availability
//     let availableEmployees = await Employee.find(query);

//     // Filter out employees who are already assigned to the given time slot on this date
//     availableEmployees = availableEmployees.filter(async (emp) => {
//       const assignments = await AssignmentModel.find({
//         employee: emp._id,
//         timeSlot: timeSlotId,
//         assignmentDate: {
//           $gte: new Date(date).setHours(0, 0, 0, 0),
//           $lte: new Date(date).setHours(23, 59, 59, 999),
//         },
//       });
//       return assignments.length === 0;
//     });

//     res.json(availableEmployees);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

// const fetchEmployees = async (req, res) => {
//   try {
//     const { timeSlotId } = req.query;
//     // Get all employees
//     const employees = await EmployeeModel.find();
//     // Get assignments for the selected time slot
//     const assignments = await AssignmentModel.find({ timeSlot: timeSlotId });

//     // Filter out the employees who are already assigned to the selected time slot
//     const availableEmployees = employees.filter(employee => {
//       return !assignments.some(assignment => assignment.employee.equals(employee._id));
//     });

//     res.json(availableEmployees);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch employees for the selected time slot." });
//   }
// }

const fetchEmployees = async (req, res) => {
  try {
    const { timeSlotId, role, date } = req.query;
    console.log(`timeSlotId: ${timeSlotId}, role: ${role}, date: ${date}`);
    // console.log(timeSlotId, role, date, "query");
    // Prepare query to filter employees based on role

    const employee = await Employee.findOne({ timeSlots: timeSlotId }).populate(
      "timeSlots"
    );
    const roleQuery = role ? { role } : {};

    const timeSlot = await TimeSlot.findById(timeSlotId);

    // Get all employees matching the role
    const employees = await EmployeeModel.find(roleQuery);

    if (!timeSlotId) {
      // If no time slot selected, return all employees for the selected date
      const availableEmployees = employees.map((employee) => ({
        _id: employee._id,
        name: employee.name,
        role: employee.role,
      }));
      res.json(availableEmployees);
      return;
    }

    // Convert timeSlotId to ObjectId
    const timeSlotObjectId = ObjectId.isValid(timeSlotId)
      ? new ObjectId(timeSlotId)
      : null;

    // Get assignments for the selected time slot and date
    const assignments = await AssignmentModel.find({
      timeSlot: timeSlotObjectId,
      assignmentDate: date,
    });

    // Filter out the employees who are already assigned to the selected time slot and date
    const availableEmployees = employees
      .filter((employee) => {
        return !assignments.some((assignment) =>
          assignment.employee.equals(employee._id)
        );
      })
      .map((employee) => ({
        _id: employee._id,
        name: employee.name,
        role: employee.role,
        timeSlot_name: timeSlot.timeSlot_name,
      }));

    console.log("available employees", availableEmployees);
    res.json(availableEmployees);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch employees for the selected time slot.",
    });
  }
};
// employee signin
// const employeeSignin = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const employee = await Employee.findOne({ email });
//     if (!employee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }
//     // const passwordMatch = await bcrypt.compare(password, employee.password);

//     const passwordMatch = employee.password === password;

//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }
//     const token = jwt.sign(
//       { email: employee.email, userId: employee._id },
//       "your-secret-key",
//       { expiresIn: "1h" }
//     );
//     res.status(200).json({
//       message: "Success, Employee signed in successfully",
//       token,
//       employee: {
//         id: employee._id,
//         email: employee.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error during sign-in:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// --- company name
const employeeSignin = asyncHandler(async (req, res) => {
  const { email, password, company: companyName } = req.body;

  try {
    // Find the employee by email
    const employee = await Employee.findOne({ email }).populate('company');

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Check if the provided password matches
    const passwordMatch = employee.password === password;
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided company name matches the employee's company
    if (employee.company && employee.company.company_name !== companyName) {
      return res.status(403).json({ error: "Invalid company" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: employee.email, userId: employee._id },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    // Prepare the employee response data
    const employeeData = {
      id: employee._id,
      email: employee.email,
      company: employee.company
        ? {
            id: employee.company._id.toString(),
            company_name: employee.company.company_name,
          }
        : null,
      role: employee.role,
    };

    res.status(200).json({
      message: "Success, Employee signed in successfully",
      token,
      employee: employeeData,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Internal server error", error });
  }
});


// const employeeSignin = asyncHandler(async (req, res) => {
//   const { email, password, company: companyId } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }

//   if (!password) {
//     return res.status(400).json({ error: "Password is required" });
//   }

//   if (!companyId) {
//     return res.status(400).json({ error: "Company ID is required" });
//   }

//   // Check if the company exists
//   const companyExists = await Company.findById(companyId);
//   if (!companyExists) {
//     return res.status(404).json({ error: "Company not found" });
//   }

//   // Find the employee by email and password
//   let employee = await Employee.findOne({ email, password });
//   if (!employee) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   // Update the employee's company association
//   employee.company = companyId;
//   await employee.save();

//   // Optionally populate the company details
//   employee = await Employee.findOne({ _id: employee._id }).populate({
//     path: "company",
//     select: "company_name",
//   });

//   const token = jwt.sign(
//     { email: employee.email, userId: employee._id },
//     "your-secret-key",
//     { expiresIn: "1h" }
//   );

//   res.status(200).json({
//     message: "Success, Employee signed in successfully",
//     token,
//     employee: {
//       id: employee._id,
//       email: employee.email,
//       company: employee.company ? {
//         id: employee.company._id.toString(),
//         company_name: employee.company.company_name,
//       } : null,
//       role: employee.role,
//     },
//   });
// });


// reset password




const setEmployeeToggle = asyncHandler(async (req, res) => {
  const employeeId = req.body.employeeId;
  const isReadyForExtraHours = req.body.ready_to_work_extra_hours;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    employee.ready_to_work_extra_hours = isReadyForExtraHours;
    await employee.save();

    // Fetch the updated employee with the new data
    // const updatedEmployee = await Employee.findById(employeeId);

    // Send the updated employee details in the response
    // res.status(200).json({ message: 'Employee updated successfully.', updatedEmployee });
    res.status(200).json({ message: "Employee updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});

const updateEmployee = async (req, res) => {
  // console.log("chahinaaz")
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        // runValidators: true,
      }
    )
    .populate("timeSlots")
    .populate("company");

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Include the success message in the same JSON object as the updatedEmployee data
    res.status(200).json({
      message: "Employee Updated Successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getEmployeeForProfilePage = asyncHandler(async (req, res) => {
  console.log('jsdghfjhsgdfhsdf')
  const { id } = req.params; 
  try {
    const employee = await Employee.findById(id, 'name email phoneNumber address image availability timeSlots').populate('timeSlots')

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Transform the employee's data to match your specific output format
    const transformedEmployee = {
      name: employee.name,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      address: employee.address,
      image: employee.image,
      availability: employee.availability,
      timeSlots: employee.timeSlots,
    };

    res.status(200).json(transformedEmployee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Failed to fetch employee" });
  }
});


// const resetEmployeePassword = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   console.log('api hit.....')
//   try {
//     // Check if the email exists in the Employee model
//     const employee = await Employee.findOne({ email });

//     if (!employee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }

//     // Update the password for the employee
//     // employee.password = await bcrypt.hash(password, 10);
//     employee.password = password;

//     // Save the updated employee
//     await employee.save();

//     // Return success message
//     return res.status(200).json({
//       message: "Success, Employee password reset successfully",
//       employee: {
//         id: employee._id,
//         email: employee.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error during password reset:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

const JWT_SECRET = 'ksjdfkjsdkfjskdjhfjksdhfhskdfjhsdjf';
const OTP_LENGTH = 6; // Length of the OTP

const generateResetPasswordOTP = async (req, res) => {
  try {
    // 1. Find the employee based on the email provided
    const employee = await EmployeeModel.findOne({ email: req.body.email });
    if (!employee) {
      return res.status(404).json({ message: 'No employee found with that email' });
    }

    // 2. Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    console.log(otp);
    // 3. Update the employee record with the OTP and its expiration
    employee.resetPasswordOTP = otp;
    employee.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    try {
      await employee.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving OTP' });
    }

    

    // 4. Send the OTP to the employee's email
    const transporter = nodemailer.createTransport({
      // Your email transport configuration
      service: 'gmail',
      auth: {
        user: 'sharon@ealphabits.com',
        pass: 'garq gtyt qlcb fpzk'
      }
    });

    const mailOptions = {
      from: 'sharon@ealphabits.com',
      to: employee.email,
      subject: 'Password Reset Request',
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>OTP Email</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
    <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center; font-size: 14px; color: #434343;">
        <header>
            <table style="width: 100%;">
                <tbody>
                <tr style="height: 0;">
                <td>
                    <p style="margin: 0; font-size: 24px; line-height: 30px; color: #ffffff; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Sun Home Health</p>
                </td>
                <td style="text-align: right;">
                    <span style="font-size: 16px; line-height: 30px; color: #ffffff; font-weight: 600;">${new Date().toLocaleDateString()}</span>
                </td>
            </tr>
                </tbody>
            </table>
        </header>

        <main>
            <div style="margin: 0; margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
                <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                    <h1 style="margin: 0; font-size: 18px; font-weight: 500; color: #1f1f1f;">Password Reset Request</h1>
                    <h1 style="margin: 0; margin-top: 17px; font-size: 32px; font-weight: 600; color: #1f1f1f;">OTP: ${otp}</h1>
                    <p style="margin: 0; margin-top: 17px; font-size: 14px; font-weight: 400;">You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
                    <p style="margin: 0; margin-top: 17px; font-size: 14px; font-weight: 400;">This OTP will expire in <span style="font-weight: 600; color: #1f1f1f;">10 minutes</span>.</p>
                    <p style="margin: 0; margin-top: 17px; font-size: 14px; font-weight: 600;">Best Regards,<br>Sun-Home-Health</p>
                </div>
            </div>
        </main>

        <footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">
            <p style="margin: 0; margin-top: 40px; font-size: 14px; color: #434343;">Copyright © ${new Date().getFullYear()} Sun-Home-Health. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>

      `,
      text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account. Your one-time password (OTP) is: ${otp} This OTP will expire in 10 minutes. If you did not request this, please ignore this email and your password will remain unchanged.`
    };
  

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error sending OTP email' });
    }

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    // 1. Find the employee based on the OTP
    const employee = await EmployeeModel.findOne({
      resetPasswordOTP: req.body.otp,
      resetPasswordOTPExpires: { $gt: Date.now() }
    });

    if (!employee) {
      return res.status(400).json({ message: 'OTP is invalid or has expired.' });
    }

    // 2. Generate a token to authorize the password reset
    const resetToken = jwt.sign({ email: employee.email }, JWT_SECRET, { expiresIn: '1h' });

    // 3. Return the token in the response
    res.status(200).json({ message: 'OTP verified successfully', resetToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};

const resetPassword = async (req, res) => {
  try {
    // 1. Verify the reset token
    const decoded = jwt.verify(req.body.resetToken, JWT_SECRET);

    // 2. Find the employee based on the decoded email
    const employee = await EmployeeModel.findOne({ email: decoded.email });

    if (!employee) {
      return res.status(404).json({ message: 'No employee found with that email' });
    }

    // 3. Allow the employee to enter a new password
    employee.password = req.body.password;
    employee.resetPasswordOTP = undefined;
    employee.resetPasswordOTPExpires = undefined;

    try {
      await employee.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating password' });
    }

    // 4. Send a confirmation email to the employee
    // const transporter = nodemailer.createTransport({
    //   // Your email transport configuration
    //   service: 'gmail',
    //   auth: {
    //     user: 'sharon@ealphabits.com',
    //     pass: 'garq gtyt qlcb fpzk'
    //   }
    // });

    // const mailOptions = {
    //   from: 'sharon@ealphabits.com',
    //   to: employee.email,
    //   subject: 'Your password has been changed',
    //   text: 'Hello,\n\n' +
    //     'This is a confirmation that the password for your account has just been changed.'
    // };

    // try {
    //   await transporter.sendMail(mailOptions);
    // } catch (err) {
    //   console.error(err);
    //   return res.status(500).json({ message: 'Error sending password confirmation email' });
    // }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error resetting password' });
  }
};


module.exports = {
  updateEmployee,
  getEmployees,
  createEmployee,
  getAvailableEmployees,
  fetchEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployeeInfo,
  getEmployeeByTimeSlot,
  employeeSignin,
  // resetEmployeePassword,
  setEmployeeToggle,
  getEmployeeForProfilePage,

  //auth reset password
  generateResetPasswordOTP,
  verifyOTP,
  resetPassword,
};
