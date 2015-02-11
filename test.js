var geckoboardJSON = require('./node/geckoboard-json.js');

var dummyData = [
  {
    "date": "2015-02-10",
    "value": 0.42500000000000004
  },
  {
    "date": "2015-02-09",
    "value": 0.555
  },
  {
    "date": "2015-02-08",
    "value": 0.845
  },
  {
    "date": "2015-02-07",
    "value": 1.09
  },
  {
    "date": "2015-02-06",
    "value": 1.124
  },
  {
    "date": "2015-02-05",
    "value": 1.155
  },
  {
    "date": "2015-02-04",
    "value": 1.0739999999999998
  }
];

console.log(geckoboardJSON.lineChart(dummyData, 'value', 'date', {usingDates: true}));
