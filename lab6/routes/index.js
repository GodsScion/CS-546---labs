const bandRoutes = require('./bands');
const albumRoutes = require('./albums');

const constructorMethod = (app) => {
  app.use('/bands', bandRoutes);
  app.use('/albums', albumRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Page or resource not found'});
  });
};

module.exports = constructorMethod;