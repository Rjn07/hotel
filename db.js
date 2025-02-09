const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URI  // Change 'myDatabase' to your DB name

mongoose.connect(mongoURL)
   

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB");
});

db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

db.on('disconnected', () => {
    console.log("Disconnected from MongoDB");
});

module.exports = db;
