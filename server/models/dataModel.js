import mongoose from "mongoose";

const dataSchema = mongoose.Schema(
    {
        _id:{
            type:String,
            required:true,
            unique:true
        },
        title:{
            type:String,
            required:true,
        },
        preview:{
            type:String,
            required:true
        },
        data:{
            type:String,
        },
        
        userId:{ 
            type:String,
        },
    },
    {
        timestamps:true
    }
)

export default mongoose.model('DataModel',dataSchema);
