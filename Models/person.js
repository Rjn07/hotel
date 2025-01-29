const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['Manager', 'Chef', 'Waiter'],
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18 // Optional: Makes sure the age is at least 18
    },
    salary: {
        type: Number,
        required: true
    }
});

const Person = mongoose.model('person',personSchema);

module.exports=Person;
