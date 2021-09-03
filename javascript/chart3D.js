am4core
  .ready(function () {
    // Themes begin
    let urlAPI = "https://api.covid19api.com/summary";
    fetch(urlAPI)
      .then((res) => res.text())
      .then((data) => {
        var obj = JSON.parse(data);
        var countries = obj["Countries"];
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv3D", am4charts.XYChart3D);
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
            deaths: USA_DATA.TotalDeaths,
          },
          {
            country: "Brazil",
            deaths: BR_DATA.TotalDeaths,
          },
          {
            country: "Mexico",
            deaths: MX_DATA.TotalDeaths,
          },
          {
            country: "UK",
            deaths: GB_DATA.TotalDeaths,
          },
          {
            country: "France",
            deaths: FR_DATA.TotalDeaths,
          },
          {
            country: "Italy",
            deaths: IT_DATA.TotalDeaths,
          },
          {
            country: "Qatar",
            deaths: QA_DATA.TotalDeaths,
          },
          {
            country: "Rusia",
            deaths: RU_DATA.TotalDeaths,
          },
          {
            country: "India",
            deaths: IN_DATA.TotalDeaths,
          },
          {
            country: "Japan",
            deaths: JP_DATA.TotalDeaths,
          },
          {
            country: "China",
            deaths: CN_DATA.TotalDeaths,
          },
          {
            country: "Viet Nam",
            deaths: VN_DATA.TotalDeaths,
          },
          {
            country: "Indonesia",
            deaths: INDO_DATA.TotalDeaths,
          },
          {
            country: "Australia",
            deaths: AU_DATA.TotalDeaths,
          },
        ];

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.renderer.labels.template.hideOversized = false;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.tooltip.label.rotation = 270;
        categoryAxis.tooltip.label.horizontalCenter = "right";
        categoryAxis.tooltip.label.verticalCenter = "middle";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Countries";
        valueAxis.title.fontWeight = "bold";

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueY = "deaths";
        series.dataFields.categoryX = "country";
        series.name = "deaths";
        series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = 0.8;

        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
        columnTemplate.stroke = am4core.color("#FFFFFF");

        columnTemplate.adapter.add("fill", function (fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        });

        columnTemplate.adapter.add("stroke", function (stroke, target) {
          return chart.colors.getIndex(target.dataItem.index);
        });

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineY.strokeOpacity = 0;
      }); // end am4core.ready()
  })
  .catch((error) => {
    console.error("Error:", error);
  });
