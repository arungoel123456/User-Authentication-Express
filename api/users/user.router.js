const {
  createUser,
  getUserByUserId,
  getUsersController,
  updateUserController,
  deleteUserController,
  login,
} = require("./user.controller");

const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsersController);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/", checkToken, updateUserController);
router.delete("/", checkToken, deleteUserController);

router.post("/login", login);

module.exports = router;
