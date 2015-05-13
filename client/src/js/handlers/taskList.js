'use strict';

var React = require('react');
var { flux } = require('flux');
var TaskItem = require('handlers/taskItem');

var TaskList = React.createClass({

    getInitialState: function() {
        return {
            sort: 'az'
        };
    },

    componentWillMount: function() {
        flux.actions.all();
    },

    onChange: function() {
        var checked = this.refs.az.getDOMNode().checked ? 'az' : 'completed';

        this.setState({
            sort: checked
        });
    },

    render: function() {
        var sort = this.state.sort;

        var tasks = this.props.tasks.sort(function(a, b) {
            if (sort === 'az') {
                return a.text.localeCompare(b.text);
            }

            if (sort === 'completed') {
                return a.complete.toString().localeCompare(b.complete.toString());
            }
        });

        return <div className="list-container">
            <form className="radio" onChange={this.onChange}>
                Sort by:

                <label>
                    <input
                        type="radio"
                        ref="az"
                        name="sort"
                        value="az"
                        defaultChecked />
                    <span>Alphabetical</span>
                </label>

                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="completed" />
                    <span>Completed</span>
                </label>
            </form>

            {tasks.map((task) => {
                return <TaskItem task={task} />;
            })}
        </div>;
    }

});

module.exports = TaskList;
