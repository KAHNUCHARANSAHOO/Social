const express = require ('express');
const router = express.Router();
const passport = require('passport');

 const usersController = require('../controllers/user_controller');
 
 router.get('/profile/:id',passport.checkAuthentication , usersController.profile);



router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/sign-out', usersController.destroySession);
router.post('/create', usersController.create);
router.post('/update/:id',passport.checkAuthentication , usersController.update);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
) , usersController.createSession);


// router.get('/auth/google', passport.authenticate('google',{scope: ['profile', 'email']}));

// router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), usersController.createSession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect :'/user/sign-in'}), usersController.createSession);

module.exports = router; 