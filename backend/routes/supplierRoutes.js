import express  from "express";
const router= express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Supplier from '../models/supplierModel.js'

router.get('/',asyncHandler(async(req,res)=>{
    const suppliers= await Supplier.find({});
    res.json(suppliers);
}));

router.get('/:id',asyncHandler(async(req,res)=>{
    const supplier= await Supplier.findById(req.params.id);
    if(supplier){
        res.json(supplier);
    }

    res.status(404).json({message:'Product not found'})
}));

export default router;