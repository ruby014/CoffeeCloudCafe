// entry point for api
import express from 'express';  
import dotenv from "dotenv"; 
import { connectDB } from './config/db.js';

dotenv.config();
const app = express(); 

app.post('/products', async (req, res) => {
    const product = req.body; // user will send this data
    
}); 

// to listen for connections on the specified host and port
app.listen(5000, () => {
    connectDB(); 
    console.log('Server started at http://localhost:5000'); 
}); 

// to route GET requests to the specified path 
app.get('/products', (req, res) => {
    res.send('Server is ready1234'); 
});

//console.log(process.env.MONGO_URI); 
// ruchellebay
// Hk6MvEkFVALc1VZL