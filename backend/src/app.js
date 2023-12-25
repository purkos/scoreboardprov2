const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const playerRoutes = require("./routes/playerRoute")
const protectedRoutes = require("./routes/protectedRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:4200", // Update with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

dotenv.config();
const app = express();
const PORT = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// app.use('/users', userRoutes);

//Authentication routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/player",playerRoutes)
//Protected routes
app.use("/protected", protectedRoutes);

app.listen(PORT, () => {
  console.log("Server is running");
});
