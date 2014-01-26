var landingController = require('../controllers/landingController');

module.exports = function(app){

  app.get('/', landingController.index);

}