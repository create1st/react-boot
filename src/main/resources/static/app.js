'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Griddle = require('griddle-react');
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
        component.setState({
            tickets: tickets
        });
    }

    onNewTicketServiceConnect(component) {
        console.log('onNewTicketServiceConnect');
    }

    onNewTicketServiceDisconnect(component) {
        console.log('onNewTicketServiceDisconnect');
    }

    onTicketSelected(component, id) {
        console.log('onTicketSelected', id);

        var tickets = component.state.tickets.slice(0);
        tickets.forEach(ticket => {
            ticket.selected = id == ticket.id ? true : undefined;
        });
        component.setState({
            tickets: tickets
        });
    }

	render() {
	    var component = this;
	    var onTicketSelected = function(id) {
	        component.onTicketSelected(component, id)
	    };
        return (
            <div className="portlet">
                <TicketTable onTicketSelected={onTicketSelected} tickets={this.state.tickets}/>
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

    render() {
        var onTicketSelected = this.props.onTicketSelected;
        var data = this.props.tickets.map(ticket => {
            return {
                id: ticket.id,
                name: ticket.owner.firstName + " " + ticket.owner.lastName,
                selected: ticket.selected
            }
        });
        var onRowClick = function(gridRow, event) {
            var id = gridRow.props.data.id;
            onTicketSelected(id);
        }
		return (
		    <div className="panel panel-default">
		        <div className="panel-heading">Tickets</div>
                <Griddle results={data}
                    noDataMessage={"No data could be found."}
                    showFilter={true}
                    onRowClick={onRowClick}
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

