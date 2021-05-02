// Creating variables for file path
var link = "/static/data/all_week.geojson";

// Perform a GET request to get the earthquake data
d3.json(link).then(function(earthquake_data) {
  
    
        
        //review of fetched data sources
        console.log("earthquake data")
        console.log(earthquake_data)
        
        console.log("earthquake data features")
        console.log(earthquake_data.features)
        
        
  });