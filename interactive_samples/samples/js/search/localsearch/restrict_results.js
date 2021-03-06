/*
*  How to restrict LocalSearch results to KML results.
*  KML results are map points that have been found by indexing KML from across
*  the internet.  This means they are user generated results.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Add in a full set of searchers
  var localSearch = new google.search.LocalSearch();
  searchControl.addSearcher(localSearch);

  // Set our restriction to KML results.
  localSearch.setRestriction(google.search.Search.RESTRICT_TYPE,
                             google.search.LocalSearch.TYPE_KMLONLY_RESULTS);
  
  // Set the Local Search center point
  localSearch.setCenterPoint("New York, NY");

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // execute an inital search
  searchControl.execute("Gelato");
}

google.setOnLoadCallback(OnLoad);
