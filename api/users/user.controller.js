const {
  create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUserEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    console.log("request", req);
    console.log("body :", body);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection error",
        });
      } else {
        return res.status(200).json({
          success: 1,
          data: results,
        });
      }
    });
  },

  getUserByUserId: (req, res) => {
    const id = req.params.id;
    console.log("id : ", id);
    getUserById(id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else if (!result) {
        return res.json({
          success: 0,
          message: "result not found",
        });
      } else {
        return res.json({
          success: 1,
          data: result,
        });
      }
    });
  },

  getUsersController: (req, res) => {
    getUsers((err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        return res.json({
          success: 1,
          data: result,
        });
      }
    });
  },

  updateUserController: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "failed to update user",
        });
      } else {
        return res.status(200).json({
          success: 1,
          message: "updated succesfully",
        });
      }
    });
  },

  deleteUserController: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.json({
          success: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        message: "User deleted successfully",
      });
    });
  },

  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }

      // const result = compareSync(body.password, results.passwords);
      const result = body.password == results.password;

      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "key", {
          expiresIn: "1h",
        });

        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "invalid token",
        });
      }
    });
  },
};
