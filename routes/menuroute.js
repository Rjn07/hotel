const express = require('express');
const router = express.Router(); 
const app = express();
const Menu = require('../Models/menu');




// Create a new menu item
router.post('/menu', async (req, res) => {
    try {
        const data = req.body; // Corrected: req.data → req.body
        const newMenu = new Menu(data); // Corrected: menubar → Menu

        await newMenu.save(); // Save data to MongoDB

        res.status(201).json({ message: "Menu item added successfully", newMenu });
    } catch (error) {
        res.status(500).json({ message: "Error adding menu item", error });
    }
});


router.get('/menu', async (req, res) => {
    try {
        // Fetch all menu items from the database
        const menuItems = await Menu.find();

        // Send the menu items as the response
        res.status(200).json(menuItems);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: "Error fetching menu items", error });
    }
});

module.exports =router;
