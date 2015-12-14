define(function(require) {
	'use strict';

	const SockJS = require('sockjs-client');
	const StompJS = require('stompjs');

	function subscribe(service) {
		var headers = {};

		function onServiceFail(error) {
            console.log('Connection error: ' + error);
            service.onDisconnect();
            setTimeout(serviceConnect, 10000);
            console.log('Reconnecting in 10 seconds');
        };

        function serviceConnect() {
       		var socket = SockJS('/streaming');
       		var stompClient = Stomp.over(socket);

            stompClient.connect(headers, function() {
                stompClient.subscribe(service.destination, service.onMessage);
                service.onConnect();
            }, onServiceFail);
		}

		serviceConnect();
	}

	return {
		subscribe: subscribe
	};
});