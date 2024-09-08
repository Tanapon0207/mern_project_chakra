const Product = require('../models/product.model');
const mongoose = require('mongoose');

const getProducts =  async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        console.error(`Error retrieving products: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}


const createProducts =async (req, res) => {
    const product = req.body;

    // Validate the request body
    if (!product.name || !product.price || !product.image) {
        return res.status(400).send('Missing name, price, or image');
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct, message: "Add Product Success !!"});
    } catch (err) {
        console.error(`Error adding product: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const updateProducts =async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product, message: "Product updated successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(`Error updating product: ${err.message}`);
    }
}


const deleteProducts = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Delete Product Success!!' });
    } catch (err) {
        console.error(`Error deleting product: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}



module.exports = { 
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts

}