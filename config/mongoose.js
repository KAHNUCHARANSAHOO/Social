const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db = mongoose.connection;

db.once('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
   console.log('Connected to Database :: MongoDB');
});

module.export = db;