import express from "express";

import { createProduct, deleteProduct, deleteReview, fetchAIFilteredProducts, fetchAllProducts, fetchSingleProduct, postProductReview, updateProduct } from "../controllers/productController.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/authMiddleware.js";
import { asyncWrapper } from "../middlewares/catchAysncError.js";

const router = express.Router();

router.post("/admin/create", isAuthenticated, authorizedRoles("Admin"), asyncWrapper(createProduct));
router.put("/admin/update/:productId", isAuthenticated, authorizedRoles("Admin"), asyncWrapper(updateProduct));
router.delete("/admin/delete/:productId", isAuthenticated, authorizedRoles("Admin"), asyncWrapper(deleteProduct));
router.get("/", asyncWrapper(fetchAllProducts));
router.get("/singleProduct/:productId", asyncWrapper(fetchSingleProduct));
router.put("/post-new/review/:productId", isAuthenticated, asyncWrapper(postProductReview));
router.delete("/delete/review/:productId", isAuthenticated, asyncWrapper(deleteReview));
router.post("/ai-search", isAuthenticated, asyncWrapper(fetchAIFilteredProducts));

export default router;
