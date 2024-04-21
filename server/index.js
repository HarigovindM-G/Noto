import express, { request } from "express";
import DataModel from "./models/dataModel.js";
import mongoose from "mongoose";
import cors from "cors";
import userModel from "./models/userModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';



const app = express();

app.use(cors());

app.use(express.json());


//connecting the app with mongodb using mongoose

mongoose
  .connect(
    "mongodb+srv://harigovindmg:MocNAy75ZWB4texY@cluster0.6uzqp66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });

// get method

app.get("/", (request, response) => {
  response.status(200).send("Hello can you hear me ?");
});

// creating and posting data into database

app.post("/notes", async (req, resp) => {
  try {

    const datamodel = await DataModel.create(req.body);
    resp.status(200).json(datamodel);

  } catch (error) {
    console.log(error.message);
    resp.status(500).json({ message: error.message });
  }
});

// getting the posted notes

app.get("/notes", async (req, res) => {
  try {
    const { userId } = req.query;

    const datamodel = await DataModel.find({userId});

    res.status(200).json(datamodel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// using params to get notes

app.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const datamodel = await DataModel.findById(id);
    res.status(200).json(datamodel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//updating the database using params

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const datamodel = await DataModel.findByIdAndUpdate(id, req.body);
    if (!datamodel) {
      return res
        .status(404)
        .json({ message: `cannot find a preview with an id ${id}` });
    }
    const updatedData = await DataModel.findById(id);
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//deleting the notes

app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const datamodel = await DataModel.findByIdAndDelete(id);
    if (!datamodel) {
      return res
        .status(404)
        .json({ message: `There is no preview with id ${id}` });
    }
    res.status(200).json(datamodel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//registering

app.post("/user", async (req, res) => {
  try {
    const {email,password,u_name}=req.body

    const hashedPassword=await bcrypt.hash(password,10);
    
    const u_id=uuidv4();

    const usermodel = await userModel.create({email:email, password:hashedPassword, u_name:u_name, u_id:u_id});

    res.status(200).json(usermodel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try{

    const user = await userModel.findOne({ email: email })

    if (user) {
   
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (passwordMatch) {
        res.status(200).json({succes:true,userId:user.u_id});
        
        // req.session.userId = user.u_id;
        
      } else {
        res.status(400).json("The password is incorrect ");
      }
    }else{
      res.status(404).json("No record exits")
    } 
  } catch (error) {
    res.status(500).send(error.message);
  };
});

//setting up listening port
app.listen(4000, () => {
  console.log("Yup listening");
});
