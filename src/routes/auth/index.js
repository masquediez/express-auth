const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../src/database/models/UserModel");

const AuthRouter = Router();

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Correo electrónico o contraseña incorrectos" });
    }

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    // Enviar el token como respuesta
    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error interno del servidor" });
  }
});

AuthRouter.post("/signup", async (req, res) => {
  const { email, password, name, profileImgUrl } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      profileImgUrl,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "secretKey", {
      expiresIn: "1h",
    });

    res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    console.error("Error al registrarse:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error interno del servidor" });
  }
});

module.exports = { AuthRouter };
