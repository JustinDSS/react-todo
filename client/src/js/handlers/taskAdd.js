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

    getInitialState: function() {
        return {
            newTodoText: ""
        };
    },

    onSubmit: function() {
        if (this.state.newTodoText.trim()) {
            flux.actions.add(this.state.newTodoText);
            this.setState({newTodoText: ""});
            this.context.router.transitionTo('tasks');
        }
    },

    render: function() {
        return <div className="add-container">
            <div className="add-inner">
                <input ref="input" value={this.state.newTodoText} onChange={this.handleTodoTextChange}
                       type="text" placeholder="Todo:" /> <br/>
                <Link className="cancel" to="tasks">Cancel</Link> &nbsp;
                <span className="a save" onClick={this.onSubmit}>Save</span>
            </div>
        </div>;
    },

    handleTodoTextChange: function(e) {
        this.setState({newTodoText: e.target.value});
    }
});

module.exports = TaskAdd;
