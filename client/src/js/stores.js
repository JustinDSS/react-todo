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
        set: 'TASK_SET',
        add: 'TASK_ADD',
        remove: 'TASK_REMOVE',
        update: 'TASK_UPDATE'
    },

    set: function (tasks) {
        this.tasks = tasks
        this.emit('change');
    },

    update: function(updatedTask) {
        this.tasks = this.tasks.map(function(currentTask) {
            if(currentTask.id === updatedTask.id) {
                return updatedTask
            }
            return currentTask
        })
        this.emit('change');
    },

    add: function(task) {
        this.emit('change');
    },

    remove: function(task) {
        this.tasks = this.tasks.filter(function(currentTask) {
            return currentTask !== task
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
