'use strict';

var React = require('react');
var { Link } = require('react-router');
var { flux } = require('flux');

var TaskAdd = React.createClass({

    // Since we want to use the router in this component, we need
    // to include it in our context
    contextTypes: {
        router: React.PropTypes.func
    },

    onSubmit: function() {
        var task = {
            text: this.refs.input.getDOMNode().value,
            complete: false
        };

        // Make sure the user has actually supplied a TODO
        // before we try to persist it to the server
        if (task.text) {
            // Our action returns a promise. When that promise
            // is fulfilled we can transition back to the tasks list
            flux.actions.add(task)
                .then(() => {
                    this.context.router.transitionTo('tasks');
                });
        }
    },

    render: function() {
        return <div className="add-container">
            <div className="add-inner">
                <input ref="input" type="text" placeholder="Todo:" />
                <Link className="cancel" to="tasks">Cancel</Link>
                <span className="a save" onClick={this.onSubmit}>Save</span>
            </div>
        </div>;
    }

});

module.exports = TaskAdd;
