const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');




app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

app.use('/private', (req, res, next) => {
  if(req.method === 'GET'){
    if(!req.session.user){
      return res.status(403).render('error/notLoggedIn');
    }
  }
  next();
  
});

app.use((req,res,next) => {
  if(req.session.user){
    console.log("[ " +new Date().toUTCString()+ " ]:  " + req.method + " " + req.originalUrl + " (Authenticated User)");
  }
  else{
    console.log("[ " +new Date().toUTCString()+ " ]:  " + req.method + " " + req.originalUrl + " (Non-Authenticated User)");
  }
  next();
});

// app.use('/login', (req, res, next) => {
//   if (req.session.user) {
//     return res.redirect('/private');
//   } else {
//     //here I',m just manually setting the req.method to post since it's usually coming from a form
//     req.method = 'POST';
//     next();
//   }
// });


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});