const express = require('express');
const router = express.Router(); 
const app = express();
// Ensure correct model import
const Person = require('../Models/person');
const {jwtAuthMiddleware,generateToken} = require('../jwt')

router.use(express.json()); // Middleware to parse JSON request body

// Home route


router.post('/signup', async (req,res)=>{
    try {
        const data =req.body;
        const newPerson =new Person(data);
       const response= await newPerson.save();
        const token = generateToken(response.userid);

        res.status(201).json({ message: "person added successfully",response:response ,token:token} );
         console.log('token is :',token);
    } catch (error) {
        res.status(500).json({ message: "Error adding person ", error });
        
    }
})

router.post('/login',async (req,res)=>{
    try {

        const { username,password}=req.body;

        //find the user by username
        const user =await Person.findOne({username:username})

        if (!user || !await user.comparePassword(password))
            {
            return res.status(401).json({error:'invalid username or password'})
        }
        
        const payload ={
            id :user._id,
            username: user.username
        }

        const token = generateToken(payload);

        res.json({token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'})
        
    }
})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;  // Ensure correct variable name
        console.log("user data:", userData);

        const userId = userData.id;  // Use correct variable name
        const user = await Person.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

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
