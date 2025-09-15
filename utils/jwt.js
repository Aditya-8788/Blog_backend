const jwt = require("jsonwebtoken");

function generateToken(payload, options = { expiresIn: "1d" }) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[JWT] Generated token for payload ${JSON.stringify(payload)}: ${token}`);
  }
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function extractTokenFromRequest(req) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (header) {
    const parts = header.split(" ");
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      const token = parts[1];
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[JWT] Extracted token from header ${req.method} ${req.originalUrl}: ${token}`);
      }
      return token;
    }
  }

  // Fallback: token in query string for easier manual testing
  if (req.query && req.query.token) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[JWT] Extracted token from query ${req.method} ${req.originalUrl}: ${req.query.token}`);
    }
    return req.query.token;
  }

  return null;
}

module.exports = { generateToken, verifyToken, extractTokenFromRequest };


