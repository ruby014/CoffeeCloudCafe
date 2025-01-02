import mongoose from 'mongoose'; 

// create Schema 
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    }, 
    image:{
        type: String, 
        required: true
    },
}, 
{
    timestamps: true, // whenever a product is created, timestamp ensure product has createdAt and updatedAt fields
}
); 

// create product model, note depending on schema
const Product = mongoose.model('Product', productSchema); 
// mongoose will convert Product to lowercase and with s e.g. products 
export default Product; 
