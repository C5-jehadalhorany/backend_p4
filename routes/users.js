const express = require("express")
const {register} =require("../controllers/users");

const users = require("../models/users");

const usersRouter = express.Router();

usersRouter.post("/register",register);

module.exports=usersRouter;