const express = require('express');
const app = express();
require('dotenv').config();
require('./db'); // Connects to MongoDB
const personrouter = require('./routes/personroute');
const menurouter = require('./routes/menuroute');
const passport = require('passport');
const auth =require('./auth')



app.use(express.json()); // Built-in middleware

const port = process.env.PORT || 7000;

// ✅ Configure Passport Local Strategy


// ✅ Initialize Passport
app.use(passport.initialize());
const localAuth=passport.authenticate('local', {session: false});

// ✅ Logging Middleware
const loginRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
    next();
};
app.use(loginRequest);



// ✅ Routes
app.get('/', localAuth,(req, res) => {
    res.send("Hello sir, akhir kar aa hi gya hotel me");
});

app.use('/person', personrouter);
app.use('/menu',localAuth, menurouter);

// ✅ Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
