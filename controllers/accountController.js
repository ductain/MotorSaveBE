const accountService = require("../services/accountService");

const register = async (req, res) => {
  try {
    const { username, password, fullName, phone } = req.body;

    // Validate required fields
    if (!username || !password || !fullName || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ message: "Số điện thoại phải là 10 chữ số" });
    }

    // Call the service to handle registration
    const result = await accountService.register({
      username,
      password,
      fullName,
      phone,
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

const registerStaffAccount = async (req, res) => {
  try {
    const { username, password, fullName, phone, roleId } = req.body;

    // Validate required fields
    if (!username || !password || !fullName || !phone || !roleId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ message: "Số điện thoại phải là 10 chữ số" });
    }

    // Call the service to handle registration
    const result = await accountService.registerStaffAccount({
      username,
      password,
      fullName,
      phone,
      roleId
    });

    // Respond with success
    res.status(201).json(result);
  } catch (err) {
    // Handle errors returned by the service
    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    console.error("Error during registration staff account:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Validate required fields
    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Cần Username/Phone và password." });
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

const getProfileById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await accountService.getProfileById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching stations:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const result = await accountService.sendOtp(email);
//     res.status(result.status).json({ message: result.message });
//   } catch (err) {
//     console.error("Error sending OTP:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const result = await accountService.verifyOtp(email, otp);
//     res.status(result.status).json({ message: result.message });
//   } catch (err) {
//     console.error("Error verifying OTP:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const resetPassword = async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;
//     const result = await accountService.resetPassword(email, newPassword);
//     res.status(result.status).json({ message: result.message });
//   } catch (err) {
//     console.error("Error resetting password:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const updateAccountProfile = async (req, res) => {
  try {
    const accountId = req.user.id;
    const { fullname, email, gender, dob, address, licenseplate, avatar } = req.body;

    // if (!fullname || !gender || !dob || !address || !licenseplate || !avatar) {
    //   return res.status(400).json({ error: "All fields are required" });
    // }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob) && dob !== null) {
      return res.status(400).json({ error: "Invalid date format, use YYYY-MM-DD" });
    }

    const result = await accountService.updateAccountProfile(accountId, fullname, email, gender, dob, address, licenseplate, avatar);
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "Account Not Found") {
      return res.status(404).json({ error: "Account not found" });
    }
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStaffList = async (req, res) => {
  try {
    const staffs = await accountService.getAllStaffs();
    res.status(200).json(staffs);
  } catch (err) {
    console.error("Error fetching staff list:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTotalAccounts = async (req, res) => {
  try {
    const totalAccounts = await accountService.getTotalAccounts();
    return res.status(200).json({ totalAccounts });
  } catch (error) {
    console.error("Error fetching total accounts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register: register,
  registerStaffAccount,
  login: login,
  getProfileById: getProfileById,
  updateAccountProfile: updateAccountProfile,
  getStaffList,
  getTotalAccounts: getTotalAccounts,
};
