const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");

//Mongoose connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://kamacytpa:0291643430@influencersdb-0vr8w.mongodb.net/cart?retryWrites=true&w=majority")
mongoose.connection.on("connected", function(){
    console.log("database is conected");
});
app.use(express.static(__dirname + '/dist/WARM/'));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '/dist/WARM/index.html'));
});



app.listen(process.env.PORT || 5555, process.env.IP, function () {
    console.log("Server is started");
});