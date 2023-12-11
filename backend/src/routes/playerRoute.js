const express = require('express')
const router = express.Router()
const db = require('../config/db');
const {verifyToken} = require("../middleware/authMiddleware");
const PlayerRating = require("../models/playerRating");

//Pobieranie danych profilu uzytkownika
router.post('/playerRate', verifyToken, async (req,res)=> {

})
module.exports = router;