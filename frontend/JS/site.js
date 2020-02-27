var config = {
  apiKey: "AIzaSyCcz-IVNrPlKBCIfkjCy-R4IgmMQut8qoQ",
  authDomain: "temperature-and-humidity-e8dfd.firebaseapp.com",
  databaseURL: "https://temperature-and-humidity-e8dfd.firebaseio.com",
  projectId: "temperature-and-humidity-e8dfd",
  storageBucket: "temperature-and-humidity-e8dfd.appspot.com"
};
firebase.initializeApp(config);
var l = [],
  t = [];

var database = firebase
  .database()
  .ref()
  .child("sensor/ir");

var database1 = firebase
  .database()
  .ref()
  .child("sensor/dht11");

function getData() {
  database.on("value", snapshot => {
    var deb = snapshot.val();
    var keys = Object.keys(deb);
    var vary = keys.length;
    var k = keys[vary - 1];
    l.push(vary);
    var rpm = deb[k].RPM;
    var z = document.getElementById("st").value;
    console.log(z, vary);
    document.getElementById("rt").value = rpm;
  });
  var z = document.getElementById("st").value;
  if (l[l.length - 1] == z) {
    var some = 0.0;
    var imgs = document.querySelectorAll(".slow");

    var style;
    for (var i = 0; i < imgs.length; i++) {
      style = imgs[i].style;
      imgs[i].style.webkitAnimationPlayState = "running";
    }
    if (style.webkitAnimationPlayState === "running") {
      style.webkitAnimationPlayState = "paused";
      document.body.className = "paused";
    }
  } else {
    var some = document.getElementById("rt").value;
    document.getElementById("st").value = l[l.length - 1];
    var imgs = document.querySelectorAll(".slow");
    var style;
    for (var i = 0; i < imgs.length; i++) {
      style = imgs[i].style;
      imgs[i].style.webkitAnimationPlayState = "paused";
    }
    if (style.webkitAnimationPlayState === "paused") {
      style.webkitAnimationPlayState = "running";
      document.body.className = "";
    }
  }
  console.log(some);
  return some;
}
function getData2() {
  database1.on("value", snapshot => {
    var deb2 = snapshot.val();
    var keys2 = Object.keys(deb2);
    var vary2 = keys2.length;
    var k2 = keys2[vary2 - 1];
    t.push(vary2);
    var temperature = deb2[k2].temp;
    var z2 = document.getElementById("bt").value;
    document.getElementById("at").value = temperature;
  });
  var z2 = document.getElementById("bt").value;
  if (t[t.length - 1] === z2) {
    var lome = 0.0;
  } else {
    var lome = document.getElementById("at").value;
    document.getElementById("bt").value = t[t.length - 1];
  }
  return lome;
}
var today = new Date();
s = 0;
var data1 = {
  x: [today],
  y: [getData()],
  mode: "lines",
  line: { color: "#FF0000" },
  plot_bgcolor: "#87ceeb",
  paper_bgcolor: "#87ceeb"
};

var data2 = {
  x: [today],
  y: [getData2()],
  mode: "lines",
  line: { color: "#FF0000" },
  plot_bgcolor: "#87ceeb",
  paper_bgcolor: "#87ceeb"
};
var data = [data1];
Plotly.plot("chart", data);

var data1 = [data2];
Plotly.plot("chart1", data1);

var cnt = 0;

var interval1 = setInterval(function() {
  var time = new Date();
  var update1 = {
    x: [[time]],
    y: [[getData2()]]
  };

  var olderTime = time.setMinutes(time.getMinutes() - 1);
  var futureTime = time.setMinutes(time.getMinutes() + 1);
  var minuteView1 = {
    xaxis: {
      type: "date",
      title: {
        text: "TIME (s)",
        font: {
          family: "Arial, monospace",
          size: 25,
          color: "#000000"
        }
      },
      range: [olderTime, futureTime]
    },
    yaxis: {
      title: {
        text: "Temperature",
        font: {
          family: "Arial, monospace",
          size: 25,
          color: "#000000"
        }
      },
      range: [0, 50]
    },
    plot_bgcolor: "#87ceeb",
    paper_bgcolor: "#87ceeb"
  };

  Plotly.relayout("chart1", minuteView1);
  Plotly.extendTraces("chart1", update1, [0]);
  cnt++;
  if (++cnt === 10) clearInterval(interval);
}, 13000);

var interval = setInterval(function() {
  // wait(6000);
  var time = new Date();
  var update = {
    x: [[time]],
    y: [[getData()]]
  };
  var update1 = {
    x: [[time]],
    y: [[getData2()]]
  };

  var olderTime = time.setMinutes(time.getMinutes() - 1);
  var futureTime = time.setMinutes(time.getMinutes() + 1);
  var minuteView = {
    xaxis: {
      type: "date",
      title: {
        text: "TIME (s)",
        font: {
          family: "Arial, monospace",
          size: 25,
          color: "#000000"
        }
      },
      range: [olderTime, futureTime]
    },
    yaxis: {
      title: {
        text: "RPM",
        font: {
          family: "Arial, monospace",
          size: 25,
          color: "#000000"
        }
      },
      range: [0, 1200]
    },
    plot_bgcolor: "#87ceeb",
    paper_bgcolor: "#87ceeb"
  };

  var minuteView1 = {
    xaxis: {
      type: "date",
      title: {
        text: "TIME (s)",
        font: {
          family: "Arial, monospace",
          size: 25,
          color: "#000000"
        }
      },
      range: [olderTime, futureTime]
    },
    yaxis: {
      title: {
        text: "Temperature",
        font: {
          family: "Arial, monospace",
          size: 25,
          color: "#000000"
        }
      },
      range: [0, 50]
    },
    plot_bgcolor: "#87ceeb",
    paper_bgcolor: "#87ceeb"
  };

  Plotly.relayout("chart", minuteView);
  Plotly.extendTraces("chart", update, [0]);
  cnt++;
  if (++cnt === 5) clearInterval(interval);
}, 10000);
