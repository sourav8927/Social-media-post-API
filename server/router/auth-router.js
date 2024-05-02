const express=require("express");
const router= express.Router();
const authcontroller=require("../controller/auth-controller");

//step-2 while using router
// router.route("/register").get((req,res)=>{
//     res.status(200).send({id:"64",username:"Sourav karmakar"});
// });

router.route("/register").post(authcontroller.register);
router.route("/login").post(authcontroller.login);

module.exports=router;
