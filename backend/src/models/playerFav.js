const db = require("../config/db");

class PlayerFav {
  constructor(user_id, player_id) {
    this.user_id = user_id;
    this.player_id = player_id;
  }
  //Function to save new player rating
  async save() {
    try {
      await db.none(
        "INSERT INTO favorite_player(user_id,player_id) VALUES ($1,$2)",
        [this.user_id, this.player_id],
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  //Function to get ratings players for user
  static async findFavPlayersByUser(user_id) {
    try {
      const players = await db.oneOrNone(
        "SELECT * FROM favorite_player WHERE user_id = $1",
        [user_id],
      );
    } catch (error) {
      console.error("Error finding favorite players", error);
      return null;
    }
  }
  static async checkIfPlayerIsFavorite(user_id, player_id) {
    try {
      const result = await db.query(
        "SELECT COUNT(*) FROM favorite_player WHERE user_id = $1 AND player_id = $2",
        [user_id, player_id],
      );

      const count = parseInt(result[0].count, 10);
      return count > 0;
    } catch (error) {
      console.error("Error checking if is favorite", error);
    }
  }

  static async deleteFav(user_id, player_id) {
    try {
      const result = await db.query(
        "DELETE FROM favorite_player WHERE user_id = $1 AND player_id = $2",
        [user_id, player_id],
      );
      return result;
    } catch (error) {
      console.log("Error deleting favorite", error);
    }
  }
  static async getFavoritePlayers(user_id) {
    try {
      const result = await db.query(
          "SELECT * FROM favorite_player WHERE user_id = $1",
          [user_id]
      );
      return result;
    } catch(error) {

    }
  }
}
module.exports = PlayerFav;
