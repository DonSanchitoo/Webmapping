<?php

header('Content-Type: application/json');

// URL de base pour GeoServer
$geoserver_base_url = "http://localhost:8080/geoserver/webmapping/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webmapping:region&outputFormat=json";

// Récupération de l'ID de la région depuis les paramètres GET
$region_id = $_GET['num_reg'] ?? null;

if (!$region_id) {
    echo json_encode(['error' => 'Aucun identifiant de région fourni']);
    exit;
}

// Construire l'URL pour récupérer la géométrie spécifique
$geoserver_url = $geoserver_base_url . "&featureID=" . urlencode($region_id);

try {
    // Récupération des données via CURL
    $ch = curl_init($geoserver_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response === false) {
        throw new Exception("Erreur lors de la récupération des données via GeoServer.");
    }

    // Retourner la réponse GeoJSON directement
    echo $response;
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}


