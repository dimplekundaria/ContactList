var mongoose = require('mongoose'); // we require the library


mongoose.connect('mongodb://localhost/contact_list_db'); //  connect to the database

const db= mongoose.connection;   // acquire the connection (to check if it is successful)

db.on('error',console.error.bind(console,'Error connecting to db'));// error

// up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to database');
})
