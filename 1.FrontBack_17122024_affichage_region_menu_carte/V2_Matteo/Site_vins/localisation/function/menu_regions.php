<?php
$geoserver_url = "http://localhost:8080/geoserver/webmapping/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webmapping:region&outputFormat=json";

$options = '<option value="">Choisissez une région :</option>';

try {
    // Récupération des données via CURL
    $ch = curl_init($geoserver_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response === false) {
        throw new Exception("Erreur lors de la récupération des données via CURL.");
    }

    // Décodage JSON
    $data = json_decode($response, true);

    if (!isset($data['features']) || !is_array($data['features'])) {
        throw new Exception("Les données reçues ne contiennent pas de régions.");
    }

    // Génération des options
    foreach ($data['features'] as $feature) {
        $region_name = $feature['properties']['nom_reg'] ?? 'Nom non disponible';
        $region_id = $feature['id'] ?? 'ID non disponible';

        $options .= '<option value="' . htmlspecialchars($region_id) . '">' . htmlspecialchars($region_name) . '</option>';
    }
} catch (Exception $e) {
    $options .= '<option value="">Erreur : ' . htmlspecialchars($e->getMessage()) . '</option>';
}

echo $options;
?>

