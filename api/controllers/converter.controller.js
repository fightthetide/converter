'use strict';

const Decimal = require('decimal.js');
const { response } = require('express');

const unitLegend = {
  ounce: 29.5735,
  cup: 236.588,
  liter: 1000
};

exports.convert = function(req, res) {
  const params = req.params;
  try {
    const outcome = new Decimal(unitLegend[params.fromUnit])
    .mul(params.qty)
    .div(unitLegend[params.toUnit])
    .toFixed(3);

    res.json({outcome: outcome});
  } catch(error) {
    res.status(400);
    res.json({
      error: `${error.name}: ${error.message}`,
      parameters: req.params
    });
  }
};
