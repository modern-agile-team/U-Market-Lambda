const bcrypt = require("bcryptjs");

class Cryptor {
  constructor() {
    this.saltRounds = 10;
  }

  static encrypt(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, (err, salt) => {
        if (err) reject(err);
        else {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) reject(err);
            else resolve({ hash, salt });
          });
        }
      });
    });
  }

  static encryptBySalt(password, salt) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  }
}

module.exports = Cryptor;
