import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from "./data/users.js";
import products from "./data/products.js";
import services from "./data/services.js";
import supplierTypes from "./data/supplierType.js";
import suppliers from "./data/supplier.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Service from "./models/servicesModel.js";
import SupplierType from "./models/supplierTypeModel.js";
import Supplier from "./models/supplierModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Service.deleteMany();
        await SupplierType.deleteMany();
        await Supplier.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser };
        });

        const sampleServices = services.map(service => {
            return { ...service, user: adminUser };
        });

        const sampleSupplierTypes = supplierTypes.map(supplierType => {
            return { ...supplierType, user: adminUser };
        });

        const createdSupplierTypes = await SupplierType.insertMany(sampleSupplierTypes);

        const sampleSuppliers = suppliers.map((supplier, index) => {
            return {
                ...supplier,
                user: adminUser,
                serviceType: createdSupplierTypes[index]._id, // Asignar el ID del tipo de proveedor
            };
        });

        await Product.insertMany(sampleProducts);
        await Service.insertMany(sampleServices);
        await SupplierType.insertMany(sampleSupplierTypes);
        await Supplier.insertMany(sampleSuppliers);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Service.deleteMany();
        await SupplierType.deleteMany();
        await Supplier.deleteMany();

        console.log('Data Destroyed'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
