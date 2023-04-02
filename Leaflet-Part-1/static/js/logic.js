// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.

// Define colour for depth of earthquake 
function depth_colour(depth) {
  if (depth > 200) return "black";
  else if (depth > 100) return "#750219";
  else if (depth > 30) return "#BD0026";
  else if (depth > 20) return "#E31A1C";
  else if (depth > 10) return "#FC4E2A";
  else if (depth > 5) return "#FD8D3C";
  else if (depth > 0) return "#FEB24C";
  else return "#FED976";
        }


//Define map
let myMap = L.map("map", {
  center: [40.54, -98.767],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
  for (let i = 0; i<data.features.length; i++) {
	L.circleMarker([data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]], {
		color: "black",
		fillColor: depth_colour(data.features[i].geometry.coordinates[2]),
		fillOpacity: 0.75,
		weight: 1,
		radius: 3*data.features[i].properties.mag
	})
	.bindPopup(`<h3>Location: ${data.features[i].properties.place}</h3><hr><p>
	Time: ${new Date(data.features[i].properties.time)}<hr><p>
	Magnitude: ${data.features[i].properties.mag}<hr><p>
	Depth (km): ${data.features[i].geometry.coordinates[2]}
	</p>`).addTo(myMap);
	}

//Create legend for maps
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth of Earthquake (km)</h4>";
  div.innerHTML += '<i style="background: #FED976"></i><span><=0</span><br>';
  div.innerHTML += '<i style="background: #FEB24C"></i><span>0< to <=5</span><br>';
  div.innerHTML += '<i style="background: #FD8D3C"></i><span>5 < to <= 10</span><br>';
  div.innerHTML += '<i style="background: #FC4E2A"></i><span>10 < to <= 20</span><br>';
  div.innerHTML += '<i style="background: #E31A1C"></i><span>20 < to <= 30</span><br>';
  div.innerHTML += '<i style="background: #BD0026"></i><span>30 < to <= 100</span><br>';
  div.innerHTML += '<i style="background: #750219"></i><span>100 < to <= 200</span><br>';
  div.innerHTML += '<i style="background: black"></i><span>>200</span><br>';

   return div;
};

legend.addTo(myMap);
});


