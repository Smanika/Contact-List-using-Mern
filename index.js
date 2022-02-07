const express = require("express");
const path = require("path");
const port = 1003;

// require mongodb database
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

// set template Engine
app.set("view engine", "ejs");
//  Join the path from views
app.set("views", path.join(__dirname, "views"));
// middleware function
app.use(express.urlencoded());

// Adding Static Files
app.use(express.static('assets'))

app.get("/", function (req, res) {
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in Fetching From Db:')
            return;
        }
         return res.render('home', {
           titleName: "Contact List",
           contact_List: contacts,
         });
    });
   
});
app.get("/contactList",function(req,res,next){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in Fetching From Db:')
            return;
        }
         return res.render('contactList', {
           titleName: "Contact List",
           contact_List: contacts,
         });
    });
    });

app.get("/addMore",function(req,res,next){
    Contact.find({},function(err,contacts){
            if(err){
                console.log('Error in Fetching From Database')
                return;
            }
             return res.render('home', {
               titleName: "Contact List",
               contact_List: contacts,
             });
        });
});

app.post("/addMore",function(req,res,next){
    return res.redirect('/');
});

app.post("/create-contact", function (req, res) {

    Contact.findOne({email : req.body.email},function(err,contact){
        if(err){
            console.log("error found");
            return;
        }
        if(!contact){
            Contact.create({
                name: req.body.name,
                email:req.body.email,
                phone: req.body.phone
            }, function(err, newContact){
                if(err){
                   console.log('Error in Creating a Contact!!');
                   return; 
                }
        
                console.log('Hurray!!', newContact);
                res.redirect('contactList');
            });
        }
        else{
            return res.redirect('back');
        }
    })
});

// deleting contact

app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let id  = req.query.id;
    Contact.findByIdAndDelete(id,function(err,){
        if(err){
            console.log('Error In deleting the object from the database');
            return ;
        }
        return res.redirect("back");
    });
});

//updating contact
app.post('/update-contact',function(req,res){
    console.log(req.body);
    let id  = req.query.id;
   Contact.findByIdAndUpdate(id,req.body,function(err,updateContact){
      if(err){
          console.log("Error in Updating")
          return;
        }
      console.log(updateContact);
      return res.redirect("back");
    })
})



app.listen(port, function (error) {
    if (error) {
        console.log("Error in running the server", error);
    }
    else{
    console.log("My Express server are running on port", port);
    }
});