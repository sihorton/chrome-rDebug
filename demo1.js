/**
* Demo of using chrome remote debugging api.
*
* 0) npm install chrome-rDebug
* 1) Close all open chrome windows and launch with the following:
*   path/to/chrome --remote-debugging-port=9222 --user-data-dir=path/to/a/folder
* 2) open http://localhost:9222/json
* 3) find webSocketDebuggerUrl value (will look like ws://localhost....)
* 4) copy the url to the openSocket call below
* 5) node thisDemoCode.js
* 6) the chrome window should navigate to appjs.com!
*/

//var rDebug = require('chrome-rdebug').rDebug;
var rDebug = require('./index.js').rDebug;
var rDebugApi = rDebug.openSocket('ws://localhost:9222/devtools/page/A4CB0085-8ACD-4E3C-BC53-0BA888EFC4D6');
rDebugApi.ws.on('close',function() {
	console.log('disconnected');
});
rDebugApi.ws.on('open',function() {
	console.log('connected');
	
	rDebugApi.getDoc().then(function(doc) {
		rDebugApi.getOuterHTML(doc.root.nodeId)
		.then(function(res) {
			console.log("page html:",res.outerHTML);
			rDebugApi.pageNavigate("http://appjs.com").then(function() {
				setTimeout(function(){
					rDebugApi.pageNavigate("about:blank")
				},5000);
			}).fail(function(err) {
			console.log("error:"+err.error.code+" "+err.error.message);
			});
		}).fail(function(err) {
			console.log("error:"+err.error.code+" "+err.error.message);
		});
	});
});