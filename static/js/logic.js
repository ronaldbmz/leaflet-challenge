// Creating variables for file path
var link = "/static/data/all_week.geojson";

// Perform a GET request to get the earthquake data
d3.json(link).then(function(earthquake_data) {
  
    
        
        //review of fetched data sources
        console.log("earthquake data")
        console.log(earthquake_data)
        
        console.log("earthquake data features")
        console.log(earthquake_data.features)

        // Once we get a response from both data sources, send the data.features object to the createFeatures function
	    createFeatures(earthquake_data.features);
        
  });

  function createFeatures(earthquakeData) {
	
    //*********************For Earthquake Layer******************************
  
    //creating empty array to store earthquake circles markers
    var earthquakes = [];
		
	
	//Loop through locations and create earthquake circle markers
	for (var i = 0; i < earthquakeData.length; i++) {
		
		//Extracting value of depth
		var depth = earthquakeData[i].geometry.coordinates.slice(2)
		
	  //Setting the circle marker radius 
	  earthquakes.push(
		L.circle(earthquakeData[i].geometry.coordinates.slice(0,2).reverse(), {
		  stroke: true,
		  fillOpacity: 0.75,
		  color: "black",
		  fillColor: "blue",
		  radius:earthquakeData[i].properties.mag*30000
		}).bindPopup("<h3>" + earthquakeData[i].properties.place + "</h3><hr><p>" + new Date(earthquakeData[i].properties.time) + "</p>")
	  );
	}

   //Viewing the earthquake output layers
  console.log("earthquakes layer")
  console.log(L.layerGroup(earthquakes)) 

// Sending our earthquakes and tectonic layer to the createMap function
//createMap(L.layerGroup(earthquakes), tectonics);
}

function createMap(earthquakes) {

    // Definiing base map layers
  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });

  
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Dark Map": darkmap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create our map, giving it the satellite, earthquakes and tectonic layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 4,
      layers: [darkmap, earthquakes]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
    
    
  }
  
