// const { model } = require("mongoose");

// model.exports.profile = function(req, res){
//     res.end('<h1>user profile</h1>');
// }
const User = require('../models/user');


module.exports.profile = function(req, res){
  
//    console.log('line 11',req.user);
    User.findById(req.user.id, function(err,user){
        res.render('user_profile',{
            title : 'User profile',
            profile_user:user
        });
    });
   
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
      return res.status(401).send('Unauthorized');  
    }
}




//render the sign up page
module.exports.signUp = function(req, res){

if (req.isAuthenticated ()){
   return res.redirect('/user/profile');
}

    return res.render('user_sign_up',{
        title: "Codeial | sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req,res){

    if (req.isAuthenticated ()){
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_in',{
        title: "Codeial | sign In"
    })
}
//get the sign up data
module.exports.create = function (req, res) {
    console.log(req.body)
   if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
   }
   User.findOne({email: req.body.email},function(err,user){
    if(err){console.log('error in finding user in signin up'); return}
    if(!user){
        User.create(req.body,function(err, user){
            if(err){console.log('error in creating user while signing up');return}

            return res.redirect('/user/sign-in')
        })
    }else{
        return res.redirect('back');
    }
   });
}

//sing in and create a session for the user
module.exports.createSession = function(req, res){
    //steps to authenticate
    //find the user
//   User.findOne({email: req.body.email}, function(err, user) {
//     if(err){console.log('error in creating user while signing in');return}
//    //handel user found
//   if (user){
//  ///handel password which doesn't match
//    if(user.password != req.body.password){
//     return res.redirect('back');
//    }
//      ///handle session creation
//       res.cookie('user_id',user.id);
//       return res.redirect('/user/profile');
return res.redirect('/');
// return res.redirect('/user/profile');
//   }else{
//   //handel user not found 
//   return res.redirect('back');
//   }
//   });
     

}


module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
             console.log(err);
         }
         console.log('success',"You have Logged out successfully");
         return res.redirect('/');
     });
}

// https://github.com/KAHNUCHARANSAHOO/Social