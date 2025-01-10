const query = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET

const register = async (userData) => {
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
  } = userData;

  // Check if username, email, or phone already exists
  const checkQuery = `
      SELECT * FROM accounts 
      WHERE username = $1 OR email = $2 OR phone = $3 OR licenseplate = $4
    `;
  const existingUser = await query(checkQuery, [
    username,
    email,
    phone,
    licensePlate,
  ]);
  if (existingUser.rows.length > 0) {
    const error = new Error(
      "Username, email, phone hoặc licensePlate đã tồn tại."
    );
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
      (username, password, email, fullname, gender, dob, phone, address, licenseplate, createddate, updateddate, roleid, statusid)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
  const result = await query(insertQuery, [
    username,
    hashedPassword,
    email,
    fullName,
    gender,
    dob,
    phone,
    address,
    licensePlate,
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

const login = async (identifier, password) => {
    // Query the database for the user by username or phone
    const userQuery = `SELECT * FROM accounts WHERE username = $1 OR phone = $1`;
    const result = await query(userQuery, [identifier]);
  
    if (result.rows.length === 0) {
      const error = new Error("Sai username/phone hoặc password.");
      error.statusCode = 401;
      throw error;
    }
  
    const user = result.rows[0];
  
    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      const error = new Error("Sai username/phone hoặc password.");
      error.statusCode = 401;
      throw error;
    }

    const roleResult = await query(`SELECT name FROM roles WHERE id = $1`, [user.roleid]);
    const roleName = roleResult.rows[0]?.name || "Unknown";
  
    const token = jwt.sign(
      { id: user.id, role: roleName },
      SECRET_KEY
    );

    const { id, password: userPassword, roleid, ...userInfo } = user;
  
    return { 
      user: { ...userInfo, role: roleName }, 
      token 
    };
  };

module.exports = {
  register: register,
  login: login
};
