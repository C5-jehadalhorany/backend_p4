const usersModel=require("../models/users")

const register =(req ,res)=>{
    const {name,age,email,password}=req.body
    const user =new usersModel({
        name:name,
        age:age,
        email:email,
        password:password,
    })
    user.save().then((result)=>{
            res.status(201).json({
            success: true,
            message: `Account Created Successfully`,
            result:result
        })
    }).catch((err)=>{
        res.status(409).json({
            success: false,
            message: `${err} err in register`,
        });
    })
};

module.exports={
    register
}