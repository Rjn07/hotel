const express = require('express');
const router = express.Router(); 
const app = express();
const Menu = require('../Models/menu'); // Ensure correct model import
const Person = require('../Models/person');

router.use(express.json()); // Middleware to parse JSON request body

// Home route


router.post('/', async (req,res)=>{
    try {
        const data =req.body;
        const newPerson =new Person(data);
        await newPerson.save();
        res.status(201).json({ message: "person added successfully", newPerson });
    } catch (error) {
        res.status(500).json({ message: "Error adding person ", error });
        
    }
})

router.get('/',async(req,res)=>{
    try {


        
        const persondata = await Person.find();
        res.status(200).json(persondata);
        
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching person ", error });
        
    }
})


module.exports = router;
