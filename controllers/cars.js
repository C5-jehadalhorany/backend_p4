const cars = require("../models/cars");
const carsModel = require("../models/cars");
const CategoryModel = require("../models/category");

// the function for add the cars
const addCar = (req, res) => {
    const { name, model, pirce, description, status, categoryer, img } = req.body;
    const car = new carsModel({
        name: name,
        model: model,
        pirce: pirce,
        description: description,
        status: status,
        categoryer: categoryer,
        img: img
    });

    car
        .save()
        .then((result) => {
            res.status(201).json({
                success: true,
                message: `car Created Successfully`,
                result: result,
            });
        })
        .catch((err) => {
            res.status(409).json({
                success: false,
                message: `The car already exists`,
            });
        });
};

// this function fro getAllCars
const getAllCar = (req, res) => {
    console.log(req.token);
    carsModel
        .find({}).populate("categoryer")
        .then((result) => {
            if (cars.length) {
                res.status(200).json({
                    success: true,
                    message: `All the cars`,
                    result: result,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: `No cars Yet`,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
            });
        });
};

// the function back car in Id
const getCarById = (req, res) => {
    const { id } = req.params;
    carsModel
        .findById({ _id: id })
        .populate("_id")
        .populate("categoryer")
        .exec()
        .then((result) => {
            console.log(result);
            if (result._id == id) {
                res.status(200).json({
                    success: true,
                    message: `car by id `,
                    result: result,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: `No cars Yet`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
            });
        });
};

// the function back car in name
const getCarByName = (req, res) => {
    const { name } = req.body;
    carsModel
        .findOne({ name: name })
        .populate("name")
        .exec()
        .then((result) => {
            console.log(result);
            if (result.name === name) {
                res.status(200).json({
                    success: true,
                    message: `car by name `,
                    result: result,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: `No cars Yet`,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
            });
        });
};
// updateId for cars لما بدي أستخدم الأبديت  لازم أحطله الأشياء الي بدي أعمل عليها تعديل وبعد هيك لازم أستدعي فايند باي اي دي اند اب ديت وهاي بتوخذ مني 3 براميتر الأول بتوخذه هو عباره عن الأي دي اما ثاني بتوخذه عباره عن الأشياء الي بدي أعمل عليها تعديل أما الثالث  ف هو نيو وبتوخذ قيمة بوليون ترو عشان يعمل تعديل على شي جديد
const updateCarById = (req, res) => {
    const { id } = req.params;
    const { model, pirce, description, status, img, categoryer } = req.body;
    carsModel
        .findByIdAndUpdate(id, { model, pirce, description, status, img, categoryer }, { new: true })
        .then((result) => {
            console.log(result);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: `The car: ${id} is not found`,
                });
            }
            res.status(202).json({
                success: true,
                message: `car updated`,
                result: req.body,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "The car id is not Found",
                err: err,
            });
        });
};

// this is function for delete
const deleteCarbyId = (req, res) => {
    const { id } = req.params;
    carsModel
        .findByIdAndDelete(id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: `The car: ${id} is not found`,
                });
            }
            res.status(200).json({
                success: true,
                message: `car deleted`,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
            });
        });
};

// getCarsByCategory 
/* 
بنسبة ألي هاض الفنكشن كان شوي في صعوبات */

const AddCarsByCategory = (req, res) => {
    const { category } = req.body;
    const newCategory = new CategoryModel({
        category: category,
    });
    newCategory
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                success: true,
                message: "Category added",
                Category: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
            });
        });
};
///--------------------


const getCarCategorybyname = (req, res) => {
    const { category } = req.params
    CategoryModel.find({ category: category })
        .populate("category")
        .exec()
        .then((result) => {
            console.log(result[0].category);
            if (result[0].category == category) {
                res.status(200).json({
                    success: true,
                    message: `Category by id `,
                    result: result,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: `No Category Yet`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
            });
        });
}

const search = (req, res) => {
    const { carname } = req.params
    carsModel.find({}).populate("categoryer").then((result) => {
        if (result.length) {
            result = result.filter((elemnet, index) => {
                return elemnet.name.includes(carname)
            })
            res.status(200).json({
                success: true,
                message: `Category by id `,
                result: result,
            });
        }
    }).catch((err) => {
        console.log(err);
    })
}

const getCarBycaregoys = (req, res) => {
    const { category } = req.params;
    carsModel
        .find({})
        .populate("categoryer")
        .exec()
        .then((result) => {
            if (result.length) {
                result = result.filter((elemnet, index) => {
                    return elemnet.categoryer.category == category
                })
                res.status(200).json({
                    success: true,
                    message: `Category by id `,
                    result: result,
                });
            }
        }).catch((err) => {
            console.log(err);
        })
}


const getCarStatus = (req, res) => {
    Id = req.params.id;
        status = req.body
        carsModel
            .findByIdAndUpdate(Id, status)
            .then((resualt) => {
                console.log(resualt);
                res.status(202).json({
                    success: true,
                    message: "true" ,
                    resualt: resualt,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: "err" ,
                    err: err.message,
                });
            });
}



// const updatepost = (req, res) => {
//     postId = req.params.id;
//     title = req.body
//     postsModel
//         .findByIdAndUpdate(postId, title)
//         .then((resualt) => {
//             console.log(resualt);
//             res.status(202).json({
//                 success: true,
//                 message: post updated,
//                 post: resualt,
//             });
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 success: false,
//                 message: Server Error,
//                 err: err.message,
//             });
//         });
// };




// تصدير عشان أشوفه في مكان ثاني وأقدر أخلي الراوتر يشتغل على الفنكشن
module.exports = {
    getAllCar,
    addCar,
    getCarById,
    getCarByName,
    updateCarById,
    deleteCarbyId,
    AddCarsByCategory,
    getCarCategorybyname,
    search,
    getCarBycaregoys,
    getCarStatus
};
