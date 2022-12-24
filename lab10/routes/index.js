const pathRoutes = require('./paths');

const constructorMethod = (app) => {
  app.use('/', pathRoutes);
  

  app.use('*', (req, res) => {
    res.status(404).render('error/errormain', { message: 'Requested recourse not found'});
  });
};

module.exports = constructorMethod;