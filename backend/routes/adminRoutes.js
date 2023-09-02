import express from "express";
import { 
    authAdmin,
    logoutAdmin,
    getAllUsers,
    deleteUser } from "../controllers/adminController.js";


const router = express.Router();


router.post('/login',authAdmin)
router.post('/logout',logoutAdmin)
router.get('/adminHome',getAllUsers)
router.post('/delete-user',deleteUser)


export default router;