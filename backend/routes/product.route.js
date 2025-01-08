import express from 'express'; 

import { getProduct, updateProduct, createProduct, deleteProduct } from '../controllers/product.controller.js'; 

const router = express.Router(); 

router.post('/', createProduct);
router.get('/', getProduct); 
/* UPDATE put- if updating all fields vs patch- updating some fields*/
router.put('/:id', updateProduct); 
router.delete('/:id', deleteProduct); 

export default router; 