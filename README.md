# leaflet-challenge

**Background**
---
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

![leaflet](https://github.com/s0uravk/leaflet-challenge/assets/144293972/b693515f-5fea-40aa-a8a5-bbafad3471ff)

You can access the pages at [Earthquakes Visualization](https://s0uravk.github.io/leaflet-challenge/)

**Functions**
---
The data was retrieved using D3 and a geographical map using GeoJson with Leaflet was created using the Earthquake data from  USGS data. it was done in the following steps:

1. The data was retrieved using D3 and the createFeatures() function was called with that data as input.
2. createFeatures() function binds a pop-up to each data point and creates a circle marker whose radius is based on the magnitude of the earthquake and color is based on the depth of the earthquake and that is stored as a variable that is later used as an input to call createMap() function.
3. createMap() function is responsible for building a map and adding the input passed to it to that map. Then it also adds a legend at the bottom right which shows the color of circle markers based on the depth of the earthquake and adds it to the map.
    
**Visualization**
---
The map created shows the circle markers marked over the geographical maps with the size of a circle reflecting the magnitude of the earthquake while the color reflects the depth of the earthquake. On clicking the marker, data such as magnitude, location name, and time of the earthquake.
