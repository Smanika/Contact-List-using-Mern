const mongoose = require('mongoose');

 const contactSchema = new mongoose.Schema({
     name:{
         type:String,
         required: true,
         unique: true
     },
     email:{
        type: String,
        required: true,
        unique: true
    },
     phone:{
         type: String,
         required: true,
         unique:true
     },
 });

 const Contact = mongoose.model('contact', contactSchema);

 module.exports = Contact;
 