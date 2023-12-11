const express = require('express')
const router = express.Router()
const db = require('../config/db');
const userController = require('../controllers/userController')
const {verifyToken} = require("../middleware/authMiddleware");
const User = require("../models/user");

//Pobieranie danych profilu uzytkownika
router.get('/:username', verifyToken , async (req,res)=> {
    try {
        const user = await User.getByUsername(req.params.username);
        console.log(user)
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:username',verifyToken, async(req,res)=> {
    try {
        const user = await User.getByUsername(req.params.username)
        if(req.body.password) {
            user.password = req.body.password
        }
        console.log(user)
        const updatedUser = await user.update(user.username)
        res.json(updatedUser);

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})


module.exports = router;