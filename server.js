const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/WARM/'));

app.listen(process.env.PORT || 4200);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '/dist/WARM/index.html'));
});

console.log('console is listening');
