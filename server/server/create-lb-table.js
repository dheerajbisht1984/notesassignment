var server = require('./server');

var ds = server.dataSources.textnotes;


var lbTables = [
    "notes","user"
    

];


ds.autoupdate(lbTables, function(er) {

  if (er) throw er;

  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);

  ds.disconnect();

});
