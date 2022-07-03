const express= require("express");

const {getAllCar,addCar,getCarById,getCarByName,updateCarById,deleteCarbyId,AddCarsByCategory,getCarCategorybyname,search,getCarBycaregoys,getCarStatus}=require("../controllers/cars");

const authentication = require("../middleware/authentication")

const carsRouter =express.Router();

carsRouter.get("/c/:carname",search)

// carsRouter.get("/category/:category",getCarCategorybyname)

carsRouter.post("/category",AddCarsByCategory)
// all this function for cars 
// this fot back car in name
carsRouter.get("/name",getCarByName)

//just the Id car 
carsRouter.get("/:id",getCarById)

//for getallcar
carsRouter.get("/",getAllCar);

// for add
carsRouter.post("/",authentication,addCar);

//for update
carsRouter.put("/:id",updateCarById)

//for delete 
carsRouter.delete("/:id",deleteCarbyId)

carsRouter.get("/category/:category",getCarBycaregoys)

carsRouter.put("/status/:id",getCarStatus)



module.exports =carsRouter;
