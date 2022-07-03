const mongoose= require("mongoose");

const car =new mongoose.Schema({
    name:{type:String ,required:true},
    model:{type:Number ,required:true,min:2015},
    pirce:{type:Number ,required:true},
    description:{type:String},
    status:{type:Boolean,required:true},
    //category: objectId
    categoryer:{ type: mongoose.Schema.Types.ObjectId, ref :"category"},
    img:{type:String}
})

module.exports=mongoose.model("Cars",car)