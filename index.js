const express = require ('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require ('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const  middleware = require('./config/middlewares');
// const flash = require('connect-flash');
const customMware = require('./config/middlewares');



app.use(sassMiddleware({
  src: './assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'extended',
  prefix:'/css'
  
}));
app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static('./assets'));
//make the uploads path available to the browserr
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//mongo store is used to store the session cookie in the db
app.use(session({
  name: 'social',
  //TODO  change the secret before deployment in production mode
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge: (1000* 60 *100)
  
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost/codeial_development'
    
},
function(err){
  console.log(err || 'connect-mongodb setup ok');
}
)

}));

app.use(passport.initialize());
app.use(passport.session());

//Using middleware to send Flash msg form req to res


app.use(passport.setAuthenticatedUser);
//Flash Message
//Using Connect flash middleware to store flash message
app.use(flash());
app.use(middleware.setFlash);

app.use('/', require('./routs'));

//use express router
app.use('/', require('./routs'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);

    }
    console.log(`server is running on port: ${port}`);
});
