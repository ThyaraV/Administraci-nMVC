import express  from "express";
const router= express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Service from '../models/servicesModel.js'

router.get('/',asyncHandler(async(req,res)=>{
    const services= await Service.find({});
    res.json(services);
}));

router.get('/:id',asyncHandler(async(req,res)=>{
    const service= await Service.findById(req.params.id);
    if(service){
        res.json(service);
    }

    res.status(404).json({message:'Product not found'})
}));

export default router;