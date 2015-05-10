'use strict';

var Tuxxor = require('tuxxor');

var TaskStore = Tuxxor.createStore({

    initialize: function() {
        this.tasks = [];
    },

    // Our actions hash is a key value store where
    // keys are the name of the method within the store
    // and the value is the event name. Value can also be
    // an array of event names.
    actions: {
        getAll: 'TASKS_ALL',
        remove: 'TASKS_REMOVE',
        add: 'TASKS_ADD',
        update: 'TASKS_UPDATE'
    },

    getAll: function (tasks) {
        this.tasks = tasks;
        this.emit('change');
    },

    update: function(updatedTask) {
        // We are using map to iterate over our array of tasks.
        // When we hit the task appropriate task, return the
        // updated properties instead of the normal properties
        this.tasks = this.tasks.map(function(task) {
            return (task.id === updatedTask.id) ? updatedTask : task;
        });

        this.emit('change');
    },

    add: function(task) {
        this.tasks = this.tasks.concat([task]) ;
        this.emit('change');
    },

    remove: function(id) {
        // Here we are filtering over our tasks and rejecting
        // the task that matches the task's id we removed
        this.tasks = this.tasks.filter(function(task) {
            return task.id !== id;
        });

        this.emit('change');
    },

    // This is our public facing get method for the store. Any
    // component can call getState to get the list of tasks.
    // Here we are using Array.slice to make sure we return
    // a copy of the data and not the actual data. This way
    // we are protected from others modifying our state
    getState: function() {
        return this.tasks.slice(0);
    }
});

module.exports = new TaskStore();
