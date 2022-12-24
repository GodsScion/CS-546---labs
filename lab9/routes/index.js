const Routes = require('./primeNumber.js');

const constructorMethod = (app) => {
  app.use('/', Routes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;