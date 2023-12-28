import express  from "express";
const router= express.Router();
import services from '../data/services.js';


router.get('/',async(req,res)=>{
    res.json(services);
});

router.get('/:id',(req,res)=>{
    const service=services.find((p)=>p._id === req.params.id);
    res.json(service);
});

export default router;