/**
	Dok-gamelib engine

	Description: Game engine for producing web games easily using JavaScript and WebGL
	Author: jacklehamster
	Sourcode: https://github.com/jacklehamster/dok-gamelib
	Year: 2020
 */


const express = require('express');
const app = express();
const { serveSocket } = require('dok-socket');
const cors = require('cors');
const { webDir, port } = require('./common');
require('colors');

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
app.use(cors());


const { io, server } = serveSocket(app);

app.use(express.static(`${__dirname}/${webDir}`, {
	etag: true,
	lastModified: true,
	setHeaders: (res, path) => {
		if (path.endsWith('.html')) {
			// All of the project's HTML files end in .html
			res.setHeader('Cache-Control', 'no-cache');
		} else if (path.endsWith('.png')) {
			// If the RegExp matched, then we have a versioned URL.
			res.setHeader('Cache-Control', 'max-age=31536000');	//	1 year
		}
	},
}));


const httpServer = server.listen(port, () => console.log(`Listening on port ${port}!`.bgGreen));
httpServer.timeout = 5 * 60 * 1000;
