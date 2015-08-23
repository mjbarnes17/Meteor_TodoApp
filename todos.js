Todos = new Mongo.Collection('todos');

// Runs only on the client side.
if (Meteor.isClient) {
  // Sever subcribes to the client to get todos
  Meteor.subscribe('todos');
  // Template Helpers
  Template.main.helpers({
    todos: function() {
      return Todos.find({}, {sort: {createdAt: -1}});
    }
  });

  // Template Events
  Template.main.events({
    // Submit event for new todo
    'submit .new-todo': function(event) {
      var text = event.target.text.value;
      // Method call to create a new todo
      Meteor.call('addTodo', text);
      // Clears form after entering new todo in text input
      event.target.text.value='';
      // Prevents submit
      return false;
    },
    // Click event for the check-box
    'click .toggle-check': function() {
      // Method call to update '.toggle-check' if the check-box was checked
      Meteor.call('setChecked', this._id, !this.checked);
    },
    // Click event to delete a todo
    'click .delete-todo': function() {
      // If check-box is checked
      if (this.checked) {
        // Method call to delete todo
        Meteor.call('deleteTodo', this._id);
      }
    }
  });

  // Accounts-ui config
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

// Runs on the server side
if (Meteor.isServer) {
  Meteor.publish('todos', function() {
    return Todos.find();
  });
}

// Meteor Methods
Meteor.methods({
  addTodo: function(text) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('This action is not authorized');
    }
    // Creates a new tod
    Todos.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTodo: function(todoId) {
    // Delete todo
    Todos.remove(todoId);
  },
  setChecked: function(todoId, setChecked) {
    // Updates '.toggle-check' if the check-box was checked
    Todos.update(todoId, {$set:{checked: setChecked}});
  }
});
