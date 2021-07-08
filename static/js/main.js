function init() {

var openStreetMap = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

const pointsLayer = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: 'static/points.geojson',
        format: new ol.format.GeoJSON(),
        projection: 'EPSG:3857'
    }),
    visible: true,
    title: 'points'
});

var map = new ol.Map({
  layers: [openStreetMap, pointsLayer],
  target: 'map',
  view: new ol.View({
    maxZoom: 8,
    minZoom: 6,
    center: [1148508, 6700000],
    zoom: 6,
  }),
});

map.on('click',function(e){
    console.log(e);
});

};

init();