'use strict';

var React = require('react');
var { flux } = require('flux');
var TaskItem = require('handlers/taskItem');
var _ = require('ramda');

var TaskList = React.createClass({

    propTypes: {
        tasks: React.PropTypes.array.isRequired
    },

    componentWillMount: function() {
    },

    render: function() {
        var tasks = this.props.tasks;
        if(this.props.filterComplete){
            // Do this better
            tasks = _.reject(_.isNil(), tasks);
            tasks = _.reject(_.propEq('complete', true), tasks);
        }
        return <div className="list-container">
            <ul>
                {Object.keys(tasks).map(function(id) {
                    return <li key={id}><TaskItem task={tasks[id]} /></li>;
                })}
            </ul>
        </div>;
    }

});

module.exports = TaskList;
