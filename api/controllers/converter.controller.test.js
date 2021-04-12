const converter = require('./converter.controller.js');

const scenarios = [
    {qty: 1, fromUnit: 'ounce', toUnit: 'cup', outcome: 0.125},
    {qty: 1, fromUnit: 'cup', toUnit: 'ounce', outcome: 8},
    {qty: 1, fromUnit: 'liter', toUnit: 'ounce', outcome: 33.81405650328842}
];

scenarios.forEach( (scenario) => {
    let label = `${scenario.qty} ${scenario.fromUnit}(s) to ${scenario.outcome} ${scenario.toUnit}s`;
    test(label, () => {
        expect(converter.convert({params: scenario})).toBe(scenario.outcome);
    });
});
