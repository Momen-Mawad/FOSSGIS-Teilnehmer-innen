var yearsList = [2021, 2020]
var fillColor = ['#5681c7', '#83d4b1']

var conferenceSource = new ol.source.Vector({
  url: 'static/konferenzPoints.geojson',
  format: new ol.format.GeoJSON(),
  projection: 'EPSG:3857'
});

var conferenceSource2021 = new ol.source.Vector({
  url: 'static/konferenzPoint2021.geojson',
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
    source: conferenceSource,
    visible: true,
    style: new ol.style.Style(null),
    title: 'points'
});

var conferenceLocation2021 = new ol.layer.VectorImage({
    source: conferenceSource2021,
    visible: true,
    style: conferenceStyle,
    title: 'points'
});

var openStreetMap = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

var map = new ol.Map({
  layers: [openStreetMap],
  target: 'map',
  view: new ol.View({
    maxZoom: 12,
    minZoom: 6,
    center: [1148508, 6700000],
    zoom: 6,
    extent: [-300000, 5000000, 3000000, 8500000],
  }),
});


for (let j = 0; j < yearsList.length; j++) {
    var sourcePoints = new ol.source.Vector({
        url: `static/points${yearsList[j]}.geojson`,
        format: new ol.format.GeoJSON(),
        projection: 'EPSG:3857'
    });

    var clusterSource = new ol.source.Cluster({
      distance: 30,
      source: sourcePoints,
    });
    var fill = new ol.style.Fill({color: fillColor[j],})

    var styleCache = {};
    var cluster = new ol.layer.Vector({
        source: clusterSource,
        visible: false,
        style: function (feature) {
            var size = feature.get('features').length;
            const color = feature.get('features')[0].get('color');
            console.log(color);
                style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: (function(){
                        if (size == 1) return 5
                            else if (size >= 2 && size < 4) return 10
                            else if (size >= 4 && size < 6) return 15
                            else if (size >= 6 && size < 11) return 20
                            else return 25
                        }()),
                        stroke: new ol.style.Stroke({color: '#fff',}),
                        fill: fill = new ol.style.Fill({color:color,}),
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
        return style
        }
    });
    cluster.set('name', yearsList[j]);
    map.addLayer(cluster);
};

map.addLayer(conferenceLocation);
map.addLayer(conferenceLocation2021);


yearSelect = document.getElementById('years-select');
for ( i = 2021; i >= 2007; i -= 1 ) {
    option = document.createElement('option');
    option.value = option.text = i;
    yearSelect.add( option );
};

function showConferenceLocation(){
    var year = document.getElementById('years-select').value;
    var conferenceSource = conferenceLocation.getSource();
    var featuresConference = conferenceSource.getFeatures();
    for (var i = 0, ii = featuresConference.length; i < ii; i++) {
        if (featuresConference[i].get("Jahr") == year) {
            featuresConference[i].setStyle(conferenceStyle);
        } else {
            featuresConference[i].setStyle(new ol.style.Style(null));
        };
    };

};

yearSelect.addEventListener("change", function(){
    conferenceLocation2021.setVisible(false);
    showConferenceLocation();
    map.getLayers().forEach(function(layer) {
        name = layer.get('name')
        if (Number.isInteger(layer.get('name'))) {
            layer.setVisible(false);
        };
        if (name == yearSelect.value) {
            layer.setVisible(true);
        };
    });
});

map.getLayers().forEach(function(layer) {
    name = layer.get('name')
    if (name == 2021) {
        layer.setVisible(true);
    };
});

