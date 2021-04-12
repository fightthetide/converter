'use strict';

const Decimal = require('decimal.js');

const unitLegend = {
  ounce: 29.5735,
  cup: 236.588,
  liter: 1000
}

exports.convert = function(req, res) {
  const params = req.params;
  return new Decimal(unitLegend[params.fromUnit])
    .mul(params.qty)
    .div(unitLegend[params.toUnit])
    .toFixed(3);
};
