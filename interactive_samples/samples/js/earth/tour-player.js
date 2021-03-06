var ge;

var tour = null;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Enter Tour', enterTour);
  addSampleButton('Play', playTour);
  addSampleButton('Pause', pauseTour);
  addSampleButton('Stop/Reset', resetTour);
  addSampleButton('Exit Tour', exitTour);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // create the tour by fetching it out of a KML file
  var href = 'http://earth-api-samples.googlecode.com/svn/trunk/examples/' +
             'static/grandcanyon_tour.kmz';

  google.earth.fetchKml(ge, href, function(kmlObject) {
    if (!kmlObject) {
      // wrap alerts in API callbacks and event handlers
      // in a setTimeout to prevent deadlock in some browsers
      setTimeout(function() {
        alert('Bad or null KML.');
      }, 0);
      return;
    }

    // Show the entire KML file in the plugin.
    ge.getFeatures().appendChild(kmlObject);

    // Walk the DOM looking for a KmlTour
    walkKmlDom(kmlObject, function() {
      if (this.getType() == 'KmlTour') {
        tour = this;
        return false; // stop the DOM walk here.
      }
    });
  });

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function enterTour() {
  if (!tour) {
    alert('No tour found!');
    return;
  }

  ge.getTourPlayer().setTour(tour);
}

function playTour() {
  ge.getTourPlayer().play();
}

function pauseTour() {
  ge.getTourPlayer().pause();
}

function resetTour() {
  ge.getTourPlayer().reset();
}

function exitTour() {
  // just like setBalloon(null)
  ge.getTourPlayer().setTour(null);
}
