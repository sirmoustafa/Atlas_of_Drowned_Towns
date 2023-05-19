// --------- ========================= MAp instaltion ========================= ---------

const map = L.map("map", {
      zoomDelta: 0.25,
      zoomSnap: 0.25,
      wheelPxPerZoomLevel: 180,
      minZoom: 2
}).setView([39.890582, -112.526324], 5.5);


// --------- ========================= Variables ========================= ---------


var layer0 = [];
var layer1 = [];
var slider ;
var output ;
let header ;

const basemapEnum = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
}).addTo(map);

// --------- ========================= Layer icon ========================= ---------

IconStyleOne = L.icon({
      iconUrl: 'icon/dam.png',
      iconSize: [25, 25]
});

IconStyleTwo = L.icon({
      iconUrl: 'icon/Inundated Places.png',
      iconSize: [25, 25]
});


// --------- ========================= Loading Layer ========================= ---------


var dams =  L.esri.featureLayer({
      url: "https://services.arcgis.com/90tNmoLpchYB2Gc5/arcgis/rest/services/Atlas_of_Drowned_Towns_WFL1/FeatureServer/0",
      pointToLayer: function(geoJsonPoint, latlng) {
            return new L.CircleMarker(latlng, {
                  radius: 6, 
                  fillOpacity: 1, 
                  color: 'black', 
                  fillColor: "blue", 
                  weight: 1
            });
      },
      onEachFeature: function(f,l) {
            layer0.push(f.properties);
            var popupContent = "<h1>"+ "Dam Name: "+"</h1>" +"<p >"+f.properties.Name +"</p>\n<h2>"+ "River: "+"</h2>" + "<p >"+f.properties.Completed +"</p>";
                  l.bindPopup(popupContent, {closeButton: false, closeOnEscapeKey : false});
      },
}).addTo(map);


var inundated_places = L.esri.featureLayer({
      url: "https://services.arcgis.com/90tNmoLpchYB2Gc5/arcgis/rest/services/Atlas_of_Drowned_Towns_WFL1/FeatureServer/1",
      pointToLayer: function(geoJsonPoint, latlng) {
            return new L.CircleMarker(latlng, {
                        radius: 6, 
                        fillOpacity: 1, 
                        color: 'black', 
                        fillColor: "red", 
                        weight: 1
                  });
            },
      onEachFeature: function(f,l) {
            layer1.push(f.properties);
            var popupContent = "<h3>"+ "Dam Name: "+"</h3>" +"<p >"+f.properties.Name +"</p>\n<h4>"+ "River: "+"</h4>" + "<p >"+f.properties.River +"</p>";
                  l.bindPopup(popupContent, {closeButton: false, closeOnEscapeKey : false});
      }
}).addTo(map);


// --------- ========================= Popup Function ========================= ---------

function popUpp(f,l){
      var popupContent = "<h1>"+ "Dam Name: "+"</h1>" +"<p >"+f.properties.Name +"</p>\n<h2>"+ "River: "+"</h2>" + "<p >"+f.properties.River +"</p>";
            l.bindPopup(popupContent);
}

// --------- ========================= Page zoom end function ========================= ---------

header =  document.getElementById("lvl");
header.innerText = map._zoom;

map.on('zoomend', function() {
      header.innerText = map._zoom;
});




// --------- ========================= left and right sides function ========================= ---------

function openlside() {
      // document.getElementById("lside").style.width = "250px";
      document.getElementById("lBtn").style.marginLeft = "250px";
      $('.leaflet-control-zoom').css('left', '250px');
      $('#lside').css('width', '249px');
      $('#lside').css('border-left-width', '1px');
      $('.zoom').css('left', '310px');
}

function closelside() {
      document.getElementById("lside").style.width = "0";
      document.getElementById("lBtn").style.marginLeft= "0";
      $('.leaflet-control-zoom').css('left', '10px');
      $('.zoom').css('left', '60px');
}

function lsidebtn()
{
      var t = document.getElementById("lBtn");

      if(t.value=="ON"){
            t.value="OFF";
            closelside();
            }
      else if(t.value=="OFF"){
            t.value="ON";
            openlside();
            }
}

function openrside() {
      document.getElementById("rside").style.width = "249px";
      document.getElementById("rBtn").style.marginRight = "250px";
      $('#rside').css('border-left-width', '1px');
}

function closerside() {
      document.getElementById("rside").style.width = "0";
      document.getElementById("rBtn").style.marginRight= "0";
}

function rsidebtn()
{
      var t = document.getElementById("rBtn");
      if(t.value=="ON"){
            t.value="OFF";
            closerside();
            }
      else if(t.value=="OFF"){
            t.value="ON";
            openrside();
            }
}



// --------- ========================= Slider actions ========================= ---------

slider = document.getElementById("myRange");
output = document.getElementById("slidervalue");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}




document.getElementById("slidecontnr").addEventListener("change", function () {
      dams.setWhere("Completed <= '" + document.getElementById("slidervalue").textContent+".0"+"'");
      inundated_places.setWhere("Year_of_In <= '" + document.getElementById("slidervalue").textContent+".0"+"'");
    });


let checkbox = document.getElementById("yearchck");
checkbox.addEventListener( "change", () => {
      if ( checkbox.checked ) {
            $("#slidecontnr").show();
            dams.setWhere("Completed <= '" + document.getElementById("slidervalue").textContent+".0"+"'");
            inundated_places.setWhere("Year_of_In <= '" + document.getElementById("slidervalue").textContent+".0"+"'");
      } else {
            $("#slidecontnr").hide();
            dams.setWhere("Completed > '1900.0'");
            inundated_places.setWhere("Year_of_In > '1900.0'");
      }
});


