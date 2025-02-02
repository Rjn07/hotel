const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
    },
    username:{
        required :true,
        type :String
        

    },
    password :{
        required :true,
        type : String
    }
});

personSchema.pre('save',async function(next){
    const person =this;

    if(!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(person.password,salt);

        person.password=hashedPassword
        next();
        
    } catch (error) {
        return next(error)
        
    }
})

personSchema.methods.comparePassword =async function(candidatePassword){

    try {
        const ismatch = await bcrypt.compare(candidatePassword,this.password);
        return ismatch;

        
    } catch (error) {
        throw error;
        
    }
}
const Person = mongoose.model('person',personSchema);

module.exports=Person;
