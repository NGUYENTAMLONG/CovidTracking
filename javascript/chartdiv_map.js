let urlAPI = "https://api.covid19api.com/summary";
fetch(urlAPI)
  .then((res) => res.text())
  .then((data) => {
    var obj = JSON.parse(data);
    var countries = obj["Countries"];
    am4core.ready(function () {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create map instance
      var chart = am4core.create("chartdiv_map", am4maps.MapChart);

      var title = chart.titles.create();
      title.text =
        "[bold font-size: 20] 🌏 Số ca nhiễm mới cập nhật của các nước trên thế giới 👾[/]\nsource: Gapminder";
      title.textAlign = "middle";

      var mapData = [];
      countries.map((country) => {
        var objCountry = {
          id: country.CountryCode,
          name: country["Country"],
          value: country["NewConfirmed"],
          color: chart.colors.getIndex(0),
        };
        mapData.push(objCountry);
      });

      // Set map definition
      chart.geodata = am4geodata_worldLow;

      // Set projection
      chart.projection = new am4maps.projections.Miller();

      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.exclude = ["AQ"];
      polygonSeries.useGeodata = true;
      polygonSeries.nonScalingStroke = true;
      polygonSeries.strokeWidth = 0.5;
      polygonSeries.calculateVisualCenter = true;

      var imageSeries = chart.series.push(new am4maps.MapImageSeries());
      imageSeries.data = mapData;
      imageSeries.dataFields.value = "value";

      var imageTemplate = imageSeries.mapImages.template;
      imageTemplate.nonScaling = true;

      var circle = imageTemplate.createChild(am4core.Circle);
      circle.fillOpacity = 0.7;
      circle.propertyFields.fill = "color";
      circle.tooltipText = "{name}: [bold]{value}[/]";

      imageSeries.heatRules.push({
        target: circle,
        property: "radius",
        min: 4,
        max: 30,
        dataField: "value",
      });

      imageTemplate.adapter.add("latitude", function (latitude, target) {
        var polygon = polygonSeries.getPolygonById(
          target.dataItem.dataContext.id
        );
        if (polygon) {
          return polygon.visualLatitude;
        }
        return latitude;
      });

      imageTemplate.adapter.add("longitude", function (longitude, target) {
        var polygon = polygonSeries.getPolygonById(
          target.dataItem.dataContext.id
        );
        if (polygon) {
          return polygon.visualLongitude;
        }
        return longitude;
      });
    }); // end am4core.ready()

    // GLOBAL MAP COVID
    am4core.ready(function () {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create map instance
      var chart = am4core.create("chartdivGlobal", am4maps.MapChart);
      var interfaceColors = new am4core.InterfaceColorSet();

      try {
        chart.geodata = am4geodata_worldLow;
      } catch (e) {
        chart.raiseCriticalError(
          new Error(
            'Map geodata could not be loaded. Please download the latest <a href="https://www.amcharts.com/download/download-v4/">amcharts geodata</a> and extract its contents into the same directory as your amCharts files.'
          )
        );
      }

      var label = chart.createChild(am4core.Label);
      label.text =
        "12 months (3/7/2019 data) rolling measles\nincidence per 1'000'000 total population. \n Bullet size uses logarithmic scale.";
      label.fontSize = 12;
      label.align = "left";
      label.valign = "bottom";
      label.fill = am4core.color("white");
      label.background = new am4core.RoundedRectangle();
      label.background.cornerRadius(10, 10, 10, 10);
      label.padding(10, 10, 10, 10);
      label.marginLeft = 30;
      label.marginBottom = 30;
      label.fontSize = 17;
      label.background.strokeOpacity = 0.3;
      label.background.stroke = am4core.color("#927459");
      label.background.fill = am4core.color("#f9e3ce");
      label.background.fillOpacity = 0.6;

      var dataSource = chart.createChild(am4core.TextLink);
      dataSource.text = "Data source: WHO";
      dataSource.fontSize = 12;
      dataSource.align = "left";
      dataSource.valign = "top";
      dataSource.url =
        "https://www.who.int/immunization/monitoring_surveillance/burden/vpd/surveillance_type/active/measles_monthlydata/en/";
      dataSource.urlTarget = "_blank";
      dataSource.fill = am4core.color("white");
      dataSource.padding(10, 10, 10, 10);
      dataSource.marginLeft = 30;
      dataSource.marginTop = 30;
      dataSource.fontSize = 30;

      // Set projection
      chart.projection = new am4maps.projections.Orthographic();
      chart.panBehavior = "rotateLongLat";
      chart.padding(20, 20, 20, 20);

      // Add zoom control
      chart.zoomControl = new am4maps.ZoomControl();

      var homeButton = new am4core.Button();
      homeButton.events.on("hit", function () {
        chart.goHome();
      });

      homeButton.icon = new am4core.Sprite();
      homeButton.padding(7, 5, 7, 5);
      homeButton.width = 30;
      homeButton.icon.path =
        "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
      homeButton.marginBottom = 10;
      homeButton.parent = chart.zoomControl;
      homeButton.insertBefore(chart.zoomControl.plusButton);

      chart.backgroundSeries.mapPolygons.template.polygon.fill =
        am4core.color("#4BC0C8");
      chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
      chart.deltaLongitude = 20;
      chart.deltaLatitude = -20;

      // limits vertical rotation
      chart.adapter.add("deltaLatitude", function (delatLatitude) {
        return am4core.math.fitToRange(delatLatitude, -90, 90);
      });

      // Create map polygon series

      var shadowPolygonSeries = chart.series.push(
        new am4maps.MapPolygonSeries()
      );
      shadowPolygonSeries.geodata = am4geodata_continentsLow;

      try {
        shadowPolygonSeries.geodata = am4geodata_continentsLow;
      } catch (e) {
        shadowPolygonSeries.raiseCriticalError(
          new Error(
            'Map geodata could not be loaded. Please download the latest <a href="https://www.amcharts.com/download/download-v4/">amcharts geodata</a> and extract its contents into the same directory as your amCharts files.'
          )
        );
      }

      shadowPolygonSeries.useGeodata = true;
      shadowPolygonSeries.dx = 2;
      shadowPolygonSeries.dy = 2;
      shadowPolygonSeries.mapPolygons.template.fill = am4core.color("#000");
      shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
      shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
      shadowPolygonSeries.fillOpacity = 0.1;
      shadowPolygonSeries.fill = am4core.color("#000");

      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;

      polygonSeries.calculateVisualCenter = true;
      polygonSeries.tooltip.background.fillOpacity = 0.2;
      polygonSeries.tooltip.background.cornerRadius = 20;

      var template = polygonSeries.mapPolygons.template;
      template.nonScalingStroke = true;
      template.fill = am4core.color("#f9e3ce");
      template.stroke = am4core.color("#e2c9b0");

      polygonSeries.calculateVisualCenter = true;
      template.propertyFields.id = "id";
      template.tooltipPosition = "fixed";
      template.fillOpacity = 1;

      template.events.on("over", function (event) {
        if (event.target.dummyData) {
          event.target.dummyData.isHover = true;
        }
      });
      template.events.on("out", function (event) {
        if (event.target.dummyData) {
          event.target.dummyData.isHover = false;
        }
      });

      var hs = polygonSeries.mapPolygons.template.states.create("hover");
      hs.properties.fillOpacity = 1;
      hs.properties.fill = am4core.color("#52c234");

      var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
      graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
      graticuleSeries.fitExtent = false;
      graticuleSeries.mapLines.template.strokeOpacity = 0.2;
      graticuleSeries.mapLines.template.stroke = am4core.color("#fff");

      var measelsSeries = chart.series.push(new am4maps.MapPolygonSeries());
      measelsSeries.tooltip.background.fillOpacity = 0;
      measelsSeries.tooltip.background.cornerRadius = 20;
      measelsSeries.tooltip.autoTextColor = false;
      measelsSeries.tooltip.label.fill = am4core.color("#000");
      measelsSeries.tooltip.dy = -5;

      var measelTemplate = measelsSeries.mapPolygons.template;
      measelTemplate.fill = am4core.color("crimson");
      measelTemplate.strokeOpacity = 0;
      measelTemplate.fillOpacity = 0.75;
      measelTemplate.tooltipPosition = "fixed";

      var hs2 = measelsSeries.mapPolygons.template.states.create("hover");
      hs2.properties.fillOpacity = 1;
      hs2.properties.fill = am4core.color("red");

      polygonSeries.events.on("inited", function () {
        polygonSeries.mapPolygons.each(function (mapPolygon) {
          var count = data[mapPolygon.id];

          if (count > 0) {
            var polygon = measelsSeries.mapPolygons.create();
            polygon.multiPolygon = am4maps.getCircle(
              mapPolygon.visualLongitude,
              mapPolygon.visualLatitude,
              Math.max(0.2, (Math.log(count) * Math.LN10) / 10)
            );
            polygon.tooltipText =
              mapPolygon.dataItem.dataContext.name + ": " + count;
            mapPolygon.dummyData = polygon;
            polygon.events.on("over", function () {
              mapPolygon.isHover = true;
            });
            polygon.events.on("out", function () {
              mapPolygon.isHover = false;
            });
          } else {
            mapPolygon.tooltipText =
              mapPolygon.dataItem.dataContext.name + ": no data";
            mapPolygon.fillOpacity = 0.9;
          }
        });
      });
      var data = {};
      countries.map((country) => {
        data[`${country.CountryCode}`] = country.NewDeaths;
      });
    }); // end am4core.ready()
  })
  .catch((error) => {
    console.error("Error:", error);
  });
