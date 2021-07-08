window.onload =    function init() {

var openCycleMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM({
    attributions: [
      'All maps © <a href="https://www.opencyclemap.org/">OpenCycleMap</a>',
      ol.ATTRIBUTION ],
    url:
      'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
      '?apikey=Your API key from http://www.thunderforest.com/docs/apikeys/ here',
  }),
});

var openSeaMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM({
    attributions: [
      'All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>',
      ol.ATTRIBUTION ],
    opaque: false,
    url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
  }),
});

var map = new ol.Map({
  layers: [openCycleMapLayer, openSeaMapLayer],
  target: 'map',
  view: new ol.View({
    maxZoom: 18,
    center: [-244780.24508882355, 5986452.183179816],
    zoom: 15,
  }),
});
}