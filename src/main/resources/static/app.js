'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const stompClient = require('./pubsub');

// <App/>
class App extends React.Component {

	constructor(props) {
		super(props);
	}

    componentDidMount() {
        var incomingRequestService = {
            destination: '/topic/incomingRequest',
            onMessage: this.onIncomingRequestMessage,
            onConnect: this.onIncomingRequestServiceConnect,
            onDisconnect: this.onIncomingRequestServiceDisconnect
        };
		stompClient.subscribe(incomingRequestService);
    }

    // Asynchronous service events handling
    onIncomingRequestMessage(message) {
        console.log('onIncomingRequestMessage', message);
    }

    onIncomingRequestServiceConnect() {
        console.log('onIncomingRequestServiceConnect');
    }

    onIncomingRequestServiceDisconnect() {
        console.log('onIncomingRequestServiceDisconnect');
    }

	render() {
    		return (
    		    <div> </div>
    		)
    }
}

// React render
ReactDOM.render(
	<App />,
	document.getElementById('react')
)

