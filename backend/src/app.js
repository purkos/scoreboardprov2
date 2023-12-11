const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const protectedRoutes = require('./routes/protectedRoutes')
const dotenv = require('dotenv')


dotenv.config();
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// app.use('/users', userRoutes);

//Authentication routes
app.use('/auth', authRoutes);
app.use('/profile',userRoutes)
//Protected routes
app.use('/protected',protectedRoutes);

app.listen(PORT, ()=> {
    console.log('Server is running')
})
