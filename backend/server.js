// entry point for api
import express from 'express';  
import dotenv from "dotenv"; 
import { connectDB } from './config/db.js';
import Product from './models/product.model.js'; 
import mongoose from 'mongoose'; 

dotenv.config();

const app = express(); 

app.use(express.json()); // allows us to accept JSON data in the req.body 

/* CREATE */
app.post('/api/products', async (req, res) => {
    const product = req.body; // user will send this data

    if(!product.name
        || !product.price
        || !product.image) {
            return res.status(400).json({ sucess:false, message: 'Please provide all fields.'}); 
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save(); // saves to db 
        res.status(201).json({success:true, data: newProduct}); 
    } catch (error) {
        console.error('Error in Creating product: ', error.message);
        res.status(500).json({success: false, message: "Server Error"}); 
    }
}); 

/* READ */
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products}); 
    } catch (error) {
        console.log('error in fetching products: ', error.message); 
        res.status(500).json({success: false, message: 'Server Error'})
    }
}); 

/* UPDATE 
put- if updating all fields vs patch- updating some fields
*/
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params; 

    const product = req.body; 

    // to handle 404 not found 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid Product Id'}); 
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); 
        res.status(200).json({success: true, data: updatedProduct}); 
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'}); 
    }
}); 

/* DELETE */
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params; 
    //console.log('id: ', id); 
    try {
        await Product.findByIdAndDelete(id); 
        res.status(200).json({success: true, message: "Product deleted"}); 
    } catch (error) {
        console.log('Error in deleting product: ', error.message); 
        res.status(404).json({success: false, message: 'Product not found'});
    }
}); 

// to listen for connections on the specified host and port
app.listen(5000, () => {
    connectDB(); 
    console.log('Server started at http://localhost:5000'); 
}); 

// to route GET requests to the specified path 
// app.get('/', (req, res) => { // /products
//     res.send('Server is ready1234'); 
// });

//console.log(process.env.MONGO_URI); 
// ruchellebay
// Hk6MvEkFVALc1VZL