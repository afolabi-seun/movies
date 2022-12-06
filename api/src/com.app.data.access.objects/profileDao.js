var db = require('./baseDao');

class ProfileDAO {

  constructor(userName, password, firstName, lastName, email, address, country) {
    this.userName = userName;
    this.userPswd = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.country = country;
  }

  CreateUserSQL(callback) {
    let params = (`'${this.userName}','${this.userPswd}','${this.firstName}','${this.lastName}',
                   '${this.email}','${this.address}','${this.country}'`);
    let sql = `call proc_user_create(${params})`;
    db.Query(sql, function (err, ret) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, ret);
      }
    });
  }

  static ListUserSQL(obj, callback) {
    let params = (``)
    let sql = `call poc_get_user(${params})`
    db.Query(sql, function (err, ret) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, ret);
      }
    });
  }

  static AuthenticationSQL(obj, callback) {
    let params = (`'${obj.userName}','${obj.password}','${obj.session}',
                  '${obj.channel}','${obj.jsonData}'`);
    let sql = `call proc_validate_user(${params})`;
    db.Query(sql, function (err, ret) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, ret);
      }
    });
  }
}

module.exports = ProfileDAO;