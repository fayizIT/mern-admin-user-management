import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';


// import { fetchAllUsers, deleteUser, updateUser } from '../utils........


    /*
     # Desc: Auth user/set token
     # Route: POST /api/admin/auth
     # Access: PUBLIC
    */

     // admin auth
     const authAdmin = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        
        const admin = await Admin.findOne({ email });

    
      
        if (admin && (await admin.matchPassword(password))) {
          generateToken(res, admin._id);
      
          res.status(201).json({
            _id: admin._id,
            name: "Admin",
            email: admin.email,
          });
        } else {
          res.status(401);
          throw new Error("Invalid email or password");
        }
      });
      
      // Logout admin
      const logoutAdmin = asyncHandler(async (req, res) => {
        res.cookie("jwt", "", {
          httpOnly: true,
          expires: new Date(0),
        });
        res.status(200).json({ message: "Admin Logged Out" });
      });
      
      const getAllUsers = asyncHandler(async (req,res) => {
        try {
          const userData = await User.find({},{name:1,email:1});
          if(userData){
            res.status(200).json({userData})
          }else{
            res.status(401)
            throw new Error("Fetch failed");
          }
        } catch (error) {
          console.log(error.message)
        }    
      })
      
      const deleteUser = asyncHandler(async(req,res)=>{
        try {
          let userId = req.body.id;
          let userRemoved = await User.deleteOne({_id:userId});
          if(userRemoved){
            res.status(200).json({userRemoved})
          }else{
            res.status(401)
            throw new Error("failed to delete");
          }
        } catch (error) {
          console.log(error.message)
        }
      })

      const updateUser = asyncHandler(async (req, res) => {
        try {
          const userId = req.body.id;
          const updatedUserData = req.body.updatedUserData; // Assuming you have an object containing updated user data
          
          // Use the findByIdAndUpdate method to update the user data based on the user's ID
          const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
      
          if (updatedUser) {
            res.status(200).json({ updatedUser });
          } else {
            res.status(401);
            throw new Error("Failed to update user");
          }
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: "Server error" });
        }
      });


      
      



export {
    authAdmin,
    logoutAdmin,
    getAllUsers,
    deleteUser,
    updateUser
}