import express  from "express";
const router= express.Router();
import { getSupplierTypes,getSupplierTypeById } from "../controllers/supplierTypeController.js";

router.route('/').get(getSupplierTypes);
router.route('/:id').get(getSupplierTypeById);

export default router;