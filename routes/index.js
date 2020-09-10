const express = require('express');
const router = express.Router();
const crypto = require('crypto-js');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.redirect('/users/login'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  let rawCreds = req.user.credentials;
  let credentials = [];
  
  rawCreds.forEach((cred) => {
    let usr = cred.user;
    let pwd = cred.password;
    let bytes  = crypto.AES.decrypt(pwd, usr);
    let password = bytes.toString(crypto.enc.Utf8);
    credentials.push({
      user: usr,
      password: password
    });
  });
  
  res.render('dashboard', {
    user: req.user,
    credentials: credentials
  });
});

router.post('/newaccount', ensureAuthenticated, (req, res) => {
  let credentials = req.user.credentials;
  let username = req.body.username;
  let password = req.body.password;
  let encryptedPwd = crypto.AES.encrypt(password, username).toString();     
  credentials.push({
    user: username,
    password: encryptedPwd
  });
  User.findOneAndUpdate({ email: req.user.email }, { credentials: credentials }, (err, info) => {
    if (err) throw err;
    res.redirect('/')
  });
});

module.exports = router;
