const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid!" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
};

const verifyDriver = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "Driver" || req.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({ message: "You need to login as Driver or Admin" });
    }
  });
};

const verifyMechanic = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "Mechanic" || req.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({ message: "You need to login as Mechanic or Admin" });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({ message: "You need to login as Admin" });
    }
  });
};

module.exports = {
  verifyToken: verifyToken,
  verifyDriver: verifyDriver,
  verifyMechanic: verifyMechanic,
  verifyAdmin: verifyAdmin,
};
