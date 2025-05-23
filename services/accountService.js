const query = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

const register = async (userData) => {
  const { username, password, fullName, phone } = userData;

  // Check if username or phone already exists
  const checkQuery = `
      SELECT * FROM accounts 
      WHERE username = $1 OR phone = $2
    `;
  const existingUser = await query(checkQuery, [username, phone]);
  if (existingUser.rows.length > 0) {
    const error = new Error("Username hoặc phone đã tồn tại.");
    error.statusCode = 404;
    throw error;
  }

  // Validate password length
  if (password.length < 6) {
    const error = new Error("Password phải có ít nhất 6 ký tự.");
    error.statusCode = 400;
    throw error;
  }

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Set default values
  const roleId = 1;
  const statusId = 1;
  const createdDate = new Date();
  const updatedDate = createdDate;

  // Insert the new user into the database
  const insertQuery = `
      INSERT INTO accounts 
      (username, password, fullname, phone, createddate, updateddate, roleid, statusid)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
  await query(insertQuery, [
    username,
    hashedPassword,
    fullName,
    phone,
    createdDate,
    updatedDate,
    roleId,
    statusId,
  ]);

  // Return success message and user ID
  return {
    message: "Đăng ký thành công!",
  };
};

const isFieldExists = async (fieldName, fieldValue) => {
  // Validate fieldName against allowed fields to prevent SQL injection
  const checkQuery = `
    SELECT * FROM accounts 
    WHERE ${fieldName} = $1
  `;
  const result = await query(checkQuery, [fieldValue]);
  return result.rows.length > 0;
};


const registerStaffAccount = async (userData) => {
  const { username, password, fullName, phone, roleId } = userData;

  // Check if username or phone already exists
  const checkQuery = `
      SELECT * FROM accounts 
      WHERE username = $1 OR phone = $2
    `;
  const existingUser = await query(checkQuery, [username, phone]);
  if (existingUser.rows.length > 0) {
    const error = new Error("Username hoặc phone đã tồn tại.");
    error.statusCode = 404;
    throw error;
  }

  // Validate password length
  if (password.length < 6) {
    const error = new Error("Password phải có ít nhất 6 ký tự.");
    error.statusCode = 400;
    throw error;
  }

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Set default values, role is preset by the
  const statusId = 1;
  const createdDate = new Date();
  const updatedDate = createdDate;

  // Insert the new user into the database
  const insertQuery = `
      INSERT INTO accounts 
      (username, password, fullname, phone, createddate, updateddate, roleid, statusid)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
  await query(insertQuery, [
    username,
    hashedPassword,
    fullName,
    phone,
    createdDate,
    updatedDate,
    roleId,
    statusId,
  ]);

  // Return success message and user ID
  return {
    message: "Đăng ký tài khoản nhân viên thành công!",
  };
};

const login = async (identifier, password) => {
  // Query the database for the user by username or phone
  const userQuery = `SELECT * FROM accounts WHERE username = $1 OR phone = $1`;
  const result = await query(userQuery, [identifier]);

  if (result.rows.length === 0) {
    const error = new Error("Sai username hoặc phone hoặc password.");
    error.statusCode = 401;
    throw error;
  }

  const user = result.rows[0];

  // Verify the password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    const error = new Error("Sai username hoặc phone hoặc password.");
    error.statusCode = 401;
    throw error;
  }

  const roleResult = await query(`SELECT name FROM roles WHERE id = $1`, [
    user.roleid,
  ]);
  const roleName = roleResult.rows[0]?.name || "Unknown";

  const token = jwt.sign({ id: user.id, role: roleName }, SECRET_KEY);

  const {
    id,
    password: userPassword,
    roleid,
    otp,
    otpexpiry,
    ...userInfo
  } = user;

  return {
    user: { ...userInfo, role: roleName },
    token,
  };
};

const getProfileById = async (userId) => {
  const result = await query(`SELECT * FROM accounts WHERE id = $1`, [userId]);
  const user = result.rows[0];
  const {
    id,
    password: userPassword,
    roleid,
    otp,
    otpexpiry,
    ...userInfo
  } = user;
  return {
    ...userInfo,
  };
};

// const sendOtp = async (email) => {
//   // Check if the email exists in the database
//   const result = await query("SELECT * FROM accounts WHERE email = $1", [
//     email,
//   ]);
//   const user = result.rows[0];
//   if (!user) {
//     return { status: 404, message: "Không tìm thấy email!" };
//   }

//   // Generate a random 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000);

//   // Save the OTP and expiry time to the database
//   const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
//   await query(`UPDATE accounts SET otp = $1, otpExpiry = $2 WHERE email = $3`, [
//     otp,
//     otpExpiry,
//     email,
//   ]);

//   // Send the OTP via email
//   const mailOptions = {
//     from: {
//       name: "MotorSave",
//       address: process.env.EMAIL,
//     },
//     to: email,
//     subject: "Password Reset OTP",
//     text: `Your OTP for password reset is: ${otp}`,
//   };

//   await transporter.sendMail(mailOptions);

//   return { status: 200, message: "OTP gửi thành công!" };
// };

// const verifyOtp = async (email, otp) => {
//   const result = await query("SELECT * FROM accounts WHERE email = $1", [
//     email,
//   ]);
//   const user = result.rows[0];

//   if (!user) {
//     return { status: 404, message: "Không tìm thấy email!" };
//   }

//   if (user.otp !== otp || new Date(user.otpExpiry) < new Date()) {
//     return { status: 400, message: "OTP không hợp lệ hoặc hết hạn!" };
//   }

//   return { status: 200, message: "Xác thực OTP thành công!" };
// };

// const resetPassword = async (email, newPassword) => {
//   if (newPassword.length < 6) {
//     return { status: 400, message: "Password phải có ít nhất 6 ký tự!" };
//   }
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   await query(
//     `UPDATE accounts SET password = $1, otp = NULL, otpExpiry = NULL WHERE email = $2`,
//     [hashedPassword, email]
//   );

//   return { status: 200, message: "Cập nhật password thành công!" };
// };

const updateAccountProfile = async (accountId, fullname, email, gender, dob, address, licenseplate, avatar) => {
  const existingAccount = await query(`SELECT * FROM accounts WHERE id = $1`, [accountId]);

  if (existingAccount.rowCount === 0) {
    throw new Error("Account Not Found");
  }

  const updateQuery = `
    UPDATE accounts 
    SET fullname = $1, email = $2, gender = $3, dob = $4, address = $5, licenseplate = $6, avatar = $7, updateddate = NOW()
    WHERE id = $8
  `;

  await query(updateQuery, [fullname, email, gender, dob, address, licenseplate, avatar, accountId]);

  return { message: "Profile updated successfully" };
};

const getAllStaffs = async () => {
  const results = await query(`
    SELECT
  a.id AS staffid,
  a.username,
  a.fullname,
  a.email,
  a.phone,
  r.id AS roleid,
  r.name AS rolename,
  sis.id AS stationid,
  s.name AS stationname,
  a.statusid,
  ds.name AS statusname,
  a.createddate,
  a.updateddate
FROM accounts a
LEFT JOIN roles r ON r.id = a.roleid
LEFT JOIN staffinstation sis ON sis.staffid = a.id
LEFT JOIN stations s ON s.id = sis.stationid
LEFT JOIN dbstatus ds ON ds.id = a.statusid
WHERE a.roleid = 3 OR a.roleid= 4`);
  return results.rows;
};

const getTotalAccounts = async () => {
  try {
    const result = await query("SELECT COUNT(*) AS total FROM accounts");
    return result.rows[0].total;
  } catch (error) {
    console.error("Error getting total accounts:", error);
    throw error;
  }
};

module.exports = {
  register: register,
  isFieldExists,
  registerStaffAccount,
  login: login,
  getProfileById: getProfileById,
  updateAccountProfile: updateAccountProfile,
  getAllStaffs,
  getTotalAccounts: getTotalAccounts,
};
