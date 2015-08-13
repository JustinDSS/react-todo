'use strict';

var React = require('react');
var StoreWatchComponent = require('components/storeWatch');
var { RouteHandler } = require('react-router');
var { flux } = require('flux');
var { Link } = require('react-router');

var App = React.createClass({

    getInitialState: function() {
        return {
            filterComplete: true
        };
    },

    render: function() {
        return <div className="app-container">
            <div className="header">
                <Link className="title" to="tasks">TODOs</Link> |&nbsp;
                <Link className="add" to="add">Add</Link> |&nbsp;
                <span onClick={this.toggleFilter}>Show Completed</span>
            </div>

            <RouteHandler tasks={this.props.tasks} filterComplete={this.state.filterComplete}/>
        </div>;
    },

    toggleFilter : function() {
        this.setState({filterComplete: !this.state.filterComplete});
    }
});


// Have the top level of our application listen for store
// changes and pass them down to all child components.
// Since our application is very small, this works just fine.
module.exports = StoreWatchComponent(['TaskStore'], function() {
    return {
        tasks: flux.store('TaskStore').getState(),
        filterComplete: true
    };
}, App);
