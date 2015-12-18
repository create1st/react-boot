define(function(require) {
	'use strict';

    const Rest = require('rest');
    const DefaultRequest = require('rest/interceptor/defaultRequest');
    const Mime = require('rest/interceptor/mime');
    const ErrorCode = require('rest/interceptor/errorCode');
	const Registry = require('rest/mime/registry');

	var registry = Registry.child();
    registry.register('application/hal+json', require('rest/mime/type/application/hal'));

    function get(path, callback) {
        var client = Rest
            .wrap(Mime, { registry: registry })
            .wrap(ErrorCode)
        	.wrap(DefaultRequest, { headers: { 'Accept': 'application/hal+json' }});
        client({method: 'GET', path: path }).done(callback);
    };

    return {
        get: get
    };
});