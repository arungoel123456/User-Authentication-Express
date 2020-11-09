const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ajaykumar@12",
  database: "example",
  port: "3306",
});

mysqlConnection.connect((err) => {
  // console.log(err);
  if (!err) {
    console.log("connected");
  } else {
    console.log("not connected");
  }
});

module.exports = mysqlConnection;

// const { createPool } = require("mysql");
// const pool = createPool({
//   host: "localhost",
//   user: "root",
//   password: "ajaykumar@12",
//   database: "example",
//   port: "3306",
// });
// module.exports = pool;
