import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    domain:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Domain",
    },
    like:{
        type:Number,
        default:0
    },
    comment:{
        type:Array,
        default:[],
        Date:{
            type:Date,
            default:Date.now()
        }
    }
},{timestamps:true})

const Project = mongoose.model("Project",projectSchema);
export default Project;
