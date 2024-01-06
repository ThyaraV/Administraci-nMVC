import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js';

//@desc Create new order
//@route POST/api/orders
//@access Private
const addOrderItems=asyncHandler(async(req,res)=>{
    const{
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body;

    if(orderItems && orderItems.length===0){
        res.status(400);
    }else{
        const order=new Order({
            orderItems: orderItems.map((x)=>({
                ...x,
                product:x._id,
                _id:undefined
            })),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder=await order.save();
        res.status(201).json(createdOrder);
    }
});

//@desc Get order by ID
//@route GET/api/orders/:id
//@access Private}
const getOrderById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc Get logged in user orders
//@route GET/api/orders/myorders
//@access Private
const getMyOrders=asyncHandler(async(req,res)=>{
    const orders= await Order.find({user: req.user._id});
    res.status(200).json(orders);
});

//@desc Update order to paid
//@route PUT/api/orders/:id/pay
//@access Private
const updateOrderToPaid=asyncHandler(async(req,res)=>{
    const order= await Order.findById(req.params.id);
    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.update_time,
            email_address:req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.statue(200).json(updatedOrder);
    }else{
        throw new Error('Order not found');
    }
});

//@desc Update order to delivered
//@route PUT/api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);
    if(order){
        order.isDelivered=true;
        order.deliveredAt=Date.now();

        const updateOrder= await order.save();
        res.status(200).json(updateOrder);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc Get all orders
//@route GET/api/orders
//@access Private/Admin
const getOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({}).populate('user','id name');
    res.status(200).json(orders);
});


//
const analyzeUserPreferences = async (userId) => {
    const orders = await Order.find({ user: userId }).populate({
        path: 'orderItems.product',
        populate: { 
            path: 'service supplierType', 
            model: 'Service SupplierType' 
        }
    });

    let userPreferences = {
        serviceTypes: {}, // Almacenar la frecuencia de tipos de servicio
        priceRanges: {}   // Almacenar la frecuencia de rangos de precio
    };

    orders.forEach(order => {
        order.orderItems.forEach(item => {
            // Suponiendo que 'service' y 'supplierType' están disponibles en 'product'
            let serviceType = item.product.service?.type;
            let priceRange = item.product.supplierType?.priceRange;

            // Analizar tipo de servicio
            if (serviceType) {
                userPreferences.serviceTypes[serviceType] = (userPreferences.serviceTypes[serviceType] || 0) + 1;
            }

            // Analizar rango de precio
            if (priceRange) {
                userPreferences.priceRanges[priceRange] = (userPreferences.priceRanges[priceRange] || 0) + 1;
            }
        });
    });

    return userPreferences;
};

const getMyOrdersWithPreferences = asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
        const preferences = analyzeUserPreferences(orders);
        res.status(200).json({ orders, preferences });
    } else {
        res.status(404).send('No orders found');
    }
});


export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
    getMyOrdersWithPreferences
};
