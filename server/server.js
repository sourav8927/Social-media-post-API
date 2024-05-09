require("dotenv").config();
const express=require("express");
const router = require("./router/auth-router");
const socialPostRouter = require("./router/socialPost-routes");
const app=express();
const connectDb=require("./utils/db");

app.use(express.json());
app.use("/api/auth",router);
app.use("/api/socialPost",socialPostRouter);
//step-1 using only server.js
// app.get("/register",(req,res)=>{
//     res.status(200).send("This is register page");
// });

const hostname="127.0.0.1";
const PORT=80;
connectDb().then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`server is running at: http://${hostname}:${PORT}`);
    });
});