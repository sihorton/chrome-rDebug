var WebSocket = require('ws');
var Q = require('q');


var rDebug = {
	openSocket:function(wsUrl) {
		var rDebugApi = {
			"version":0.1
			,ws:null
			,requestId:0
			,responses:{
			
			},navigate2:function(pageUrl) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				console.log("navigating to:",pageUrl);
				rDebugApi.ws.send('{"id":'+rId+',"method": "Page.navigate","params": {"url": "'+pageUrl+'"}}');
				return deferred.promise;
			},getDoc:function() {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "DOM.getDocument"}');
				return deferred.promise;
			},getOuterHTML:function(nodeId) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "DOM.getOuterHTML","params":{"nodeId":'+nodeId+'}}');
				return deferred.promise;
			},setOuterHTML:function(nodeId,html) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.setOuterHTML"
					,"params":{
						"nodeId":nodeId
						,"outerHTML":html
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			}
		}
		rDebugApi.ws = new WebSocket(wsUrl, {protocolVersion: 8, origin: 'http://localhost/'});
		rDebugApi.ws.on('message',function(mess) {
			var m;
			eval("m="+mess);
			if (rDebugApi.responses[m.id]) {
				if(m.error) {
					rDebugApi.responses[m.id].reject(m);
				} else {
					rDebugApi.responses[m.id].resolve(m.result);
				}
			} else {
				if (m.error) {
					console.log("error:"+err.error.code+" "+err.error.message);
				}
			}
		});		
		return rDebugApi;
	}
};

exports.rDebug = rDebug;