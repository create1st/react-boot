'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Griddle = require('griddle-react');
const Rest = require('rest');
const StompClient = require('./pubsub');
const RestClient = require('./rest-client');

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
            onMessage: this.onNewTicketMessage.bind(this),
            onConnect: this.onNewTicketServiceConnect.bind(this),
            onDisconnect: this.onNewTicketServiceDisconnect.bind(this)
        };
		StompClient.subscribe(ticketService);
    }

    doInitialTicketsFetch() {
        console.log('doInitialTicketsFetch');
        RestClient.get('/tickets/list', function(response) {
            console.log('/tickets/list', response);
            this.setState({ tickets: response.entity });
        }.bind(this));
    }

    onNewTicketMessage(frame) {
        console.log('onNewTicketMessage', frame);
        var tickets = this.state.tickets.slice(0);
        tickets.push(JSON.parse(frame.body));
        this.setState({
            tickets: tickets
        });
    }

    onNewTicketServiceConnect() {
        console.log('onNewTicketServiceConnect');
        this.doInitialTicketsFetch();
    }

    onNewTicketServiceDisconnect() {
        console.log('onNewTicketServiceDisconnect');
    }

    onTicketSelected(id) {
        console.log('onTicketSelected', id);

        var tickets = this.state.tickets.map(ticket => {
            ticket.selected = id == ticket.id ? true : undefined;
            return ticket;
        });
        this.setState({
            tickets: tickets
        });
    }

	render() {
        return (
//           {...props}
            <div className="portlet">
                <TicketTable onTicketSelected={this.onTicketSelected.bind(this)} tickets={this.state.tickets} />
            </div>
        )
    }
}

// <TicketTable/>
class TicketTable extends React.Component {
	constructor(props) {
		super(props);
        this.columnMeta = [
             {
                 "columnName": "id",
                 "displayName": "ID",
                 "order": 1,
                 "locked": false,
                 "visible": true,
             },
             {
                 "columnName": "name",
                 "displayName": "Created by",
                 "order": 2,
                 "locked": false,
                 "visible": true,
             }
        ];
        this.rowMetadata = {
             "bodyCssClassName": function(rowData) {
                 if (rowData.selected) {
                     return "info";
                 }
                 return "";
             }
        };
    }

    onRowClick(gridRow, event) {
        var id = gridRow.props.data.id;
        this.props.onTicketSelected(id);
    }

    getTableRows() {
        var data = this.props.tickets.map(ticket => {
            return {
                id: ticket.id,
                name: ticket.owner.firstName + " " + ticket.owner.lastName,
                selected: ticket.selected
            }
        });
        return data;
    }

    render() {
        var data = this.getTableRows();
		return (
		    <div className="panel panel-default">
		        <div className="panel-heading">Tickets</div>
                <Griddle results={data}
                    noDataMessage={"No data could be found."}
                    showFilter={true}
                    onRowClick={this.onRowClick.bind(this)}
                    columns={['id', "name"]}
                    columnMetadata={this.columnMeta}
                    rowMetadata={this.rowMetadata}
                    tableClassName="table table-striped table-scroll"
                    useGriddleStyles={false}
                    resultsPerPage={5}
                    bodyHeight={400}
                    enableInfiniteScroll={true}
                    useFixedHeader={true}
                    />
		    </div>
		)
	}
}

// React render
ReactDOM.render(
	<App />,
	document.getElementById('react')
)

