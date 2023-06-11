const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LoginSignUp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(`database connected successfully`);
}).catch((e)=>{
    console.log(e);
})


const LoginSignUpSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    }, 
    password:{
        type: String, 
        unique: true,
        required: true
    }
})

const collection = new mongoose.model('collection1', LoginSignUpSchema);

module.exports = collection;