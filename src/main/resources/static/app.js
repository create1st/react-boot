'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

// <App/>
class App extends React.Component {

	constructor(props) {
		super(props);
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

