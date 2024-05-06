const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function createAccessToken(userId) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
  console.log("Este es mi token de acceso", accessToken);
  return accessToken;
}

function decodeAccessToken(accessToken) {
  const decodedToken = jwt.verify(accessToken, JWT_SECRET);
  console.log("Este es mi token decodificado", decodedToken);
  return decodedToken;
}

module.exports = { createAccessToken, decodeAccessToken };
