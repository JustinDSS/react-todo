'use strict';

var React = require('react');
var { flux } = require('flux');

var TaskItem = React.createClass({

    toggle: function() {
        var task = this.props.task;

        flux.actions.update(task.id, {
            id: task.id,
            text: task.text,
            complete: !task.complete
        });
    },

    remove: function() {
        flux.actions.remove(this.props.task.id);
    },

    render: function() {
        var task = this.props.task;

        return <div className="todo" onClick={this.toggle}>
            {this.props.task.complete ?  <span className="complete"></span> : ''}
            <span className="text">{task.text}</span>
            <span className="a remove" onClick={this.remove}></span>
        </div>;
    }

});

module.exports = TaskItem;