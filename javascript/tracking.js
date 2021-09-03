// tracking header + world covid ìnormation
var selecter = document.querySelector("select[name='country']");
var flag = document.querySelector(".flag");
var world = document.querySelector(".world");

// DOM chart
var note = document.querySelector(".note");
var chart = document.querySelector(".chart");
var chart30 = document.querySelector(".chart30");
// buttons
var btn1 = document.querySelector(".btn").querySelectorAll(".btn_item")[0];
var btn2 = document.querySelector(".btn").querySelectorAll(".btn_item")[1];

var arrNum = document.querySelector(".desc_num").querySelectorAll(".counter");
var tooltipText = document.querySelector(".tooltiptext");

function getFlag(idCountry) {
  flag.innerHTML = `<wired-image elevation="4" src="https://www.countryflags.io/${idCountry}/shiny/64.png" style="margin-top:10px;padding:10px 20px"></wired-image> <b class="idCountry">${idCountry}</b>`;
  let urlAPI = "https://api.covid19api.com/summary";

  fetch(urlAPI)
    .then((res) => res.text())
    .then((data) => {
      var obj = JSON.parse(data);
      var countries = obj["Countries"];
      // cupchart
      am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        var iconPath =
          "M421.976,136.204h-23.409l-0.012,0.008c-0.19-20.728-1.405-41.457-3.643-61.704l-1.476-13.352H5.159L3.682,74.507 C1.239,96.601,0,119.273,0,141.895c0,65.221,7.788,126.69,22.52,177.761c7.67,26.588,17.259,50.661,28.5,71.548  c11.793,21.915,25.534,40.556,40.839,55.406l4.364,4.234h206.148l4.364-4.234c15.306-14.85,29.046-33.491,40.839-55.406  c11.241-20.888,20.829-44.96,28.5-71.548c0.325-1.127,0.643-2.266,0.961-3.404h44.94c49.639,0,90.024-40.385,90.024-90.024  C512,176.588,471.615,136.204,421.976,136.204z M421.976,256.252h-32c3.061-19.239,5.329-39.333,6.766-60.048h25.234  c16.582,0,30.024,13.442,30.024,30.024C452,242.81,438.558,256.252,421.976,256.252z";
        var chart = am4core.create("cupChart", am4charts.SlicedChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        chart.paddingLeft = 150;
        let country = countries.find((item) => item.CountryCode === idCountry);
        chart.data = [
          {
            name: "Tổng số ca tử vong",
            value: country.TotalDeaths,
            disabled: true,
          },
          {
            name: "Tổng số  ca mắc ",
            value: country.TotalConfirmed,
          },
        ];
        var series = chart.series.push(new am4charts.PictorialStackedSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "name";
        series.alignLabels = true;
        // this makes only A label to be visible
        series.labels.template.propertyFields.disabled = "disabled";
        series.ticks.template.propertyFields.disabled = "disabled";
        series.maskSprite.path = iconPath;
        series.ticks.template.locationX = 1;
        series.ticks.template.locationY = 0;
        series.labelsContainer.width = 250;
        chart.legend = new am4charts.Legend();
        chart.legend.position = "top";
        chart.legend.paddingRight = 160;
        chart.legend.paddingBottom = 40;
        let marker = chart.legend.markers.template.children.getIndex(0);
        chart.legend.markers.template.width = 40;
        chart.legend.markers.template.height = 40;
        marker.cornerRadius(20, 20, 20, 20);
        let titleCupChart = document.querySelector("#cupChart_title");
        titleCupChart.innerHTML = ` 📊 Biểu đồ thể hiện tỷ lệ tổng số ca tử vong và tổng số ca mắc của <b style="color:'crimson'">${country.Country} </b>💹💹💹`;

        // let titleCupChart = document.querySelector("#cupChart_title");
        // titleCupChart.innerHTML = ` 📊 Biểu đồ thể hiện tỷ lệ số ca tử vong và số ca mắc mới cập nhật của <b style="color:'crimson'">${country.Country} </b>💹💹💹`;
      }); // end am4core.ready()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function getCountry() {
  let urlAPI = "https://api.covid19api.com/countries";
  var myData = fetch(urlAPI)
    .then((res) => res.text())
    .then((data) => {
      var countries = JSON.parse(data);
      var totalContries = countries.length;
      countries.forEach((country, index) => {
        selecter.innerHTML += `<option value='${country.Country}'>${country.Country}</option>`;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function getCovidWorld() {
  let urlAPI = "https://api.covid19api.com/summary";
  var myData = fetch(urlAPI)
    .then((res) => res.text())
    .then((data) => {
      var obj = JSON.parse(data);
      var worldCovidData = obj["Global"];

      world.innerHTML = `<h2>🌎 THẾ GIỚI </h2><p>Số ca mới: <b>${worldCovidData["NewConfirmed"]}</b></p><p>Tổng số ca: <b>${worldCovidData["TotalConfirmed"]}</b></p><p>Số ca tử vong: <b>${worldCovidData["NewDeaths"]}</b></p> <p>Tổng số ca tử vong: <b>${worldCovidData["TotalDeaths"]}</b></p>`;
      note.innerHTML = `Dữ liệu cập nhật lúc: <b>${worldCovidData.Date}</b>`;

      am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        //Find Data
        USA_DATA = obj["Countries"].find((item) => item.CountryCode == "US");
        BR_DATA = obj["Countries"].find((item) => item.CountryCode == "BR");
        MX_DATA = obj["Countries"].find((item) => item.CountryCode == "MX");
        GB_DATA = obj["Countries"].find((item) => item.CountryCode == "GB");
        FR_DATA = obj["Countries"].find((item) => item.CountryCode == "FR");
        IT_DATA = obj["Countries"].find((item) => item.CountryCode == "IT");
        QA_DATA = obj["Countries"].find((item) => item.CountryCode == "QA");
        RU_DATA = obj["Countries"].find((item) => item.CountryCode == "RU");
        IN_DATA = obj["Countries"].find((item) => item.CountryCode == "IN");
        JP_DATA = obj["Countries"].find((item) => item.CountryCode == "JP");
        CN_DATA = obj["Countries"].find((item) => item.CountryCode == "CN");
        INDO_DATA = obj["Countries"].find((item) => item.CountryCode == "ID");
        VN_DATA = obj["Countries"].find((item) => item.CountryCode == "VN");
        AU_DATA = obj["Countries"].find((item) => item.CountryCode == "AU");

        // Add data

        chart.data = [
          {
            country: "USA",
            litres: USA_DATA.TotalConfirmed,
          },
          {
            country: "Brazil",
            litres: BR_DATA.TotalConfirmed,
          },
          {
            country: "Mexico",
            litres: MX_DATA.TotalConfirmed,
          },
          {
            country: "United Kingdom",
            litres: GB_DATA.TotalConfirmed,
          },
          {
            country: "France",
            litres: FR_DATA.TotalConfirmed,
          },
          {
            country: "Italy",
            litres: IT_DATA.TotalConfirmed,
          },
          {
            country: "Qatar",
            litres: QA_DATA.TotalConfirmed,
          },
          {
            country: "Rusia",
            litres: RU_DATA.TotalConfirmed,
          },
          {
            country: "India",
            litres: IN_DATA.TotalConfirmed,
          },
          {
            country: "Japan",
            litres: JP_DATA.TotalConfirmed,
          },
          {
            country: "China",
            litres: CN_DATA.TotalConfirmed,
          },
          {
            country: "Viet Nam",
            litres: VN_DATA.TotalConfirmed,
          },
          {
            country: "Indonesia",
            litres: INDO_DATA.TotalConfirmed,
          },
          {
            country: "Australia",
            litres: AU_DATA.TotalConfirmed,
          },
        ];

        // Set inner radius
        chart.innerRadius = am4core.percent(50);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
      }); // end am4core.ready()

      // WORLD MAP
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function getCovidNumber(country) {
  let urlAPI = `https://api.covid19api.com/dayone/country/${country}?from=2021-01-01T00:00:00`;
  var myData = fetch(urlAPI)
    .then((res) => res.text())
    .then((data) => {
      var numbers = JSON.parse(data);

      getFlag(numbers[0]["CountryCode"]);

      var dailyDates = [];
      var dailyConfirmed = [];
      var dailyRecovered = [];
      var dailyDeaths = [];
      var dailyDates30 = [];
      var dailyConfirmed30 = [];
      var dailyRecovered30 = [];
      var dailyDeaths30 = [];
      numbers.pop();
      numbers.slice(numbers.length - 7).forEach((item, index) => {
        dailyDates.push(item["Date"]);
        dailyConfirmed.push(item["Confirmed"]);
        dailyRecovered.push(item["Recovered"]);
        dailyDeaths.push(item["Deaths"]);
      });
      numbers.slice(numbers.length - 30).forEach((item, index) => {
        dailyDates30.push(item["Date"]);
        dailyConfirmed30.push(item["Confirmed"]);
        dailyRecovered30.push(item["Recovered"]);
        dailyDeaths30.push(item["Deaths"]);
      });

      arrNum[0].setAttribute(
        "data-count",
        `${numbers[numbers.length - 1].Confirmed}`
      );
      arrNum[1].setAttribute(
        "data-count",
        `${numbers[numbers.length - 1].Recovered}`
      );
      arrNum[2].setAttribute(
        "data-count",
        `${numbers[numbers.length - 1].Deaths}`
      );
      // counterUP
      // ***********************************************************
      $(".counter").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");

        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 8000,
            easing: "linear",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
      // ************************************************************
      // var Chart
      var xValues = dailyDates;
      var xValues30 = dailyDates30;

      chart.innerHTML = `<canvas
                               id="myChart_Confirmed"
                               style="width: 100%; max-width: 800px;margin:50px 0px;"
                             ></canvas>
                             <h2 tyle="font-weight:bold">Biểu đồ thể hiện số ca mắc trong vòng 7 ngày gần nhất của ${country}</h2>
                             <canvas
                               id="myChart_Recovered"
                               style="width: 100%; max-width: 800px;margin:50px 0px;"
                             ></canvas>
                             <h2 tyle="font-weight:bold">Biểu đồ thể hiện số ca nình phục trong vòng 7 ngày gần nhất của ${country}</h2>

                             <canvas id="myChart_Deaths" style="width: 100%; max-width: 800px;margin:50px 0px;"></canvas>
                             <h2 tyle="font-weight:bold">Biểu đồ thể hiện số ca tử vong trong vòng 7 ngày gần nhất của ${country}</h2>
                             `;
      chart30.innerHTML = `<canvas
                               id="myChart_Confirmed30"
                               style="width: 100%; max-width: 1000px;margin:50px 0px;"
                             ></canvas>
                             <h2 tyle="font-weight:bold">Biểu đồ thể hiện số ca mắc trong vòng 30 ngày gần nhất của ${country}</h2>
                             <canvas
                               id="myChart_Recovered30"
                               style="width: 100%; max-width: 1000px;margin:50px 0px;"
                             ></canvas>
                             <h2 tyle="font-weight:bold">Biểu đồ thể hiện số ca nình phục trong vòng 30 ngày gần nhất của ${country}</h2>

                             <canvas id="myChart_Deaths30" style="width: 100%; max-width: 1000px;margin:50px 0px;"></canvas>
                             <h2 tyle="font-weight:bold">Biểu đồ thể hiện số ca tử vong trong vòng 30 ngày gần nhất của ${country}</h2>
                             `;
      new Chart("myChart_Confirmed", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              label: "Số ca mắc",
              data: dailyConfirmed,
              borderColor: "rgb(231, 5, 5)",
              fill: false,
              hoverBorderWidth: "20",
            },
          ],
        },
        options: {
          legend: { display: false },
        },
      });
      new Chart("myChart_Recovered", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              label: "Số ca bình phục",
              data: dailyRecovered,
              borderColor: "rgb(6, 201, 23)",
              fill: false,
              hoverBorderWidth: "20",
            },
          ],
        },
        options: {
          legend: { display: false },
        },
      });
      new Chart("myChart_Deaths", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              label: "Số ca tử vong",
              data: dailyDeaths,
              borderColor: "gray",
              fill: false,
              hoverBorderWidth: "20",
            },
          ],
        },
        options: {
          legend: { display: false },
        },
      });

      // ///////////////////////////
      new Chart("myChart_Confirmed30", {
        type: "line",
        data: {
          labels: xValues30,
          datasets: [
            {
              label: "Số ca mắc",
              data: dailyConfirmed30,
              borderColor: "rgb(231, 5, 5)",
              fill: false,
              hoverBorderWidth: "20",
            },
          ],
        },
        options: {
          legend: { display: false },
        },
      });
      new Chart("myChart_Recovered30", {
        type: "line",
        data: {
          labels: xValues30,
          datasets: [
            {
              label: "Số ca bình phục",
              data: dailyRecovered30,
              borderColor: "rgb(6, 201, 23)",
              fill: false,
              hoverBorderWidth: "20",
            },
          ],
        },
        options: {
          legend: { display: false },
        },
      });
      new Chart("myChart_Deaths30", {
        type: "line",
        data: {
          labels: xValues30,
          datasets: [
            {
              label: "Số ca tử vong",
              data: dailyDeaths30,
              borderColor: "gray",
              fill: false,
              hoverBorderWidth: "20",
            },
          ],
        },
        options: {
          legend: { display: false },
        },
      });
      //chart donnut
      // <block:setup:1>
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
selecter.onchange = function () {
  getCovidNumber(selecter.value);
  const API = "https://restcountries.eu/rest/v2/all";
  fetch(API)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const countryDataFilter = data.filter(
        (data) => data["name"].toLowerCase() === selecter.value.toLowerCase()
      );
      const countryDataOfficial = countryDataFilter[0];

      const languagesName = [];
      const languagesNativeName = [];
      const languagesIso639_2 = [];

      countryDataOfficial["languages"].forEach((item) => {
        languagesName.push(item["name"]);
        languagesNativeName.push(item["nativeName"]);
        languagesIso639_2.push(item["iso639_2"]);
      });

      tooltipText.innerHTML = `<ul>
      <li>altSpellings 1:
      ${countryDataOfficial["altSpellings"][1]}</li>
      <li>altSpellings 2:
      ${countryDataOfficial["altSpellings"][2]}</li>
      <li>Region:
      ${countryDataOfficial["region"]}</li>
      <li>Subregion:
      ${countryDataOfficial["subregion"]}</li>
      <li>Population:
      ${countryDataOfficial["population"]}</li>
      <li>Languages:
      Name : ${languagesName.join(",")},
     Native Name: ${languagesNativeName.join(",")}
     CodeIso: ${languagesIso639_2.join(",")}</li>
      <li>lat & lng(Position):
      ${countryDataOfficial["latlng"].join(",")}</li>
      <li>Capital:
       ${countryDataOfficial["capital"]}</li>
       <li>Timezones:
      ${countryDataOfficial["timezones"].join(",")}</li>
       <li>Borders:
      ${countryDataOfficial["borders"].join(",")}</li>
      <li>Currencies:
      ${countryDataOfficial["currencies"][0]["code"]}/ Symbol:
      ${countryDataOfficial["currencies"][0]["symbol"]}</li>
      </ul>
      `;
    })
    .catch((error) => {
      console.log("error:", error);
    });
};
window.onload = function () {
  getCountry();
  getCovidWorld();
  btn1.setAttribute("");
  //   console.log(selecter.value);
};
btn1.onclick = function () {
  btn1.setAttribute("disabled", "");
  btn2.removeAttribute("disabled");
  chart30.classList.remove("none");
  chart.classList.add("none");
};
btn2.onclick = function () {
  btn2.setAttribute("disabled", "");
  btn1.removeAttribute("disabled");
  chart.classList.remove("none");
  chart30.classList.add("none");
};
