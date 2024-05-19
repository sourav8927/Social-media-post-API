const express=require("express");
const router= express.Router();
const authcontroller=require("../controller/auth-controller");
// const loginSchema=require("../validators/auth-validator");
const registerSchema=require("../validators/auth-validator");
const validate=require("../middlewares/validate-middleware");
const authMiddleware = require('../middlewares/auth-middleware');

//step-2 while using router
// router.route("/register").get((req,res)=>{
//     res.status(200).send({id:"64",username:"Sourav karmakar"});
// });

router.route("/register").post(validate(registerSchema) ,authcontroller.register);
router.route("/login").post(authcontroller.login);

router.route("/user").get( authMiddleware,authcontroller.user);

module.exports=router;
