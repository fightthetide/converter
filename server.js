var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var routes = require('./api/routes/converter.routes');
routes(app);
app.listen(port);

console.log('converter RESTful API server started on: ' + port);