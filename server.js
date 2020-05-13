const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/WARM/'));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '/dist/WARM/index.html'));
});

//Just configurations for the Deployment
app.listen(process.env.PORT || 5555, process.env.IP, function() {
	console.log('Server is started');
});
