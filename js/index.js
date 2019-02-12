var heure = [];
var temp = [];
var hum = [];
var date7 = [];
var datePlusHeure = [];
var tempSelect = [];
var humSelect=[];
var x = document.getElementById("sel");
$.getJSON("../meteo.json", function (json) {
  for (let index = 0; index < json.length; index++) {
    //heure.push(json[index].heure);
    temp.push(json[index].temp);
    hum.push(json[index].humidity);
    date7.push((json[index].date).substring(0, 10));
    datePlusHeure.push(json[index].date);
  }
  //CREATION LISTE DEROULANTE
  compt = 0;
  var option = document.createElement("option");
  option.text = date7[0];
  option.value = date7[0];
  x.add(option);
  for (let index = 1; index < date7.length; index++) {
    if (date7[compt].localeCompare(date7[index]) != 0) {
      var option = document.createElement("option");
      option.text = date7[index];
      option.value = date7[index];
      x.add(option);
    }
    compt++;
  }
});
//SELECTION LISTE DEROULANTE + DESSINAGE DE LA COURBE
function getValue() {
  var value = x.options[x.selectedIndex].value;
  heure = [];
  tempSelect = [];
  humSelect=[];
  var debug = [];
  for (let index = 0; index < datePlusHeure.length; index++) {
    if (datePlusHeure[index].indexOf(value) == 0) {
      heure.push((datePlusHeure[index]).substring(11, 16));
      tempSelect.push(temp[index]);
      humSelect.push(hum[index]);

    }
  }
  

//création chart

  var chart = new Chartist.Line('.ct-chart', {
    labels: heure,
    series: [
      tempSelect, humSelect
    ]
  }, {
    low: 0,
    axisY: {
      labelInterpolationFnc: function (value) {
        return Math.round(value);
      }
    },
    height: "500px",
    width: "102%",
    fullWidth: true,
    plugins: [
      Chartist.plugins.tooltip(),
      Chartist.plugins.legend({
        legendNames: ['Température', 'Humidité'],
      })
    ]
  });

  chart.on('draw', function (data) {
    if (data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 1000 * data.index,
          dur: 1000,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    }
  });
}

function getColor(id) {
  if (document.getElementById(id).value == 1) {
    document.getElementById(id).classList.remove("test");
    document.getElementById(id).value = '0';
  } else {
    document.getElementById(id).classList.add("test");
    document.getElementById(id).value = '1';
  }
}
