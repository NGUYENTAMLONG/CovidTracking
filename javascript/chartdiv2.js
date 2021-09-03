am4core
  .ready(function () {
    let urlAPI = "https://api.covid19api.com/summary";
    fetch(urlAPI)
      .then((res) => res.text())
      .then((data) => {
        var obj = JSON.parse(data);
        var countries = obj["Countries"];
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv2", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();
        let USA_DATA = countries.find((item) => item.CountryCode === "US");
        let CN_DATA = countries.find((item) => item.CountryCode === "CN");
        let JP_DATA = countries.find((item) => item.CountryCode === "JP");
        let BR_DATA = countries.find((item) => item.CountryCode === "BR");
        let MX_DATA = countries.find((item) => item.CountryCode === "MX");
        let GB_DATA = countries.find((item) => item.CountryCode === "GB");
        let FR_DATA = countries.find((item) => item.CountryCode === "FR");
        let IT_DATA = countries.find((item) => item.CountryCode === "IT");
        let QA_DATA = countries.find((item) => item.CountryCode === "QA");
        let RU_DATA = countries.find((item) => item.CountryCode === "RU");
        let IN_DATA = countries.find((item) => item.CountryCode === "IN");
        let INDO_DATA = countries.find((item) => item.CountryCode === "ID");
        let VN_DATA = countries.find((item) => item.CountryCode === "VN");
        let AU_DATA = countries.find((item) => item.CountryCode === "AU");
        // Add data
        chart.data = [
          {
            country: "USA",
            deaths: USA_DATA.TotalConfirmed,
          },
          {
            country: "Brazil",
            deaths: BR_DATA.TotalConfirmed,
          },
          {
            country: "Mexico",
            deaths: MX_DATA.TotalConfirmed,
          },
          {
            country: "UK",
            deaths: GB_DATA.TotalConfirmed,
          },
          {
            country: "France",
            deaths: FR_DATA.TotalConfirmed,
          },
          {
            country: "Italy",
            deaths: IT_DATA.TotalConfirmed,
          },
          {
            country: "Qatar",
            deaths: QA_DATA.TotalConfirmed,
          },
          {
            country: "Rusia",
            deaths: RU_DATA.TotalConfirmed,
          },
          {
            country: "India",
            deaths: IN_DATA.TotalConfirmed,
          },
          {
            country: "Japan",
            deaths: JP_DATA.TotalConfirmed,
          },
          {
            country: "China",
            deaths: CN_DATA.TotalConfirmed,
          },
          {
            country: "Viet Nam",
            deaths: VN_DATA.TotalConfirmed,
          },
          {
            country: "Indonesia",
            deaths: INDO_DATA.TotalConfirmed,
          },
          {
            country: "Australia",
            deaths: AU_DATA.TotalConfirmed,
          },
        ];

        prepareParetoData();

        function prepareParetoData() {
          var total = 0;

          for (var i = 0; i < chart.data.length; i++) {
            var value = chart.data[i].deaths;
            total += value;
          }

          var sum = 0;
          for (var i = 0; i < chart.data.length; i++) {
            var value = chart.data[i].deaths;
            sum += value;
            chart.data[i].pareto = (sum / total) * 100;
          }
        }

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.tooltip.disabled = true;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;
        valueAxis.min = 0;
        valueAxis.cursorTooltipEnabled = false;

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = "deaths";
        series.dataFields.categoryX = "country";
        series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
        series.columns.template.strokeWidth = 0;

        series.tooltip.pointerOrientation = "vertical";

        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;

        // on hover, make corner radiuses bigger
        var hoverState = series.columns.template.column.states.create("hover");
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;

        series.columns.template.adapter.add("fill", function (fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        });

        var paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        paretoValueAxis.renderer.opposite = true;
        paretoValueAxis.min = 0;
        paretoValueAxis.max = 100;
        paretoValueAxis.strictMinMax = true;
        paretoValueAxis.renderer.grid.template.disabled = true;
        paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
        paretoValueAxis.numberFormatter.numberFormat = "#'%'";
        paretoValueAxis.cursorTooltipEnabled = false;

        var paretoSeries = chart.series.push(new am4charts.LineSeries());
        paretoSeries.dataFields.valueY = "pareto";
        paretoSeries.dataFields.categoryX = "country";
        paretoSeries.yAxis = paretoValueAxis;
        paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
        paretoSeries.bullets.push(new am4charts.CircleBullet());
        paretoSeries.strokeWidth = 2;
        paretoSeries.stroke = new am4core.InterfaceColorSet().getFor(
          "alternativeBackground"
        );
        paretoSeries.strokeOpacity = 0.5;

        // Cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panX";
      }); // end am4core.ready()
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Themes begin
