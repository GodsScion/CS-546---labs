const router = require('./api');
const apiRoutes = require('./api');

const constructorMethod = (app) => {
  app.use('/', apiRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
