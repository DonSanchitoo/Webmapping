// Initialisation de la carte Leaflet
var map = L.map('map').setView([46.603354, 1.888334], 6); // Centré sur la France

// Ajout des tuiles de fond à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Couche GeoJSON pour afficher les données
var geoLayer = L.geoJSON().addTo(map);

// Fonction pour mettre à jour la carte avec des données GeoJSON
function updateMapWithGeoData(data) {
    geoLayer.clearLayers(); // Supprime les données précédentes
    geoLayer.addData(data); // Ajoute les nouvelles données
    //Initialisez et validez les bounds
    var bounds = geoLayer.getBounds();
    if (!bounds.isValid()) {
        console.error('Bounds are not valid'); return;
    }
    map.fitBounds(geoLayer.getBounds()); // Ajuste la vue sur les données
}
