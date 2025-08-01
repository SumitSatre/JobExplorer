import express from "express";
import jobRoutes from "./routes/job.routes.js";
import dotenv from "dotenv";
dotenv.config({path : "./.env"});

import mongodb from "./config/db.js";       
mongodb();

const app = express();
app.use(express.json());    

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // You can replace '*' with your frontend URL for production
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
    next();
  });

app.get('/' , (req , res)=>{
  res.send("Your Job Explorer backend is running successfully!");
})

app.use('/api/v1' , jobRoutes);

app.listen(process.env.PORT , ()=>{
    console.log(`Working at http://localhost:${process.env.PORT}/`)
});