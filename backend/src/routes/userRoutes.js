const express = require("express");
const router = express.Router();
const db = require("../config/db");
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const User = require("../models/user");
const HistoryActions = require("../models/historyActions");
//Pobieranie danych profilu uzytkownika
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.getByUsername(req.username);
    // console.log(user)
    res.json({ username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:username", verifyToken, async (req, res) => {
  try {
    const user = await User.getByUsername(req.params.username);
    if (req.body.password) {
      user.password = req.body.password;
    }
    console.log(user);
    const updatedUser = await user.update(user.username);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", async (req,res)=> {
  try {
    const userId = parseInt(req.query.userId, 10);
    const history = await HistoryActions.getHistoryByUser(userId);
    res.status(200).json(history)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
router.delete("/profile/delAction", async (req,res)=> {
  try {
    const historyId = parseInt(req.query.historyId,10);
    console.log(historyId)
    const result = await HistoryActions.deleteHistoryById(historyId);
    res.status(200).json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
