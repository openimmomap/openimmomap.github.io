/*
 * Javascript leaflet example with Basemap 
 * by David Baumgartner @ isticktoit.net
 */
 
var map = L.map('map').setView([viewnorth, vieweast], zoom);

(function() {

    //document.getElementById('map').style.height = "'"+window.innerHeight+"px'";
    
    // create json_object with the connections
    var basemaps = {
        'BasemapAT Color': basemap('geolandbasemap', 'png'),
        'BasemapAT Grau': basemap('bmapgrau', 'png'),
        'BasemapAT Orthophoto': basemap('bmaporthofoto30cm', 'jpeg'),
        'OpenStreetMap': osmmap(),
        'Blank': blank()
    };
    
    // add layers to the control panal
    var control = L.control.layers(basemaps).addTo(map);
    // add a layer to the map
    basemaps['BasemapAT Color'].addTo(map);
    
})();

// function for the basemap & osmmap connection

function basemap(style, typ) {
    // Attribution Basemap from wien.gv.at wmts-server
    var basemap = "http://{s}.wien.gv.at/basemap/"+style+"/normal/google3857/{z}/{y}/{x}."+typ;
    var baseAttr = '&copy; <a href="http://basemap.at" target="_blank">Basemap.at</a>, <a href="http://www.isticktoit.net">isticktoit.net</a>';
    return L.tileLayer(basemap, {
        'type': 'map',
        subdomains : ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        zIndex: 2,
        'attribution': baseAttr
    });
}

function osmmap() {
    // Attribution OSM-MAP from tile.osm.org wmts-server
    var osm = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
    var osmAttr = '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors';
    return L.tileLayer(osm, {
        'type': 'map',
        'attribution': osmAttr,
        zIndex: 1,
        maxZoom: 18
    });
}

function blank() {
    // creates a new blank backgroundlayer
    var layer = new L.tileLayer();
    layer.onAdd = layer.onRemove = function() {};
    return layer;
}
