import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    }
},{timestamps:true})

const Domain = mongoose.model("Domain",domainSchema);
export default Domain;