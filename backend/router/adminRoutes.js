import express from 'express'
import { dashboardStats, deleteUser, getAllusers } from '../controllers/adminController.js'
import { isAuthenticated, authorizedRoles } from '../middlewares/authMiddleware.js'
import { asyncWrapper } from '../middlewares/catchAysncError.js'

const router = express.Router()


router.get("/getallusers", isAuthenticated, authorizedRoles("Admin"), asyncWrapper(getAllusers)) //DASHBOARD
router.delete("/delete/:id", isAuthenticated, authorizedRoles("Admin"), asyncWrapper(deleteUser))
router.get("/fetch/dashboard-stats", isAuthenticated, authorizedRoles("Admin"), asyncWrapper(dashboardStats))


export default router

