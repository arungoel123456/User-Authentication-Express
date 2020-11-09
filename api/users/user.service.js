// const { createPool } = require("mysql");
const mysqlConnection = require("../../config/connection");

module.exports = {
  create: (data, callback) => {
    // console.log("data : ", data);
    mysqlConnection.query(
      `select * from registration where email = ? `,
      [data.email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          if (results.length != 0) {
            console.log("Already exist");
            return callback(null, null);
          }
        }
      }
    );

    mysqlConnection.query(
      ` insert into registration(firstName , lastName , email, password , number) values(?,?,?,?,?) `,
      [data.firstName, data.lastName, data.email, data.password, data.number],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        console.log(results);
        return callback(null, results);
      }
    );
  },

  getUsers: (callback) => {
    mysqlConnection.query(
      `select * from registration `,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },

  getUserById: (id, callback) => {
    mysqlConnection.query(
      `select * from registration where id = ? `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  updateUser: (data, callback) => {
    mysqlConnection.query(
      `update registration set firstName = ? , lastName = ? , email = ?, password = ?,  number = ? where id = ?  `,
      [
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.number,
        data.id,
      ],

      (error, results, fields) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results[0]);
        }
      }
    );
  },

  deleteUser: (data, callback) => {
    mysqlConnection.query(
      ` delete from registration where id  ? `,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  getUserByUserEmail: (email, callback) => {
    mysqlConnection.query(
      `select * from registration where email = ? `,
      [email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          console.log("Results: ", results);
          return callback(null, results[0]);
        }
      }
    );
  },
};
