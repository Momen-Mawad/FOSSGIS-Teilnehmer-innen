function init() {

var pointsLayer = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: 'static/points.geojson',
        format: new ol.format.GeoJSON(),
        projection: 'EPSG:3857'
    }),
    visible: true,
    title: 'points'
});

var source = new ol.source.Vector({
    url: 'static/points.geojson',
    format: new ol.format.GeoJSON(),
    projection: 'EPSG:3857'
});

var clusterSource = new ol.source.Cluster({
  distance: 30,
  source: source,
});

var styleCache = {};
var clusters = new ol.layer.Vector({
  source: clusterSource,
  style: function (feature) {
    var size = feature.get('features').length;
    var style = styleCache[size];
    if (!style) {
      style = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,
          stroke: new ol.style.Stroke({
            color: '#fff',
          }),
          fill: new ol.style.Fill({
            color: '#3399CC',
          }),
        }),
        text: new ol.style.Text({
          text: size.toString(),
          fill: new ol.style.Fill({
            color: '#fff',
          }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  },
});

var openStreetMap = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

var map = new ol.Map({
  layers: [openStreetMap, clusters],
  target: 'map',
  view: new ol.View({
    maxZoom: 12,
    minZoom: 5,
    center: [1148508, 6700000],
    zoom: 6,
    extent: [200000, 5500000, 3000000, 8500000],
  }),
});

map.on('click',function(e){
    console.log(e);
});
};

init();