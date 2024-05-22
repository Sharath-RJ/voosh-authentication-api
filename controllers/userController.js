const userModel= require('../models/userModel');


const getProfile=async(req,res)=>{
    try{
        const user=await userModel.findById(req.user.id).select('-password');//avoid showing password in response for security purpose
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports={getProfile}