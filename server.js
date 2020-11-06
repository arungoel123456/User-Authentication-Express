const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./config/connection");
require("dotenv").config();
const app = express();

app.use(express.json());
const userRouter = require("./api/users/user.router");

app.use("/api/users", userRouter);

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({
    success: 1,
    message: "This is rest api",
  });
});
app.listen(process.env.APP_PORT, () => {
  console.log("server started running on : ", process.env.APP_PORT);
});
