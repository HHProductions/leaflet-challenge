The files in this repository are for the leaflet challenge.
The index.html file will call on the logic.js sript to obtain the latest geojson data from https://earthquake.usgs.gov
Apart from the general coding the main challenge was identifying the right code to ensure that the circle markers accurately reflected the magnitude of the earthquake.
L.circle provides relatively uniform results for a reasonable range of latitudes around the equator, however as me move closer to the poles this becomes highly inaccurate and consequently L.circle cannot be used to represent the maginyude of an earthquake.
L.circleMarker was used instead that sets the radius as pixel count as opposed to meters.
The same tooltip and popup is used. Originally  popup was used, but teh addignment called for tooltip, however that requires mouse to be over circle and cannot  copy data if required. Hence I left popup as well.
