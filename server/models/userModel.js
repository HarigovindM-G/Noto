import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    u_name:String,
    email:String,
    password:String, 
    u_id:String,
})

export default mongoose.model('UserModel',userSchema);