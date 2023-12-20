const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");
const PlayerRating = require("../models/playerRating");
const PlayerFav = require("../models/playerFav");

//Pobieranie danych profilu uzytkownika
router.post("/playerRate", async (req, res) => {});

router.post("/addToFav", async (req, res) => {
  try {
    const { playerId, userId } = req.body;
    const playerIdAsInt = parseInt(playerId, 10);

    const existingFav = await PlayerFav.findFavPlayersByUser(userId);
    if (existingFav) {
      return res
        .status(400)
        .json({ error: "You have already player in favorites" });
    }
    const playerFav = new PlayerFav(userId, playerIdAsInt);
    const saved = playerFav.save();
    if (saved) {
      res.status(200).json({ message: "Player added to favorites" });
    } else {
      res.status(500).json({ error: "Failed to add player to favorites" });
    }

    // Assuming you want to send a success response
  } catch (error) {
    console.error("Error adding player to favorites:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/isFav", async (req, res) => {
  try {
    const userId = parseInt(req.query.userId,10)
    const playerId = parseInt(req.query.playerId,10);
    const isFavorite = await PlayerFav.checkIfPlayerIsFavorite(userId,playerId);
    res.status(200).json(isFavorite)
  } catch (error) {
    console.error("Error occured: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delFav", async (req,res)=> {
  try {
    const userId = parseInt(req.query.userId, 10);
    const playerId = parseInt(req.query.playerId,10);
    const deleted = await PlayerFav.deleteFav(userId,playerId)
    if(deleted) {
      res.status(200).json(true)
    }
  } catch(error) {
    console.error("Error occurred: ", error);
    res.status(500).json({message: "Internal server error"})
  }
})

module.exports = router;

