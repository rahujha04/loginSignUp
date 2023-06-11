const express = require('express');
require('./mongodb.js');
const path = require('path');
const hbs = require('hbs');
const collection = require('./mongodb.js')

const app = express();


const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.render('login');
})

app.get('/signup', (req, res)=>{
    res.render('signup');
})

app.post('/login',async (req, res) => {
    try{
        const check = await collection.findOne({username: req.body.username});

        if(check.password === req.body.password){
            res.render('home');
        }
        else{
            res.send("<h1>Wrong Password</h1>")
        }
    }catch(err){
        res.send("<h1>Wrong Details</h1>")
    }
})

app.post('/signup', async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    await collection.insertMany([data]);

    res.render('login');
})


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})