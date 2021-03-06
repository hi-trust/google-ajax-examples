var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleUIHtml(
    'Fetch KML at this URL: <input type="text" id="kml-url" size="50" value="http://earth-api-samples.googlecode.com/svn/trunk/examples/static/red.kml"/><br/>'
  );

  addSampleButton('Fetch KML!', buttonClick);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // fly to Santa Cruz
  var la = ge.createLookAt('');
  la.set(37, -122,
    0, // altitude
    ge.ALTITUDE_RELATIVE_TO_GROUND,
    0, // heading
    0, // straight-down tilt
    5000 // range (inverse of zoom)
    );
  ge.getView().setAbstractView(la);

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

var currentKmlObject = null;

function fetchKmlFromInput() {
  // remove the old KML object if it exists
  if (currentKmlObject) {
    ge.getFeatures().removeChild(currentKmlObject);
    currentKmlObject = null;
  }

  var kmlUrlBox = document.getElementById('kml-url');
  var kmlUrl = kmlUrlBox.value;

  google.earth.fetchKml(ge, kmlUrl, finishFetchKml);
}

function finishFetchKml(kmlObject) {
  // check if the KML was fetched properly
  if (kmlObject) {
    // add the fetched KML to Earth
    currentKmlObject = kmlObject;
    ge.getFeatures().appendChild(currentKmlObject);
  } else {
    // wrap alerts in API callbacks and event handlers
    // in a setTimeout to prevent deadlock in some browsers
    setTimeout(function() {
      alert('Bad or null KML.');
    }, 0);
  }
}

function buttonClick() {
  fetchKmlFromInput();
}
