function drawVisualization() {
  var table1 = new google.visualization.Table(document.getElementById('table'));
  table1.draw(dataTable, null);

  // Set columns in a data view.
  var dataView1 = new google.visualization.DataView(dataTable);
  dataView1.setColumns([0, 2]);

  var table2 = new google.visualization.Table(document.getElementById('table2'));
  table2.draw(dataView1, null);

  // Set rows in a data view.
  var dataView2 = new google.visualization.DataView(dataTable);
  dataView2.setRows([0, 1, 3]);

  var table3 = new google.visualization.Table(document.getElementById('table3'));
  table3.draw(dataView2, null);
}
