const db = require("../config/db");

class HistoryActions {
  constructor(user_id, description,short_desc) {
    this.user_id = user_id;
    this.description = description;
    this.short_desc = short_desc;
  }
  //Function to save new player rating
  async save() {
    try {
      await db.none(
        "INSERT INTO actions_history(user_id,action_description,short_desc) VALUES ($1,$2,$3)",
        [this.user_id, this.description,this.short_desc],
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  static async getHistoryByUser(user_id) {
    try {
      return await db.query(
        "SELECT * FROM actions_history WHERE user_id = $1",
        [user_id],
      );
    } catch (error) {
      console.error("Error finding history", error);
      return null;
    }
  }
  static async deleteHistoryById(history_id) {
    try {
      return await db.query(
        "DELETE FROM actions_history WHERE history_id = $1",
        [history_id],
      );
    } catch (error) {
      console.error("Error deleting history action", error);
      return null;
    }
  }
}
module.exports = HistoryActions;
