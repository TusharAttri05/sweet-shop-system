const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const sweetController = require('../controllers/sweetController');
const { auth, adminAuth } = require('../middleware/auth');

// Validation rules
const sweetValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
];

// Public routes
router.get('/', sweetController.getAllSweets);
router.get('/search', sweetController.searchSweets);
router.get('/:id', sweetController.getSweet);

// Protected routes (require authentication)
router.post('/:id/purchase', auth, sweetController.purchaseSweet);

// Admin only routes
router.post('/', auth, adminAuth, sweetValidation, sweetController.createSweet);
router.put('/:id', auth, adminAuth, sweetValidation, sweetController.updateSweet);
router.delete('/:id', auth, adminAuth, sweetController.deleteSweet);
router.post('/:id/restock', auth, adminAuth, sweetController.restockSweet);

module.exports = router;