'use strict';

var React = require('react');
var { RouteHandler } = require('react-router');
var StoreWatchComponent = require('components/storeWatch');
var { flux } = require('flux');
var { Link } = require('react-router');
var _ = require('ramda');

var DoughnutChart = require("react-chartjs").Doughnut;

var App = React.createClass({

    renderChart: function() {

        var data = _.compose(
            _.mapObj(_.length),
            _.groupBy(task => task.complete ? 'Complete' : 'Pending')
        )(this.props.tasks);

        // If we are empty, simulate having one pending task.
        // This way we still have a graph on the screen from the getgo
        if (!data.Pending && !data.Complete) {
            data.Pending = 1;
        }

        // Setup the chart data with what gets actually displayed to the screen.
        // If we don't have any pending or complete, default them to
        // 0 instead of undefined
        var chartData = [
            {
                value: data.Pending || 0,
                color:"#D9F5FE",
                highlight: "#D9F5FE",
                label: "Pending"
            },
            {
                value: data.Complete || 0,
                color:"#009ECD",
                highlight: "#009ECD",
                label: "Completed"
            }
        ];

        var options = {
            animationEasing : "easeInOutQuart",
            segmentStrokeWidth : 1,
            showTooltips: false
        };

        return <DoughnutChart className="completed-graph" data={chartData} options={options}/>;
    },

    render: function() {
        return <div className="app-container">
            <div className="header">
                <Link className="title" to="tasks">
                    TOD{this.renderChart()}
                </Link>
                <Link className="add" to="add">
                    add
                </Link>
            </div>

            <RouteHandler tasks={this.props.tasks} />
        </div>;
    }

});


// Have the top level of our application listen for store
// changes and pass them down to all child components.
// Since our application is very small, this works just fine.
module.exports = StoreWatchComponent(['TaskStore'], function() {
    return {
        tasks: flux.store('TaskStore').getState()
    };
}, App);
