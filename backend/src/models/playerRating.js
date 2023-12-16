const db = require("../config/db");

class PlayerRating {
  constructor(user_id, player_id, rating, comment) {
    this.user_id = user_id;
    this.player_id = player_id;
    this.rating = rating;
    this.comment = comment;
  }
  //Function to save new player rating
  async save() {
    try {
      await db.none(
        "INSERT INTO playerratings(user_id,player_id,rating, comment) VALUES ($1,$2,$3,$4)",
        [this.user_id, this.player_id, this.rating, this.comment],
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  //Function to get ratings players for user
  static async findPlayerRatingByUser(user_id) {
    try {
      const ratings = await db.oneOrNone(
        "SELECT * FROM playerratings WHERE user_id = $1",
        [user_id],
      );
    } catch (error) {
      console.error("Error finding players rating", error);
      return null;
    }
  }
}
module.exports = PlayerRating;
