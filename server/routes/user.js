// logged in/Registered user end point here
const express = require('express');
const { passport } = require('./../auth');

const router = express.Router();

// Middleware used to check if authenticated.
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('isAuthenticated: No');
    res.redirect('/user/login');
    return 0;
};

router.get('/', isAuthenticated, (req, res) => {
    res.send(req.user);
});

router.get('/auth', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called
});

router.get('/auth/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
      res.redirect('/');
  });

router.get('/login', (req, res) => {
    res.redirect('/loginErr.html');
});

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports.userRoutes = router;
