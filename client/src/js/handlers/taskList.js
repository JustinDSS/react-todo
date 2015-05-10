'use strict';

var React = require('react');
var { flux } = require('flux');
var TaskItem = require('handlers/taskItem');

var TaskList = React.createClass({

    componentWillMount: function() {
        flux.actions.all();
    },

    render: function() {
        return <div className="list-container">
            {this.props.tasks.map((task) => {
                return <TaskItem task={task} />;
            })}
        </div>;
    }

});

module.exports = TaskList;
