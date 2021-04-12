module.exports = function(app) {
    const converter = require('../controllers/converter.controller');
  
    app.route('/converter/:fromUnit/:toUnit/:qty')
      .get(converter.convert);
};