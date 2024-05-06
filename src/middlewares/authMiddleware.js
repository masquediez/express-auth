const { StatusCodes } = require("http-status-codes");
const UserModel = require("../database/models/UserModel");
const { decodeAccessToken } = require("./jwtUtils");

async function authMiddleWare(req, res, next) {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token de acceso no proporcionado" });
    }

    const decodedToken = decodeAccessToken(token);
    const userId = decodedToken.userId;

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
