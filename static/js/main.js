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
      if (size === 1) {
        style = new ol.style.Style({
          image: new ol.style.Icon({
            src: 'static/photos/location.png',
            scale: 0.5,
          })
        });
      } else {
        style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: (function(){
              if (size >= 2 && size < 4) return 10
              else if (size >= 4 && size < 6) return 15
              else if (size >= 6 && size < 11) return 20
              else return 25
            }()),
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
        })};
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