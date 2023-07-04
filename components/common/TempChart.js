// /**
//  * ---------------------------------------
//  * This demo was created using amCharts 4.
//  * 
//  * For more information visit:
//  * https://www.amcharts.com/
//  * 
//  * Documentation is available at:
//  * https://www.amcharts.com/docs/v4/
//  * ---------------------------------------
//  */

// // Themes begin
// am4core.useTheme(am4themes_animated);
// // Themes end

// var chart = am4core.create("chartdiv", am4charts.XYChart);
// chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

// chart.paddingRight = 30;
// chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

// var colorSet = new am4core.ColorSet();
// colorSet.saturation = 0.4;

// chart.data = [
//   {
//     name: "John",
//     fromDate: "2018-01-01 08:00",
//     toDate: "2018-01-01 10:00",
//     color: colorSet.getIndex(0).brighten(0)
//   },
//   {
//     name: "John",
//     fromDate: "2018-01-01 12:00",
//     toDate: "2018-01-01 15:00",
//     color: colorSet.getIndex(0).brighten(0.4)
//   },
//   {
//     name: "John",
//     fromDate: "2018-01-01 15:30",
//     toDate: "2018-01-01 21:30",
//     color: colorSet.getIndex(0).brighten(0.8)
//   },

//   {
//     name: "Jane",
//     fromDate: "2018-01-01 09:00",
//     toDate: "2018-01-01 12:00",
//     color: colorSet.getIndex(2).brighten(0)
//   },
//   {
//     name: "Jane",
//     fromDate: "2018-01-01 13:00",
//     toDate: "2018-01-01 17:00",
//     color: colorSet.getIndex(2).brighten(0.4)
//   },

//   {
//     name: "Peter",
//     fromDate: "2018-01-01 11:00",
//     toDate: "2018-01-01 16:00",
//     color: colorSet.getIndex(4).brighten(0)
//   },
//   {
//     name: "Peter",
//     fromDate: "2018-01-01 16:00",
//     toDate: "2018-01-01 19:00",
//     color: colorSet.getIndex(4).brighten(0.4)
//   },

//   {
//     name: "Melania",
//     fromDate: "2018-01-01 16:00",
//     toDate: "2018-01-01 20:00",
//     color: colorSet.getIndex(6).brighten(0)
//   },
//   {
//     name: "Melania",
//     fromDate: "2018-01-01 20:30",
//     toDate: "2018-01-01 24:00",
//     color: colorSet.getIndex(6).brighten(0.4)
//   },

//   {
//     name: "Donald",
//     fromDate: "2018-01-01 13:00",
//     toDate: "2018-01-01 24:00",
//     color: colorSet.getIndex(8).brighten(0)
//   }
// ];

// var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
// categoryAxis.dataFields.category = "name";
// categoryAxis.renderer.grid.template.location = 0;
// categoryAxis.renderer.inversed = true;
// categoryAxis.renderer.cellStartLocation = 0.1;
// categoryAxis.renderer.cellEndLocation = 0.9;

// var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
// dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm";
// dateAxis.renderer.minGridDistance = 70;
// dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
// dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
// dateAxis.strictMinMax = true;
// dateAxis.renderer.tooltipLocation = 0;

// var series1 = chart.series.push(new am4charts.ColumnSeries());
// series1.columns.template.tooltipText = "{name}: {openDateX} - {dateX}";
// series1.dataFields.openDateX = "fromDate";
// series1.dataFields.dateX = "toDate";
// series1.dataFields.categoryY = "name";
// series1.columns.template.propertyFields.fill = "color"; // get color from data
// series1.columns.template.propertyFields.stroke = "color";
// series1.columns.template.strokeOpacity = 1;
// series1.columns.template.height = am4core.percent(100);

// chart.scrollbarX = new am4core.Scrollbar();

// function createFill(category, date, openDate, color, span) {
//   var fillAxis = chart.yAxes.push(new am4charts.CategoryAxis());
//   fillAxis.dataFields.category = "name";
//   fillAxis.renderer.grid.template.disabled = true;
//   fillAxis.renderer.labels.template.disabled = true;
//   fillAxis.renderer.inversed = true;
//   fillAxis.renderer.cellStartLocation = categoryAxis.renderer.cellStartLocation;
//   fillAxis.renderer.cellEndLocation = span - fillAxis.renderer.cellStartLocation;
  
//   var fillSeries = chart.series.push(new am4charts.ColumnSeries());
//   fillSeries.clustered = false;
//   fillSeries.yAxis = fillAxis;
//   fillSeries.columns.template.height = am4core.percent(100);
//   fillSeries.columns.template.tooltipText = "{name}: {openDateX} - {dateX}";
//   fillSeries.columns.template.fillOpacity = 0.4;
//     fillSeries.columns.template.strokeOpacity = 0;
//   fillSeries.dataFields.openDateX = "fromDate";
//   fillSeries.dataFields.dateX = "toDate";
//   fillSeries.dataFields.categoryY = "name";
//   fillSeries.fill = color;
//   fillSeries.stroke = color;
//   fillSeries.data = [{
//     fromDate: openDate,
//     toDate: date,
//     name: category
//   }];
// }

// createFill("John", "2018-01-01 13:30", "2018-01-01 18:30", am4core.color("red", 0.8), 1);
// createFill("John", "2018-01-01 19:30", "2018-01-01 18:30", am4core.color("red", 0.8), 1);
// createFill("Peter", "2018-01-01 10:00", "2018-01-01 16:30", am4core.color("green", 0.8), 3);