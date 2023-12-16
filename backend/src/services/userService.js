const db = require("../config/db");

const getUserById = async (userId) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [userId];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getUserById,
};
