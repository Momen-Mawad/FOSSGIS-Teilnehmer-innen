var source = new ol.source.Vector({
  url: 'static/konferenzPoints.geojson',
  format: new ol.format.GeoJSON(),
  projection: 'EPSG:3857'
});

var conferenceStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'static/photos/location.png',
        scale: 0.5
      })
    });

var conferenceLocation = new ol.layer.VectorImage({
    source: source,
    visible: true,
    style: new ol.style.Style(null),
    title: 'points'
});

var sourcePoints = new ol.source.Vector({
    url: 'static/points.geojson',
    format: new ol.format.GeoJSON(),
    projection: 'EPSG:3857'
});

var clusterSource = new ol.source.Cluster({
  distance: 30,
  source: sourcePoints,
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
          radius: (function(){
          if (size == 1) return 5
          else if (size >= 2 && size < 4) return 10
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
        text: (function(){
          if (size == 1) return null
          else {text = new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({
              color: '#fff',
            }),
          })}
        return text
        }()),
      });
      styleCache[size] = style;
    }
    return style
  }
});

var openStreetMap = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

var map = new ol.Map({
  layers: [openStreetMap, clusters, conferenceLocation],
  target: 'map',
  view: new ol.View({
    maxZoom: 12,
    minZoom: 6,
    center: [1148508, 6700000],
    zoom: 6,
    extent: [-300000, 5500000, 3000000, 8500000],
  }),
});

function showConferenceLocation(){
  var year = document.getElementById('years').value;
  var vectorSource = conferenceLocation.getSource();
  var features = vectorSource.getFeatures();
  for (var i = 0, ii = features.length; i < ii; i++) {
    features[i].setStyle(null);
    if (features[i].get("Jahr") == year) {
      features[i].setStyle(conferenceStyle);
    } else {
      features[i].setStyle(new ol.style.Style(null));
    };
  };
};

document.getElementById('years').style.display = "none";
document.getElementById('years').addEventListener("change", showConferenceLocation);

function activeCheckBox(){
  var checkBox = document.getElementById('years-checkbox');
  if (checkBox.checked == true) {
    document.getElementById('years').style.display = "inline";
    showConferenceLocation();
  } else {
    document.getElementById('years').style.display = "none";
  };
};


