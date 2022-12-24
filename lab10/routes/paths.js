const express = require('express');
const router = express.Router();
const {createUser, checkUser} = require('../data/users');



router
  .route('/')
  .get(async (req, res) => {
    try{
        if(req.session.user){
          return res.redirect('/private');
        }
        return res.render('login/loginMain');
    } catch (e) {
        res.status(400).json(e);
    }
  });

router
  .route('/login')
  .post(async (req, res) => {
    try{
      const result = await checkUser(req.body.username, req.body.password);
      if(result && result.authenticated){
        req.session.user = req.body.username;
      }
      return res.redirect('/');
  } catch (e) {
    res.status(400).render('login/loginMain', {hasError: true, message: e });
  }
  });

router
  .route('/signup')
  .get(async (req, res) => {
    try{
      if(req.session.user){
        return res.redirect('/private');
      }
      return res.render('login/signupMain');
    } catch (e) {
        res.status(400).json(e);
    }
  })
  .post(async (req, res) => {
    try{
      // if(!req.body.username || !req.body.password) throw "Throw username and password not given!";

      await createUser(req.body.username, req.body.password);

      return res.render('login/signupMain');
    } catch (e) {  
      return res.status(400).render('login/signupMain', {hasError: true, message: e });
    }
  });

router
.route('/private')
.get(async (req, res, next) => {
    try {
        return res.status(200).render('login/private', { username: req.session.user });
    } catch (error) {
        console.log(error);
    }
});

router
.route('/logout')
.get(async (req, res, next) => {
    try {
        req.session.destroy();
        return res.status(200).render('error/errormain', { message: 'You have been logged out', status: 200 });
    } catch (error) {

    }
});


module.exports = router;