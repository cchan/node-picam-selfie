//Same thing, except it'll cron every hour and tweet the image instead

var Twit = require("twit");
var secrets = require("./secrets");
var RaspiCam = require('raspicam');

var client = new Twit({
	consumer_key: secrets.TWITTER_CONSUMER_KEY,
	consumer_secret: secrets.TWITTER_CONSUMER_SECRET,
	access_token: secrets.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: secrets.TWITTER_ACCESS_TOKEN_SECRET,
});

console.log('Getting file... ');
var camera = new RaspiCam({
	mode:'photo',
	output:'./selfies/selfie_'
		+(new Date()).toISOString().replace('T','_').replace('Z','')
		+'.jpg',
	encoding: 'jpg',
	timeout: 0 //take pic immediately
});
camera.on('read', function(err, timestamp, filename){
	if(filename.indexOf('~')!=-1)
		return;
	
	console.log('photo image captured with filename: ' + filename);
	camera.stop();
	
	// code from https://www.npmjs.com/package/twit
	var b64content = fs.readFileSync('./selfies/'+filename, { encoding: 'base64' });
	// first we must post the media to Twitter 
	client.post('media/upload', { media_data: b64content }, function (err, data, response) {
		// now we can reference the media and post a tweet (media will attach to the tweet) 
		var mediaIdStr = data.media_id_string;
		var params = { status: 'Selfie!', media_ids: [mediaIdStr] };
		client.post('statuses/update', params, function (err, data, response) {
			console.log(data);
			console.log('Success!');
		});
	});
});
