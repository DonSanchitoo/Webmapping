// Fonction générique pour récupérer les données GeoJSON d'une sélection
function fetchGeoData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Erreur :', data.error);
                return;
            }
            callback(data); // Passe les données à une fonction de rappel
        })
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
}

// Exemple d'utilisation pour récupérer une région
function loadRegion(regionId) {
    if (!regionId) {
        console.warn('Aucune région sélectionnée');
        return;
    }
    var url = `function/get_region.php?num_reg=${regionId}`;
    fetchGeoData(url, function (data) {
        updateMapWithGeoData(data); // Passe les données à la carte
    });
}

