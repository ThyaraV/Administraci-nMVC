import express  from "express";
const router= express.Router();
import { getSuppliers,getSupplierById } from "../controllers/supplierController.js";

router.route('/').get(getSuppliers);
router.route('/:id').get(getSupplierById);

export default router;