/* script.js */
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de la carte MapLibre GL
    const map = new maplibregl.Map({
        container: 'map',
        style: {
            'version': 8,
            'sources': {
                'esri-light-gray': {
                    'type': 'raster',
                    'tiles': [
                        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
                    ],
                    'tileSize': 256,
                    'attribution': 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                }
            },
            'layers': [
                {
                    'id': 'esri-light-gray',
                    'type': 'raster',
                    'source': 'esri-light-gray'
                }
            ]
        },
        center: [-73.55, 45.55], // Coordonnées de Montréal [longitude, latitude]
        zoom: 10
    });


    // Ajouter les contrôles de navigation (zoom, rotation)
    map.addControl(new maplibregl.NavigationControl());

    // Désactiver l'affichage des attributions par défaut (car inclus dans la source)
    map.addControl(new maplibregl.AttributionControl({
        compact: true
    }));

    //  Echelle
    var scale = new maplibregl.ScaleControl({ unit: 'metric' });
    map.addControl(scale);

    // Récupération de la liste déroulante
    const inondationdropdown = document.getElementById('inondation-dropdown');

    // Exemple d'activation de la liste déroulante (à adapter selon votre logique)
    setTimeout(() => {
        inondationdropdown.disabled = false;
    }, 1000); // Simule un chargement avant d'activer

      // Ajouter la couche

        var arrondissementsSource = {
        type: 'geojson',
        data: 'https://donnees.montreal.ca/dataset/9797a946-9da8-41ec-8815-f6b276dec7e9/resource/e18bfd07-edc8-4ce8-8a5a-3b617662a794/download/limites-administratives-agglomeration.geojson'
        };

        var arrondissementsLayer = {
        id: 'arrondissements',
        type: 'fill',
        source: 'arrondissementsSource', // Assurez-vous que le nom de la source correspond ici
        paint: {
        'fill-color': '#ccc',
        'fill-opacity': 0.5,
        'fill-outline-color': '#000'
                                }
        };

        var quartiersSource = {
            type: 'geojson',
            data: 'https://donnees.montreal.ca/dataset/f38c91a1-e33f-4475-a112-3b84b1c60c1e/resource/a80e611f-5336-4306-ba2a-fd657f0f00fa/download/quartierreferencehabitation.geojson'
        };
        
        var quartierLayer = {
            id: 'quartier',
            type: 'fill',
            source: quartiersSource, // On fait directement référence à l'objet source
            paint: {
                'fill-color': '#ccc',
                'fill-opacity': 0.5,
                'fill-outline-color': 'red'
            }
        };
        
        


        // Ajout à la carte Mapbox
        map.on('load', function () {
            map.addSource('quartiers', quartiersSource);
            map.addLayer(quartierLayer);
        });
        


map.on('load', function () {
  // Arrondissements
  map.addSource('arrondissementsSource', arrondissementsSource); // Ajout de la source
  map.addLayer(arrondissementsLayer); // Ajout de la couche des arrondissements
            });

map.on('load', function () {
  // quartier
  map.addSource('quartiersSource', quartiersSource); // Ajout de la source
  map.addLayer(quartierLayer); // Ajout de la couche des arrondissements
            });


 // Gérer les cases à cocher pour afficher/masquer les couches
 document.getElementById('neighborhoods').addEventListener('change', function (e) {
    map.setLayoutProperty('arrondissements', 'visibility', e.target.checked ? 'visible' : 'none');
});

document.getElementById('districts').addEventListener('change', function (e) {
    map.setLayoutProperty('quartiers', 'visibility', e.target.checked ? 'visible' : 'none');
});



});















