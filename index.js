var express = require('express');
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);
var RaspiCam = require('raspicam');

var PORT = 8080;

//GET SERVER LISTENING
http.listen(PORT, function(){
	console.log('listening on *:' + PORT);
});

//SERVE FILES
app.use(express.static('selfies')); //serve stuff as if in main dir
app.get('/', function(req, res){
	res.setHeader('Content-Type','text/html; charset=utf-8');
	res.write('Getting file... ');
	var camera = new RaspiCam({
		mode:'photo',
		output:'./selfies/selfie_'
			+(new Date()).toISOString()
				.replace(['T'],'_').replace(['Z'],'')
			+'.jpg',
		encoding: 'jpg',
		timeout: 0 //take pic immediately
	});
	camera.on('read', function(err, timestamp, filename){
		if(filename.indexOf('~')!=-1)
			return;
		console.log('photo image captured with filename: ' + filename);
		res.write('Got file: '+filename);
		res.write('<img src="'+filename+'" style="display:block;">');
		camera.stop();
		res.end();
		console.log('done');
	});
	camera.start();
});


