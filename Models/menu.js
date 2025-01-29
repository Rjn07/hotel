const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensures price is non-negative
    },
    category: {
        type: String,
        enum: ['Starter', 'Main Course', 'Dessert', 'Beverage'],
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default: true // Defaults to available
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the creation time
    }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
