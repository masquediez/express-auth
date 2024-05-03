const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../database/models/UserModel");

async function authMiddleWare(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token de acceso no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Usuario no encontrado" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Token de acceso inválido o expirado" });
  }
}

module.exports = authMiddleWare;
