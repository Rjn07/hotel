const express = require('express');
const app = express();
require('dotenv').config();
require('./db'); // Just require, no need to call db()
const personrouter =require('./routes/personroute');
const menurouter =require('./routes/menuroute');

// Use built-in middleware instead of body-parser
app.use(express.json());

const port = process.env.PORT || 7000;
app.get('/', (req, res) => {
    res.send("Hello sir, akhir kar aa hi gya hotel me");
});

app.use('/person',personrouter);
app.use('/menu',menurouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

