/**
 * Created by Vladimir on 8/3/2016.
 */

var connections = 0;

self.addEventListener("connect", function (e) {
	var port = e.ports[0];
	connections += 1;

	port.addEventListener('message', function (e) {
		port.postMessage("Hello " + e.data + " (port #" + connections + ")");
	}, false);

	port.start();

}, false);