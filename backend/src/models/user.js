const bcrypt = require("bcrypt");
const db = require("../config/db");

class User {
  constructor(username, password) {
    this.username = username;
    // this.passwordHash = this.hashPassword(password)
    this.passwordHash = password;
  }

  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  checkPassword(password) {
    // return bcrypt.compareSync(password, this.passwordHash);
    return password === this.passwordHash;
  }

  async save() {
    try {
      await db.none("INSERT INTO users(username, password) VALUES($1,$2)", [
        this.username,
        this.passwordHash,
      ]);
      return true;
    } catch (error) {
      console.error("Error saving user", error);
      return false;
    }
  }
  async update(username) {
    try {
      await db.none(
        "UPDATE users SET username = $1, password = $2 WHERE username = $1",
        [username, this.passwordHash],
      );
      return true;
    } catch (error) {
      console.error("Error updating user", error);
      return false;
    }
  }

  static async findByUsername(username) {
    try {
      const userData = await db.oneOrNone(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      if (userData) {
        return new User(userData.username, userData.password);
      }
      return null;
    } catch (error) {
      console.log("Error finding user by username:", error);
      return null;
    }
  }
  static async getById(id) {
    return db.one("SELECT * FROM users WHERE id = $1", [id]);
  }
  static async getByUsername(username) {
    const userData = await db.one("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (userData) {
      return new User(userData.username, userData.password);
    }
  }
}

module.exports = User;
