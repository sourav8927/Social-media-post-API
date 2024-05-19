require("dotenv").config();
const express=require("express");
const router = require("./router/auth-router");
const socialPostRouter = require("./router/socialPost-routes");
const app=express();
const connectDb=require("./utils/db");
const CryptoJS=require("crypto-js");

app.use(express.json());
app.use("/api/auth",router);
app.use("/api/socialPost",socialPostRouter);
//step-1 using only server.js
// app.get("/register",(req,res)=>{
//     res.status(200).send("This is register page");
// });


//.......Data Encryption & Decryption....//
function encrypt(data,key){
    const cipherText=CryptoJS.AES.encrypt(data,key).toString();
    return cipherText;
}

function decrypt(cipherText,key){
    try {
        const bytes=CryptoJS.AES.decrypt(cipherText,key);

        if(bytes.sigBytes>0){
            const decryptedData=bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData;
        }
    } catch (error) {
        res.status(500).json({msg:"Decryption failed Invalid key"});
    }
}
app.post("/encrypt",(req,res)=>{
    const {data,key}=req.body;
    const encrypted= encrypt(data,key);
    res.json({encrypted});
});

app.post("/decrypt",(req,res)=>{
    const {encryptedData,key}= req.body;

    const decryptedData= decrypt(encryptedData,key);
    res.json({decryptedData});
})

//....... END Data Encryption & Decryption....//

const hostname="127.0.0.1";
const PORT=80;
connectDb().then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`server is running at: http://${hostname}:${PORT}`);
    });
});