 const express=require('express');   
const port=8000;   // then we choose port
const path=require('path')
const db=require('./config/mongoose')
const Contact=require('./models/contact');
const app=express();   //we said our express app would be fired using this command
app.set('view engine','ejs'); // here we told express what view engine we use
app.set('views',path.join(__dirname,'views'));  // we just need to say path of views
app.use(express.urlencoded());

app.use(express.static('assets'));

// Middleware 1
app.use(function(req, res,next){
   req.myName="dimple";
    // console.log('Middleware 1 called');
    next();
});
// Middleware 2
app.use(function(req, res,next){
    console.log('My name from MW2', req.myName);
    next();
});
var contactList= [
{
    name:"Dimple",
    phone:"9650199676"
},
{
    name:"Radhika",
    phone:"9650199667"
},
{
    name:"Priyank",
    phone:"9652134686"
},
]
app.get('/',function(req,res){
    Contact.find({},function(err, contacts){
     if(err){
         console.log('Error in fetching data from db');
         return;
     }
     return res.render('home',{
        title:"Contacts List",
        contact_list:contacts
    
    });
    });
});

app.get('/practice',function(req, res){
    return res.render('practice',{
        title:"Let us play with ejs!",
        
    });
});

app.post('/create-contact',function(req, res){
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
    if(err){
        console.log('error in creating a contact!');
        return;
    }
    console.log('********',newContact);
    return res.redirect('back');
});
});
// for deleting a contact
app.get('/delete-contact',function(req, res){

    let id=req.query.id;  // get the id from query in the URL
    // find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from the database');
            return;
        }
        return res.redirect('back');
    });

});


// 3d. finally we told app to listen on this port
app.listen(port,function(err){     
//   we handle the error like this,
// if an error is encountered then the below statement is fired  
    if(err){
        console.log('Error in running the server',err);

    }
    // if the server is running which is usually it is, if there is no error then the below statement is fired
    console.log('Yup! My Express Server is running on Port:',port);
});