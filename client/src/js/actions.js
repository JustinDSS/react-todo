'use strict';

var ajax = require('ajax');


// The key values of this object will be available in
// flux.actions.<KEY_NAME>
//
// There is a common pattern with these actions, they all
// return promises. The action starts with firing off an
// ajax request (which returns a promise). We tap into
// that promise with then. Here, we notify the stores
// that an action took place.
//
// Why do we return the promise? That way the view who
// triggered this action will be notified when the action
// is successfully completed. This is useful if the view
// needs to transition to a new screen when the action is
// complete.
var TaskActions = {

    // Fetch all tasks from the server
    all: function() {
        var self = this;
        ajax.get('api/tasks').then(function(tasks) {
            self.dispatch('TASK_SET', tasks);
        });
    },

    // Update a single task
    update: function(id, params) {
        var self = this;
        ajax.put('api/tasks/'+id, params)
        .then(function(task) {
            self.dispatch('TASK_UPDATE', task);
        });
    },

    // Add a new task
    add: function(params) {
        console.log("action!")
        return ajax.post('api/tasks', params)
    },

    // Delete a task by id
    remove: function(task) {
        var self = this;
        ajax.del('api/tasks/'+task.id)
        .then(function() {
            self.dispatch('TASK_REMOVE', task);
        });
    }

};

module.exports = TaskActions;

