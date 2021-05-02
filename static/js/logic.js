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
