const mongoose =require("mongoose")
const bcrypt= require("bcrypt")


const UserSchema=new mongoose.Schema({
    name:{type:String},
    age:{type:Number, min:18 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre("save",async function (){
    this.email=this.email;
    this.password=await bcrypt.hash(this.password,5);
});

module.exports=mongoose.model("User",UserSchema);
