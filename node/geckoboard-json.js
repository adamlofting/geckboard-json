/**
 * Creates suitable JSON for Geckoboard's Number and Secondary Stat widget
 * https://developer.geckoboard.com/#number-and-secondary-stat
 * @param  {Integer} number, the number to display
 * @param  {Text} text, the text to display
 * @return {JSON} Formatted as per: https://developer.geckoboard.com/#number-and-secondary-stat
 */
function numberAndSecondaryStat (number, text) {
  var output = {
    "item": [
      {
        "value": number,
        "text": text
      }
    ]
  };
  return output;
}

/**
 * Creates suitable JSON for Geckoboard's Funnel widget
 * https://developer.geckoboard.com/#funnel
 * @param  {Array} arr, Array of objects
 * @param  {String} valueFieldName, Name of the object field to use as the value
 * @param  {String} labelFieldName, Name of the object field to use as the label
 * @return {JSON} Formatted as per: https://developer.geckoboard.com/#funnel
 */
function funnel (arr, valueFieldName, labelFieldName) {
  // geckboard funnel holds a maximum of 8 items
  if (arr.length > 8) {
    arr = arr.slice(0,8);
  }

  var steps = [];
  for (var i = 0; i < arr.length; i++) {
    var step = {
      "value": arr[i][valueFieldName],
      "label": arr[i][labelFieldName]
    };
    steps.push(step);
  }
  var output = {
    "item": steps
  };
  return output;
}

/**
 * Creates suitable JSON for Geckoboard's Line Chart widget
 * https://developer.geckoboard.com/#line-chart
 * @param  {Array} arr, Array of objects
 * @param  {String} valueFieldName, Name of the object field to plot
 * @param  {String} labelFieldName, Name of the object field to use as the x-axis label
 * @param  {[type]} options (.color as hexcode color, .usingDate:true will shorted dates to 'MM-DD')
 * @return {JSON} Formatted as per: https://developer.geckoboard.com/#line-chart
 */
function lineChart (arr, valueFieldName, labelFieldName, options) {
  if (arr.length > 120) {
    arr = arr.slice(0,120);
  }

  var geckoboardJSON = {};
  var item = []; // this stores the values
  var settings = {};
  var axisx = [];
  var axisy = [];

  if (options) {
    if (options.color) {
      color = options.color;
      settings.color = color;
    }
  }

  for (var i = 0; i < arr.length; i++) {
    item.push(arr[i][valueFieldName]);
    axisx.push(arr[i][labelFieldName]);
  }

  if (options && options.usingDates) {
    for (var j = 0; j < axisx.length; j++) {
      var d = new Date(axisx[j]);
      var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
      var dd  = d.getDate().toString();
      axisx[j] =  (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
    }
  }

  var lowest;
  var highest;

  for (var i = 0; i < item.length; i++) {
    var thisItem = item[i];
    if (!lowest || (thisItem < lowest)) {
      lowest = thisItem;
    }
    if (!highest || (thisItem > highest)) {
      highest = thisItem;
    }
  }

  lowest = Math.round(lowest * 100) / 100;
  highest = Math.round(highest * 100) / 100;

  axisy = [lowest, highest];

  settings.axisx = axisx;
  settings.axisy = axisy;
  geckoboardJSON.item = item;
  geckoboardJSON.settings = settings;

  return geckoboardJSON;
}

/**
 * Creates suitable JSON for Geckoboard's High Charts widget
 * https://developer.geckoboard.com/line-chart#highcharts
 * @param  {Array} arr, Array of objects
 * @param  {String} valueFieldName, Name of the object field to plot
 * @param  {String} labelFieldName, Name of the object field to use as the x-axis label
 * @param  {[type]} options (.color as hexcode color, .usingDate:true will shorted dates to 'MM-DD')
 * @return {JSON} Formatted as per: https://developer.geckoboard.com/#line-chart
 */
function highChartLineChart (arr, valueFieldName, labelFieldName, options) {
  if (arr.length > 120) {
    arr = arr.slice(0,120);
  }

  // The object we'll output
  var geckoboardJSON = {};

  // build up the elements in chunks

  // Chart settings
  geckoboardJSON.chart = {
    style: {
      color: "#b9bbbb"
    },
    renderTo: "container",
    backgroundColor: "transparent",
    lineColor: "rgba(35,37,38,0.5)",
    plotShadow: false
  };

  // Credits settings
  geckoboardJSON.credits = {
    enabled: false
  };

  // Title settings
  geckoboardJSON.title = {
    text: null
  };

  // yAxis
  geckoboardJSON.yXis = {
    title: {
      text: null
    },
    floor: 0,
    ceiling: 100
  };

  // legend
  geckoboardJSON.legend = {
      enabled: false
  };

  // we'll work on these objects before adding them to geckoboardJSON:

  // xAxis
  var xAxis = {
    categories: []
  };
  var ourCategories = [];

  // the data that we are graphing
  var series = []; // holds the data to display
  var series1 = {
    color: "#108ec5",
    name: ""
  };
  var ourData = [];

  // then modify these objects using our data and settings:

  if (options) {
    if (options.color) {
      color = options.color;
      series1.color = color;
    }
  }

  for (var i = 0; i < arr.length; i++) {
    ourData.push(arr[i][valueFieldName]);
    ourCategories.push(arr[i][labelFieldName]);
  }

  series1.data = ourData;
  series.push(series1);
  geckoboardJSON.series = series;

  if (options && options.usingDates) {
    for (var j = 0; j < ourCategories.length; j++) {
      var d = new Date(ourCategories[j]);
      var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
      var dd  = d.getDate().toString();
      ourCategories[j] =  (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
    }
  }

  xAxis.categories = ourCategories;
  geckoboardJSON.xAxis = xAxis;

  return geckoboardJSON;
}

module.exports = {
  numberAndSecondaryStat: numberAndSecondaryStat,
  funnel: funnel,
  lineChart: lineChart,
  highChartLineChart: highChartLineChart
};

