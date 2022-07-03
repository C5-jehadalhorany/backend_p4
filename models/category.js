const mongoose= require("mongoose");

const Category = new mongoose.Schema({

    category:{type: String , required:true ,unique:true},//Hyprid disel electric ole
    // categoryer:{ type: mongoose.Schema.Types.ObjectId, ref :"Cars"}
})

module.exports=mongoose.model("category",Category)