const express = require('express');
const router = express.Router(); 
const app = express();
// Ensure correct model import
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
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find(); // Fetch all persons
        return res.status(200).json(persons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching persons", error });
    }
});
router.get('/:role', async (req, res) => {
    try {
        const work = req.params.role; // Get the role from URL parameter

        // Validate role
        if (work === 'chef' || work === 'manager' || work === 'waiter') {
            const persondata = await Person.find({role:work});
            console.log(persondata);
            return res.status(200).json(persondata);
        } else {
            return res.status(400).json({ message: "Invalid role provided" });
        }
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching person data", error });
    }
});


module.exports = router;
