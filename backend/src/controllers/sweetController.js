const Sweet = require('../models/Sweet');
const { validationResult } = require('express-validator');

// Get all sweets
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json(sweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search sweets
exports.searchSweets = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    
    let query = {};
    
    // Search by name
    if (q) {
      query.name = { $regex: q, $options: 'i' };
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    const sweets = await Sweet.find(query).sort({ createdAt: -1 });
    res.json(sweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single sweet
exports.getSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.json(sweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create sweet (Admin only)
exports.createSweet = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, price, quantity } = req.body;

    // Check if sweet exists
    let sweet = await Sweet.findOne({ name });
    if (sweet) {
      return res.status(400).json({ message: 'Sweet already exists' });
    }

    // Create sweet
    sweet = new Sweet({ name, category, price, quantity });
    await sweet.save();

    res.status(201).json(sweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update sweet (Admin only)
exports.updateSweet = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, price, quantity } = req.body;
    
    // Check if sweet exists
    let sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    // Check if name is taken by another sweet
    if (name && name !== sweet.name) {
      const existingSweet = await Sweet.findOne({ name });
      if (existingSweet) {
        return res.status(400).json({ message: 'Sweet name already taken' });
      }
    }

    // Update sweet
    sweet.name = name || sweet.name;
    sweet.category = category || sweet.category;
    sweet.price = price || sweet.price;
    sweet.quantity = quantity !== undefined ? quantity : sweet.quantity;
    
    await sweet.save();

    res.json(sweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete sweet (Admin only)
exports.deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    await sweet.deleteOne();
    res.json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Purchase sweet
exports.purchaseSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ 
        message: `Not enough stock. Available: ${sweet.quantity}` 
      });
    }

    // Update quantity
    sweet.quantity -= quantity;
    await sweet.save();

    res.json({
      message: 'Purchase successful',
      sweet,
      purchasedQuantity: quantity,
      remainingQuantity: sweet.quantity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Restock sweet (Admin only)
exports.restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    // Update quantity
    sweet.quantity += parseInt(quantity);
    await sweet.save();

    res.json({
      message: 'Restock successful',
      sweet,
      addedQuantity: quantity,
      newQuantity: sweet.quantity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};