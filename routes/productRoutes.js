const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// POST /api/products - Create a new product
router.post('/', async (req, res) => {
  const { name, picture, description, gender, category, price } = req.body;

  try {
    const newProduct = new Product({
      name,
      picture,
      description,
      gender,
      category,
      price
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get products' });
  }
});

// GET /api/products/:id - Get a single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    // If the error is due to an invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    console.error(error);
    res.status(500).json({ message: 'Failed to get product' });
  }
});


// PUT /api/products/:id - Update a product by id
router.put('/:id', async (req, res) => {
  const { name, picture, description, gender, category, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      name,
      picture,
      description,
      gender,
      category,
      price
    }, { new: true }); // Return the updated document

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete a product by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
