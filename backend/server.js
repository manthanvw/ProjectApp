import express from "express";
import dotenv from "dotenv";
dotenv.config({path:".env"})
import mongoose from "mongoose";
import cors from "cors";
import Domain from "./models/domain.models.js";
import Project from "./models/projects.models.js";
// console.log(process.env)
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err)=> console.log(err))


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.post("/api/v1/addDomain",async (req,res)=>{
    const {name,description} = req.body;

    try {
        const domain = new Domain({
            name,
            description
        })
        await domain.save()
        res.status(201)
        .json(domain)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
})

app.post("/api/v1/addProject",async (req,res)=>{
    const {name,description,domain} = req.body;

    try {
        const project = new Project({
            name,
            description,
            domain
        })
        await project.save()
        res.status(201)
        .json(project)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
})

app.get("/api/v1/getDomains",async (req,res)=>{
    try {
        const domains = await Domain.find()
        res.status(200).json({ data: domains });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
})

app.get("/api/v1/getProjects",async (req,res)=>{
    try {
        const projects = await Project.find()
        res.status(200).json({ data: projects });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
});

app.post("/api/v1/addLike",async (req,res)=>{
    const {id} = req.body;
    try {
        const project = await Project.findById(id)
        project.like += 1
        await project.save({validateBeforeSave:false})
        res.status(200)
        .json(project)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
});

app.post("/api/v1/addComment",async (req,res)=>{
    const {id,comment} = req.body;
    try {
        const project = await Project.findById(id);
        project.comment.push(comment);
        await project.save({validateBeforeSave:false})
        res.status(200)
        .json(project)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})