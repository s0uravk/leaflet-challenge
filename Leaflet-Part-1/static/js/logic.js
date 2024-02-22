function createMap(earthquakes) {

    // BUILD MY MAP 
    let myMap = L.map("map", {
    center: [38.8264999, -100.8526688],
    zoom:  5
    });

    //BASE MAPS
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap)

    earthquakes.addTo(myMap)
    
    // Define legend control
    let legend = L.control({ position: 'bottomright' });

    // Add legend to the map
    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'info legend');
        let grades = [0, 1, 2, 3, 4, 5];
        let colors = ['#00FF00', '#FFFF00', '#FFA500', '#FF4500', '#FF0000', '#800000'];

        // Loop through each grade and create a colored square for the legend
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    // Add legend control to the map
    legend.addTo(myMap);

}

function getColor(magnitude, maxMagnitude) {
    let hue = ((1 - magnitude / maxMagnitude) * 120).toString(10);
    return "hsl(" + hue + ", 100%, 50%)";
}


function createFeatures(earthquakeData) {

    let markersGroup = L.geoJson(earthquakeData, {
        onEachFeature: function (feature,layer){
            layer.bindPopup(`<h3>${feature.properties.title}</h3><hr><h3>Time : ${Date(feature.properties.time)}</h3>`)
        },
        pointToLayer : function(feature, latlng){
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 3.2,
                fillColor: getColor(feature.properties.mag, 5),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            })
        }
    });
        
    createMap(markersGroup)
}

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

d3.json(url).then(function (response){
    createFeatures(response)
    console.log(response)
});


