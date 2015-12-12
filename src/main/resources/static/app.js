'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const stompClient = require('./pubsub');

// <App/>
class App extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            tickets: []
        };
    }

    componentDidMount() {
        var ticketService = {
            component: this,
            destination: '/topic/ticket',
            onMessage: this.onNewTicketMessage,
            onConnect: this.onNewTicketServiceConnect,
            onDisconnect: this.onNewTicketServiceDisconnect
        };
		stompClient.subscribe(ticketService);
    }

    onNewTicketMessage(component, frame) {
        console.log('onNewTicketMessage', frame);
        
        var tickets = component.state.tickets.slice(0);        
        tickets.push(JSON.parse(frame.body));
        component.setState( {
            tickets: tickets
        });
    }

    onNewTicketServiceConnect(component) {
        console.log('onNewTicketServiceConnect');
    }

    onNewTicketServiceDisconnect(component) {
        console.log('onNewTicketServiceDisconnect');
    }

	render() {
        return (
            <div className="portlet">
                <TicketTable tickets={this.state.tickets}/>
            </div>
        )
    }
}

// <TicketTable/>
class TicketTable extends React.Component {
    render() {
		var tickets = this.props.tickets.map(ticket =>
			<Ticket key={ticket.id} ticket={ticket}/>
		);
		return (
			<table className="table table-striped">
			    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Created by</th>
                    </tr>
				</thead>
				<tbody>
				    {tickets}
				</tbody>
			</table>
		)
	}
}

// <Ticket/>
class Ticket extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.ticket.id}</td>
				<td>{this.props.ticket.owner.firstName} {this.props.ticket.owner.lastName}</td>
			</tr>
		)
	}
}

// React render
ReactDOM.render(
	<App />,
	document.getElementById('react')
)

