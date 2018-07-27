var express = require('express');
var urljoin = require('url-join');

var HOST = process.env.HOST || '127.0.0.1';
var PORT = process.env.PORT || '3003';

var app = express();
app.use('/', express.static(__dirname));

app.listen(PORT, HOST, () => {
  console.log('[EXAMPLES] Listening on '+urljoin('http://', HOST+':'+PORT));
});
