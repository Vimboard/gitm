window.onload= function() {
    var map = L.map('map', {
        crs: L.CRS.Simple
    }).setView([-20, 20], 4);

    L.tileLayer('map/{z}/map{z}-{y}x{x}.png', {
        attribution: 'Test Map',
        continuousWorld: true,
        maxZoom: 7,
        minZoom: 0,
        tileSize: 128,
        tms: true
    }).addTo(map);

    var marker1 = L.marker([0, 0]).addTo(map);
    var marker2 = L.marker([-20, 20]).addTo(map);

    var circle = L.circle([-10, 10], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 1
    }).addTo(map);


}

