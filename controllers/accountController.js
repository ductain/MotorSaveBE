const bcrypt = require("bcrypt");
const accountService = require("../services/accountService");

const register = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      fullName,
      gender,
      dob,
      phone,
      address,
      licensePlate,
    } = req.body;

    // Validate required fields
    if (
      !username ||
      !password ||
      !email ||
      !fullName ||
      !gender ||
      !dob ||
      !phone ||
      !address ||
      !licensePlate
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Call the service to handle registration
    const result = await accountService.register({
      username,
      password,
      email,
      fullName,
      gender,
      dob,
      phone,
      address,
      licensePlate,
    });

    // Respond with success
    res.status(201).json(result);
  } catch (err) {
    // Handle errors returned by the service
    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
    try {
      const { identifier, password } = req.body;
  
      // Validate required fields
      if (!identifier || !password) {
        return res.status(400).json({ message: "Cần Username/Phone và password." });
      }
  
      // Call the service to handle login
      const { user, token } = await accountService.login(identifier, password);
  
      // Respond with the JWT token
      res.status(201).json({ user, token, message: "Đăng nhập thành công!" });
    } catch (err) {
      // Handle errors returned by the service
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
  
      console.error("Error during login:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports = {
  register: register,
  login: login,
};
