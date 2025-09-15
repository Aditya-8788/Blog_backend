const { verifyToken, extractTokenFromRequest } = require("../utils/jwt");

const protect = (req, res, next) => {
  const token = extractTokenFromRequest(req);
  if (!token) return res.status(401).json({ msg: "No token, unauthorized" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = protect;
