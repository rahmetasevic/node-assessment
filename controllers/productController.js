const asyncHandler = require("express-async-handler");
const Product = require('../models/Product');

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, quantity } = req.body;
    if (!name || !description || !price || !quantity) {
        return res.status(400).json({ message: 'All product credentials(name, description, price, quantity) are mandatory!' });
    }

    const product = await Product.create({
        user_id: req.user.id,
        name,
        description,
        price,
        quantity
    });

    res.status(201).json(product);
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    if (products.length == 0) {
        return res.status(404).json({ message: 'No products found.' });
    }

    res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: `No product matches ID ${req.params.id}.` });
    }

    res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(204).json({ message: `No product matches ID ${req.params.id}.` });
    }

    if (product.user_id.toString() !== req.user.id) {
        return res.status(403).json({ message: 'User doesn\'t have permission to delete other user products!' });
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json(product);
});

module.exports = { createProduct, getProducts, getProduct, deleteProduct };