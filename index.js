const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

const usersRouter=require("./routes/users")
const carsRouter=require("./routes/cars")
const loginRouter=require("./routes/login")

app.use(cors());
app.use(express.json());




// Import Routers
app.use("/cars",carsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

// Routes Middleware


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
