import express  from "express";
const router= express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import SupplierType from '../models/supplierTypeModel.js'

router.get('/',asyncHandler(async(req,res)=>{
    const supplierTypes= await SupplierType.find({});
    res.json(supplierTypes);
}));

router.get('/:id',asyncHandler(async(req,res)=>{
    const supplierType= await SupplierType.findById(req.params.id);
    if(supplierType){
        res.json(supplierType);
    }

    res.status(404).json({message:'Product not found'})
}));

export default router;