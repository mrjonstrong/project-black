import _ from 'lodash'
import { connect } from 'react-redux'

import HostsList from './HostsList.jsx'
import { updateComment as updateProjectComment } from '../../redux/projects/actions'
import { updateComment as updateScopeComment } from '../../redux/scopes/actions'


function formIPs(ips_list, project_uuid) {
	var ips = _.filter(ips_list, (x) => {
    	return x.project_uuid == project_uuid
    }).sort((a, b) => {
    	if (a.ip_address < b.ip_address) return -1
    	if (a.ip_address > b.ip_address) return 1
    	return 0
    });

    return ips;
}

function formHosts(hosts_list, project_uuid) {
	var hosts = _.filter(hosts_list, (x) => {
    	return x.project_uuid == project_uuid
    }).sort((a, b) => {
    	if (a.hostname < b.hostname) return -1
    	if (a.hostname > b.hostname) return 1
    	return 0
    });

    return hosts
}

function mapStateToProps(state, ownProps){
	let project_name = ownProps.project_name;
	let filtered_projects = _.filter(state.projects, (x) => {
		return x.project_name == project_name
	});

	let project = null;

	if (filtered_projects.length) {
		project = filtered_projects[0]
	} else {
		project = {
			"project_name": null,
			"project_uuid": null,
			"comment": ""
		}
	}

    return {
    	project: project,
        scopes: {
        	'ips': formIPs(state.scopes.ips, project['project_uuid']),
        	'hosts': formHosts(state.scopes.hosts, project['project_uuid']),	        
        },
        tasks: _.filter(state.tasks.active, (x) => {
        	return x.project_uuid == project['project_uuid']
        }),
        scans: _.filter(state.scans, (x) => {
        	return x.project_uuid == project['project_uuid']
        })
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onProjectCommentChange: (comment, project_uuid) => {
			dispatch(updateProjectComment({
				'comment': comment, 
				'project_uuid': project_uuid
			}))
		},
		onScopeCommentChange: (comment, scope_id) => {
			dispatch(updateScopeComment({
				'comment': comment, 
				'_id': scope_id
			}))	
		},	
		onFilterChangeHosts: (hostsFilters) => {
			dispatch(updateFilters({
				'hosts': hostsFilters
			}))				
		}
	}
}


const HostsListWrapper = connect(
	mapStateToProps,
	mapDispatchToProps
)(HostsList)

export default HostsListWrapper
