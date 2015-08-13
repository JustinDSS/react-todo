'use strict';

var Tuxxor = require('tuxxor');
var { ActionTypes } = require('constants');

var TaskStore = Tuxxor.createStore({

    initialize: function() {
        this.todoId = 0;
        this.tasks = [];
    },

    // Our actions hash is a key value store where
    // keys are the name of the method within the store
    // and the value is the event name. Value can also be
    // an array of event names.
    actions: {
        "add": ActionTypes.ADD_TODO,
        "update": ActionTypes.UPDATE_TODO,
        "remove": ActionTypes.REMOVE_TODO
    },

    set: function (tasks) {
        this.tasks = tasks;
        this.emit('change');
    },

    update: function(params) {
        this.tasks[params.task.id].complete = !params.task.complete;
        this.emit('change');
    },

    add: function(params) {
        var id = this.todoId++;
        this.tasks[id] = {
                id: id,
                text: params.text,
                complete: false
            };
        this.emit('change');
    },

    remove: function(params) {
        delete this.tasks[params.removeId];
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
