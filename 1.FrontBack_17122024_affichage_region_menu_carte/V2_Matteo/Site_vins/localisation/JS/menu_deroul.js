// Fonction générique pour charger un menu déroulant depuis un script PHP
function loadDropdown(url, elementId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById(elementId).innerHTML = xhr.responseText;
        } else {
            document.getElementById(elementId).innerHTML = '<option value="">Erreur lors du chargement</option>';
        }
    };
    xhr.send();
}

// Exemple d'appel pour un menu régions (à exécuter au chargement de la page)
window.onload = function () {
    loadDropdown('function/menu_regions.php', 'region'); // Menu pour les régions
    loadDropdown('function/menu_departements.php', 'departement'); // Menu pour les départements
};
