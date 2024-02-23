function createMap(earthquakes) {

    // BUILD MY MAP 
    let myMap = L.map("map", {
    center: [38.8264999, -100.8526688],
    zoom:  5
    });

    //BASE MAPS
    let street = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(myMap)

    earthquakes.addTo(myMap)
    
    // Define legend control
    let legend = L.control({ position: 'bottomright' });

    // Add legend to the map
    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'info legend');
        div.style.background = 'white';
        div.style.padding = '10px';
        let depth = [-10, 10, 30, 50, 70, 90];
        let colors = ['#00FF00', '#59FF00', '#A8FF00', '#FFD500', '#FF6A00', '#FF0000'];

        // Loop through each grade and create a colored square for the legend
        for (let i = 0; i < depth.length; i++) {
            div.innerHTML +=
                `<i style="background: ${colors[i]}; color: ${colors[i]} ">lol</i> ` +
                depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }

        return div;
    };

    // Add legend control to the map
    legend.addTo(myMap);

}

function getColor(depth) {
    return depth < 10 ? '#00FF00' :
           depth < 30 ? '#59FF00' :
           depth < 50 ? '#A8FF00' :
           depth < 70 ? '#FFD500' :
           depth < 90 ? '#FF6A00' :
                    '#FF0000';
}


function createFeatures(earthquakeData) {

    let markersGroup = L.geoJson(earthquakeData, {
        onEachFeature: function (feature,layer){
            layer.bindPopup(`<h3>${feature.properties.title}</h3><hr><h3>Time : ${Date(feature.properties.time)}</h3>`)
        },
        pointToLayer : function(feature, latlng){
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 3.2,
                fillColor: getColor(feature.geometry.coordinates[2]),
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


