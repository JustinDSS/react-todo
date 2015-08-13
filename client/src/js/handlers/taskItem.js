'use strict';

var React = require('react');
var { flux } = require('flux');

var TaskItem = React.createClass({

    propTypes: {
        task: React.PropTypes.object.isRequired
    },

    toggle: function() {
        flux.actions.update(this.props.task.id, this.props.task);
    },

    remove: function() {
        flux.actions.remove(this.props.task.id);
    },

    render: function() {
        var task = this.props.task;
        var style = {
            textDecoration: task.complete ? "line-through" : ""
        };

        return <div className="todo" >
            <span onClick={this.toggle} style={style} >{task.text}</span>
            <span className="a remove" onClick={this.remove}> [x]</span>
        </div>;
    }

});

module.exports = TaskItem;
