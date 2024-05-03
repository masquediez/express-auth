const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");

const UserRouter = Router();

// GET REQUESTS
UserRouter.get("/currentuser", async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Usuario no encontrado" });
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
});

module.exports = { UserRouter };
