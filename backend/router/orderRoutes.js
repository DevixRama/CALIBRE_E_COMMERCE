import express from "express";
import { deleteOrder, fetchAllOrders, fetchMyOrders, fetchSingleOrder, placeNewOrder, updateOrderStatus } from "../controllers/orderController.js";
import { isAuthenticated, authorizedRoles } from "../middlewares/authMiddleware.js";
import { asyncWrapper } from "../middlewares/catchAysncError.js";

const router = express.Router();

router.post("/new", isAuthenticated, asyncWrapper(placeNewOrder));

router.get("/:orderId", isAuthenticated, asyncWrapper(fetchSingleOrder));

router.get("/orders/me", isAuthenticated, asyncWrapper(fetchMyOrders));

router.get("/admin/getall", isAuthenticated, authorizedRoles("Admin"), asyncWrapper(fetchAllOrders));

router.put("/admin/update/:orderId", isAuthenticated, authorizedRoles("Admin"), asyncWrapper(updateOrderStatus));

router.delete("/admin/delete/:orderId", isAuthenticated, authorizedRoles("Admin"), asyncWrapper(deleteOrder));


export default router;
