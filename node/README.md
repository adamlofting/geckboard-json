# geckoboard-json

`npm install geckoboard-json`

``` JavaScript
var geckoboardJSON = require('geckoboard-json');

var yourArray = [{"date": "2015-01-20","value": 0.632},{"date": "2015-01-19","value": 5.436},{"date": "2015-01-18","value": 5.991},{"date": "2015-01-17","value": 5.777},{"date": "2015-01-16","value": 5.878},{"date": "2015-01-15","value": 5.628},{"date": "2015-01-14","value": 5.772}];

// transform this for geckoboard
var transformed = geckoboardJSON.lineChart(yourArray, 'value', 'date', {usingDates: true});

// outout this, e.g.:
res.json(transformed);

```
