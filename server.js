const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./config/connection");
const cors = require("cors");
const logger = require("morgan");

require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
const userRouter = require("./api/users/user.router");

app.use("/api/users", userRouter);

app.get("/api", (req, res) => {
  res.json({
    success: 1,
    message: "This is rest api",
  });
});
app.listen(process.env.APP_PORT, () => {
  console.log("server started running on : ", process.env.APP_PORT);
});
