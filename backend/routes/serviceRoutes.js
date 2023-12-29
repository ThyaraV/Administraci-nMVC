import express  from "express";
const router= express.Router();
import { getServices, getServiceById } from "../controllers/serviceController.js";

router.route('/').get(getServices);
router.route('/:id').get(getServiceById);

export default router;