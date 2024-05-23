const jwt = require('jsonwebtoken');
const  dotenv= require('dotenv')
dotenv.config()
   


const auth= (req,res,next)=>{
   const token = req.header('Autherization');
   if(!token){
       return res.status(401).json({message:"Unauthorized user"})
   }
   try {
      const decode = jwt.verify(token,process.env.JWT_SECRET);
      req.user=decode;
      next();
   } catch (error) {
      console.log(error)
   }
}

module.exports=auth