const {z}=require("zod");

const registerSchema=z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast 3 character"})
    .max(255,{message:"Name contains maximum 255 ch"}),

    email:z
    .string({required_error:"Email is required"})
    .trim()
    .min(10,{message:"Email must be atleast 10 character"})
    .max(255,{message:"Email contains maximum 255 ch"}),

    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"phone must be atleast 10 character"})
    .max(20,{message:"phone contains maximum 20 ch"}),

    password:z
    .string({required_error:"password is required"})
    .trim()
    .min(3,{message:"password must be atleast 3 character"})
    .max(255,{message:"password contains maximum 255 ch"})
});

const loginSchema=z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .min(10,{message:"Email must be atleast 10 character"})
    .max(255,{message:"Email contains maximum 255 ch"}),
    
    password:z
    .string({required_error:"password is required"})
    .trim()
    .min(3,{message:"password must be atleast 3 character"})
    .max(255,{message:"password contains maximum 255 ch"})
});
module.exports=registerSchema;
module.exports=loginSchema;