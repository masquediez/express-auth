const { Router } = require("express");
const { TodosRouter } = require("./todos");
const { AuthRouter } = require("./auth");
const { UserRouter } = require("./users");
const authMiddleWare = require("../middlewares/authMiddleware");
const logger = require("../services/Logger/Logger");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/users", authMiddleWare, UserRouter);
AppRouter.use("/todos", TodosRouter);
AppRouter.get("/test", (req, res) => {
  logger.debug("Hola Mundo");
  res.json({ myLogLevel: "info" });
});

module.exports = { AppRouter };
