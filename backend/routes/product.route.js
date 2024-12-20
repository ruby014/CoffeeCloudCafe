import express from 'express'; 
import Product from '../models/product.model.js'; 
import mongoose from 'mongoose';

const router = express.Router(); 

export default router; 

/* CREATE */
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
