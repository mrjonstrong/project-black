import React from 'react'

import ScopeComment from '../../common/scope_comment/ScopeComment.jsx'
import PortsTabs from '../presentational/PortsTabs.jsx'
import TasksButtonsTracked from './TasksButtonsTracked.jsx'
import Tasks from '../../common/tasks/Tasks.jsx'


class MainAccumulator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'activeTabNumber': null,
			'activePortNumber': null
		}				

		this.tabChange = this.tabChange.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (JSON.stringify(this.props.ports) !== JSON.stringify(newProps.ports)) {
			if (typeof this.state.activePortNumber === 'undefined') {
				this.setState({
					activePortNumber: newProps.ports[0].port_number,
					activeTabNumber: 0
				});
			}
		}
	}

	tabChange(newNumber, portNumber) {
		this.setState({
			activeTabNumber: newNumber,
			activePortNumber: portNumber
		});
	}

	render() {
		return (
			<div>
				<h2>{this.props.host.hostname}</h2>
				<TasksButtonsTracked project={this.props.project}
									 host={this.props.host}
									 activePortNumber={this.state.activePortNumber} />				
				<Tasks tasks={this.props.tasks} />
				<hr />
				<ScopeComment commentValue={this.props.host.comment} />

				<PortsTabs ports={this.props.ports}
					   	   activeTabNumber={this.state.activeTabNumber}
					   	   tabChange={this.tabChange}
					   	   files={this.props.files} />
			</div>				  
		)
	}
}

export default MainAccumulator;