const converter = require('./converter.controller.js');
const MockResponse = require('mock-express-response');
const { expect } = require('@jest/globals');
require('jest-extended');

// Happy path
const happyPathScenarios = [
  { qty: 1, fromUnit: 'ounce', toUnit: 'cup', outcome: '0.125' },
  { qty: 1, fromUnit: 'cup', toUnit: 'ounce', outcome: '8.000' },
  { qty: 1, fromUnit: 'liter', toUnit: 'ounce', outcome: '33.814' }
];

happyPathScenarios.forEach((scenario) => {
  let label = `${scenario.qty} ${scenario.fromUnit}(s) to ${scenario.outcome} ${scenario.toUnit}s`;
  test(label, () => {
    let response = new MockResponse();
    converter.convert({ params: scenario }, response);
    const payload = response._getJSON();
    expect(payload.outcome).toBe(scenario.outcome);
  });
});

// Unhappy path
let errorResponse = {
  error: "Error: [DecimalError] Invalid argument: undefined"
}

const unhappyScenarios = {
  'Bad from unit': { qty: 1, fromUnit: 'loud', toUnit: 'cup'},
  'Bad to unit': { qty: 1, fromUnit: 'cup', toUnit: 'loud' },
  'Bad quantity': { qty: 'one', fromUnit: 'ounce', toUnit: 'cup' }
}

for(let scenarioLabel in unhappyScenarios) {
  let scenario = unhappyScenarios[scenarioLabel];
  test(scenarioLabel, () => {
    let response = new MockResponse();
    converter.convert({ params: scenario }, response);
    const payload = response._getJSON();

    expect(payload.error).toStartWith('Error: [DecimalError] Invalid argument:');
    expect(payload.parameters).toStrictEqual(scenario);
  });
};